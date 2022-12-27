<template>
  <div id="echarts_box" ref="refDom" :style="props.sty"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";

const refDom = ref(null)

const props = defineProps({
  sty:Object,
  data:Object
})

onMounted(() => {
  // 1. 获取需要展示的数据
  let data = props.data
  // 2. 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(refDom.value)
  // 3. 使用刚指定的配置项和数据，显示图表
  myChart.setOption(data)
})
</script>

<style scoped>
</style>
