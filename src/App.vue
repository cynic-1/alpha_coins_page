<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const data = ref()
const filters = ref()
const filterHandler = (value: any, row: any, column: any) => {
  const property = column['property']
  return row[property] === value
}

axios.get('/api/top_tokens_vs_btc').then((response: any) => {
  data.value = response.data
  filters.value = [
    ...new Set(data.value.map((item: any) => item.exchange)),
  ].map((item: any) => ({ text: item, value: item }))
})
</script>

<template>
  <div v-if="data" class="container">
    <el-table :data="data" max-height="500" style="width: 100%">
      <template v-for="(_, key) in data[0]">
        <el-table-column
          v-if="`${key}` === 'exchange'"
          :prop="key"
          :label="key"
          :filters="filters"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column v-else :prop="key" :label="key"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<style scoped>
.container {
  padding: 0 20px;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: auto;
}
</style>
