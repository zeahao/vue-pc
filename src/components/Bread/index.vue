<template>
  <!--  面包屑-->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ bread }}</el-breadcrumb-item>
  </el-breadcrumb>
  <br>
</template>

<script setup>
import {ArrowRight} from '@element-plus/icons-vue'

const props = defineProps({
  bread: String,
})
</script>

<style scoped>

</style>
