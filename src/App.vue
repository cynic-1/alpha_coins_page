<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import { ArrowDown } from '@element-plus/icons-vue'
import { api } from './utils/config'

const loading = ref(false)
const data = ref()
const table = ref()
const curTable = ref<keyof typeof api>(Object.keys(api)[0] as keyof typeof api)
const filters = ref()
const filterHandler = (value: any, row: any, column: any) => {
  const property = column['property']
  return row[property] === value
}

watchEffect(() => {
  loading.value = true
  axios.get(api[curTable.value]).then((response: any) => {
    data.value = response.data
    filters.value = [
      ...new Set(data.value.map((item: any) => item.exchange)),
    ].map((item: any) => ({ text: item, value: item }))
  }).finally(() => {
    loading.value = false
    table.value.scrollTo(0, 0)
  })
})

const changeTable = (key: keyof typeof api) => {
  curTable.value = key
}
</script>

<template>
  <template v-if="data">
    <el-dropdown class="selector">
      <el-button type="primary">
        {{ curTable }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(_, k) in api" @click="changeTable(k)">{{ k }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="container">
      <el-table class="table" ref="table" :data="data" max-height="80vh" header-cell-class-name="headers" cell-class-name="cells" v-loading="loading">
        <template v-for="(_, key) in data[0]">
          <el-table-column
            v-if="`${key}` === 'exchange'"
            :prop="key"
            :label="key"
            width="110"
            :filters="filters"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column v-else :prop="key" :label="key"></el-table-column>
        </template>
      </el-table>
    </div>
  </template>
</template>

<style scoped>
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