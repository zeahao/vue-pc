<template>
  <Bread bread="内容管理"/>
  <!--  表单-->
  <el-form :model="form" label-width="100px" class="form">
    <el-form-item label="状态">
      <el-radio-group v-model="form.status">
        <el-radio label="全部"/>
        <el-radio label="草稿"/>
        <el-radio label="待审核"/>
        <el-radio label="审核通过"/>
        <el-radio label="审核失败"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="form.channel_id" placeholder="请选择频道">
        <el-option v-for="i in channels" :key="i.id" :value="i.name"/>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
          v-model="form.date"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
          :default-time="form.date"
          unlink-panels
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">筛选</el-button>
    </el-form-item>
  </el-form>
  <!--  表格-->
  <el-table :data="tableData.results" height="250" style="width: 80%">
    <el-table-column label="封面" width="180">
      <template #default="scope">
        <img v-for="(i,index) in scope.row.cover.images" :key="index" :src="i" height="60" width="80"/>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180"/>
    <el-table-column prop="status" label="状态">
      <el-tag>审核通过</el-tag>
    </el-table-column>
    <el-table-column prop="pubdate" label="发布时间"/>
    <el-table-column prop="read_count" label="阅读数"/>
    <el-table-column prop="comment_count" label="评论数"/>
    <el-table-column prop="like_count" label="点赞数"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
        <el-button link type="primary" size="small" @click="goPublish(scope.row.id)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      :page-size="params.per_page"
      layout="prev, pager, next"
      :total="tableData.total_count"
      :pager-count="5"
      class="mt-4"
      :current-page="params.page"
      @current-change="(val)=>{params.page = val}"
  />
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue"
import request from "@/utils/request"
import {useRouter} from "vue-router"
import Bread from '@/components/Bread'
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()

// 修改属性
const goPublish = (id) => {
  router.push({
    path: '/publish',
    query: {
      id
    }
  })
}

// 表单属性
const form = reactive({
  status: '全部',
  channel_id: '',
  date: [
    new Date(2022, 1, 1, 0, 0, 0),
    new Date()],
})

let params = ref({
  page: 1,
  per_page: 10
})

// 文章分类数据
const channels = computed(()=>{
  return store.getters.getChannels
})

// 提交
const onSubmit = () => {
  const {status, channel_id, date} = form
  let t = {
    status,
    channel_id,
    begin_pubdate: `${date[0].getFullYear()}-${date[0].getMonth()}-${date[0].getDay()}`,
    end_pubdate: `${date[1].getFullYear()}-${date[1].getMonth()}-${date[1].getDay()}`
  }
  params.value = {...params.value, ...t}
}

// 监视
watch(params, (val) => {
  params.value = val
  getData()
}, {deep: true})

// 文章数据
let tableData = ref({total_count: 0})

// 获取数据
const getData = async () => {
  let res = await request.get('/mp/articles', {params: params.value})
  tableData.value = res.data.data
}

// 删除文章
const del = async (id) => {
  await request.delete(`/mp/articles/${id}`)
  await getData()
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.form {
  width: 550px;
}

</style>
