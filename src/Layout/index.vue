<template>
  <div class="common-layout">
    <el-container>
      <el-header height="100px">
        <img :src="logo" style="height: 90px" alt="">
        <el-button class="logout" type="primary" @click="logout">
          退出登录
          <el-icon size="20"><CircleCloseFilled /></el-icon>
        </el-button>
      </el-header>
      <el-container style="height: 1080px">
        <el-aside class="aside" width="200px">
          <el-scrollbar>
            <el-menu background-color="#001529" :default-active="route.path" text-color="#a5acb3" :router="true">
              <el-menu-item index="/">
                <el-icon size="20">
                  <HomeFilled/>
                </el-icon>
                数据概览
              </el-menu-item>
              <el-menu-item index="/article">
                <el-icon size="20">
                  <Files/>
                </el-icon>
                内容管理
              </el-menu-item>
              <el-menu-item index="/publish">
                <el-icon size="20">
                  <Edit/>
                </el-icon>
                发布文章
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {useStore} from "vuex";
import {HomeFilled, Files, Edit,CircleCloseFilled} from '@element-plus/icons'
import logo from '@/assets/logo.png'

const router = useRouter()
const store = useStore()
const route = useRoute()

const logout = ()=>{
  store.commit('setToken','')
  router.push('/login')
}
onMounted(() => {
  // 获取文章分类数据
  store.dispatch('getChannels')
  if (!store.getters.getToken) {
    router.push('/login')
  }
})

</script>

<style lang="less" scoped>
.el-header {
  background: #001529;
  .logout{
    float: right;
    margin-top: 26px;
  }
}

.aside {
  background: #001529;
}
</style>
