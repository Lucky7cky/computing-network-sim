<template>
  <el-container class="layout-container-demo" style="height: 1200px">
    <el-header style="text-align: right; font-size: 12px; height: 50px; background-color: rgb(64, 158, 255)">
    </el-header>

    <el-container height="90%">
      <el-aside width="250px" style="background-color: white; font-size: 18px; border-right: 1px solid gainsboro">
        <el-menu :router="true" :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title> 验证场景 </template>
            <el-menu-item-group>
              <template #title>国网云</template>
              <el-menu-item index="/country/loadbalance/topology">基于负载均衡的算力迁移</el-menu-item>
              <el-menu-item index="/country/clearenergy/topology">基于新能源消纳的算力迁移</el-menu-item>
              <el-menu-item index="/country/poweraggregation/topology">算力聚合</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>省内云</template>
              <el-menu-item index="/province/visualInspection/topology">AI 视觉检测类</el-menu-item>
              <el-menu-item index="/province/edgeIotAgent/topology">边缘物联代理类</el-menu-item>
              <el-menu-item index="/province/newEnergyConsume/topology">新能源消纳类</el-menu-item>
            </el-menu-item-group>
            <!-- <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu> -->
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title> 自定义场景 </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title> 系统管理 </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view> </router-view>
        <!-- <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
// const item = {
//   date: '2016-05-02',
//   name: 'Tom',
//   address: 'No. 189, Grove St, Los Angeles'
// }
// const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  margin: 0px;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
