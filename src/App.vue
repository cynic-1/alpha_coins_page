<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { ArrowDown } from '@element-plus/icons-vue'
import { useApi } from './hooks/useApi'

const loading = ref(false)
const data = ref()
const table = ref()
const curTable = ref()
const top_count = ref(100)

let api: { [key: string]: string }
useApi().then((res: any) => {
  api = res
  curTable.value = Object.keys(api)[0]
  getData()
})
const filters = ref()
const filterHandler = (value: any, row: any, column: any) => {
  const property = column['property']
  return row[property] === value
}

const getData = () => {
  loading.value = true
  if top_count.value === 'ALL' {
    axios
    .get(api[curTable.value])
    .then((response: any) => {
      data.value = response.data.map((item: any) => {
        return {
          ...item,
          timestamp: new Date(item.timestamp*1000).toLocaleString('zh-CN'),
        }
      })
      filters.value = [
        ...new Set(data.value.map((item: any) => item.exchange)),
      ].map((item: any) => ({ text: item, value: item }))
    })
    .finally(() => {
      loading.value = false
      table.value?.scrollTo(0, 0)
    })
  } else {

    axios
      .get(api[curTable.value], {
        params: {
          cmc_rank: `lte.${top_count.value}`,
        },
      })
      .then((response: any) => {
        data.value = response.data.map((item: any) => {
          return {
            ...item,
            timestamp: new Date(item.timestamp*1000).toLocaleString('zh-CN'),
          }
        })
        filters.value = [
          ...new Set(data.value.map((item: any) => item.exchange)),
        ].map((item: any) => ({ text: item, value: item }))
      })
      .finally(() => {
        loading.value = false
        table.value?.scrollTo(0, 0)
      })
  }
}

const changeTable = (key: any) => {
  curTable.value = `${key}`
  getData()
}

const changeTopCount = (k: any) => {
  top_count.value = k
  getData()
}

</script>

<template>
  <template v-if="data">
    <el-dropdown class="count_selector">
      <el-button type="primary">
        {{ top_count }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="k in [100, 200, 500, 'ALL']" @click="changeTopCount(k)">{{
            k
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown class="selector">
      <el-button type="primary">
        {{ curTable }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(_, k) in api" @click="changeTable(k)">{{
            k
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="container">
      <el-table
        class="table"
        ref="table"
        :data="data"
        max-height="80vh"
        header-cell-class-name="headers"
        cell-class-name="cells"
        v-loading="loading"
      >
        <template v-for="(_, key) in data[0]">
          <el-table-column
            v-if="`${key}` === 'exchange'"
            :prop="key"
            :label="key"
            width="110"
            :filters="filters"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column
            v-else-if="`${key}` === 'cmc_link'"
            :prop="key"
            :label="key"
            min-width="105"
          >
            <template v-slot="scope">
              <a :href="scope.row.cmc_link" target="_blank">{{ scope.row.cmc_link }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="key"
            :label="key"
            min-width="105"
          ></el-table-column>
        </template>
      </el-table>
    </div>
  </template>
</template>

<style scoped>
.count_selector {
  position: fixed;
  top: 3.5vh;
  left: 10px;
}

.selector {
  position: fixed;
  top: 3.5vh;
  right: 10px;
}

.container {
  padding: 0 10px;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: auto;

  .table {
    border: 1px solid #ebeef5;
  }
}
</style>

<style>
.headers,
.cells {
  .cell {
    padding: 0 5px;
  }
}
</style>
