<template>
  <Bread bread="发布文章"/>
  <el-form :model="form" ref="formRef" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="form.channel_id" placeholder="请选择频道">
        <el-option v-for="i in channels" :key="i.id" :value="i.name"/>
      </el-select>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group v-model="form.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-show="form.type>0">
      <el-upload
          name="image"
          v-model:file-list="form.images"
          action="http://geek.itheima.net/v1_0/upload"
          list-type="picture-card"
          :limit="form.type"
      >
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="form.content" type="textarea" autosize/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(formRef)">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import Bread from "@/components/Bread"
import {useStore} from "vuex";
import {Plus} from "@element-plus/icons";
import request from "@/utils/request";

const route = useRoute()
const router = useRouter()
const store = useStore()

const form = reactive({
  title: '',
  channel_id: '',
  type: 0,
  images: [],
  content: '',
})

const formRef = ref(null)
const onSubmit = async (formEL) => {
  let data = {
    channel_id: form.channel_id,
    content: form.content,
    title: form.title,
    type: form.type,
    cover: {
      type: form.type,
      images: form.images.map(item => item.response.data.url)
    }
  }
  await request.post('/mp/articles?draft=false', data)
  router.go(0)
}

// 文章分类数据
const channels = computed(() => {
  return store.getters.getChannels
})

onMounted(() => {
  if (route.query.id) {
    (async (id) => {
      const res = await request.get(`/mp/articles/${id}`)
      const {cover,title,content,channel_id} = res.data.data
      form.images = cover.images.map(item => ({
        name: 'a',
        url: item
      }))
      form.type = cover.type
      form.title = title
      form.content = content
      form.channel_id = channel_id
    })(route.query.id)
  }
})

</script>

<style scoped>

</style>
