<template>
  <EchartsBox v-for="(i,index) in echartsData" :key="index" :sty="i.sty" :data="i.data"/>
</template>

<script setup>
import EchartsBox from '@/components/EchartsBox'

let echartsData = [
  {
    data: {
      title: {text: '太阳系八大行星的卫星数量'},
      tooltip: {},
      xAxis: {
        data: ["水星", "金星", "地球", "火星", "木星", "土星", "金王星", "海王星"]
      },
      yAxis: {},
      series: [{
        title: '数量',
        type: 'bar',
        data: [0, 0, 1, 2, 79, 82, 27, 14]
      }]
    },
    sty: {
      height: '400px',
      width: '600px',
      float:'left'
    }
  },
  {
    data: {
      title: {text:'demo'},
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ]
      },
      tooltip: {
        trigger: "axis"
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            801,
            102,
            230,
            4321,
            4129
          ],
          type: "line",
          smooth: true
        }
      ]
    },
    sty: {
      height: '400px',
      width: '600px',
      float:'left'
    }
  },
]
</script>

<style scoped>

</style>
