<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane v-for="item in tabLists" :key="item.key" :label="item.value" :name="item.key"></el-tab-pane>
    <!-- <el-tab-pane label="详情" name="first">详情</el-tab-pane>
      <el-tab-pane label="拓扑视图" name="second">拓扑视图</el-tab-pane>
      <el-tab-pane label="资源监控视图" name="third">资源监控视图</el-tab-pane>
      <el-tab-pane label="网络监控视图" name="fourth">网络监控视图</el-tab-pane> -->
  </el-tabs>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'

import { ref } from 'vue'

const activeName = ref('topology')
const router = useRouter()
const tabLists = [
  { key: 'setting', value: '详情' },
  { key: 'topology', value: '拓扑视图' },
  { key: 'resource', value: '算力资源监控视图' },
  { key: 'network', value: '网络监控视图' }
]

const handleClick = (tab, event) => {
  //   router.push
  let tabPath = toRaw(toRaw(tab).props).name
  let pathList = window.location.pathname.split('/').filter((item) => item.length > 0)
  // console.log(pathList)
  let currentPath = '/' + pathList[0] + '/' + pathList[1]
  //   console.log(tabPath)
  router.push(`${currentPath}/${tabPath}`)
}
</script>
<style scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
