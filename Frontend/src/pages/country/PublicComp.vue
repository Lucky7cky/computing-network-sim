<template>
  <div class="content" :key="$route.params.scene">
    <TopTab />
    <router-view> </router-view>
  </div>
</template>
<script setup>
import TopTab from '../../components/TopTab.vue'
</script>
<style scoped>
.content {
  margin-top: 16px;
  margin-left: 32px;
}
</style>
