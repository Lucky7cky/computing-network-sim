<template>
  <div :key="$route.params.scene">
    <SearchTable v-bind="nodeListData" />
    <SearchTable v-bind="topoListData" />
    <SearchTable v-bind="serviceListData" />
  </div>
</template>

<script setup>
import { countryNodeData, countryTopoData, countryServiceData } from '../../common/data/countryData'
import SearchTable from '../../components/SearchTable.vue'

const nodeListData = {
  title: '算力节点',
  tableData: countryNodeData,
  label: [
    ['nName', '名称'],
    ['nLevel', '级别'],
    ['nCpu', '算力节点CPU资源总量'],
    ['nMem', '算力节点存储资源总量'],
    ['nGPU', '算力节点GPU资源总量']
  ]
}

const topoListData = {
  title: '算网拓扑',
  tableData: countryTopoData,
  label: [
    ['sName', '起始节点'],
    ['eName', '终止节点'],
    ['ICapacity', '最大链路容量'],
    ['ILoad', '当前链路容量']
  ]
}
const serviceListData = {
  title: '算力业务',
  tableData: countryServiceData,
  label: [
    ['appSourceName', '算网业务发起节点'],
    ['appCpuNeed', '所需CPU资源(核数)'],
    ['appGpuNeed', '所需GPU资源'],
    ['appMemNeed', '所需Mem资源'],
    ['appBandwNeed', '容器所需带宽资源'],
    ['appEndTime', '业务要求的截止时间']
  ],
  edit: true
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 1000px;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
