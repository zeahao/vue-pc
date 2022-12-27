<template>
  <div class='bg'>
    <div class="login">
      <el-form
          ref="ruleFormRef"
          :model="user"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
              v-model="user.username"
              type="text"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login"
          >登录
          </el-button
          >
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const ruleFormRef = ref()
const store = useStore()
const router = useRouter()

const username = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  }
  callback()
}
const password = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于六位'))
  }
  callback()
}

const user = reactive({
  username: '13911111111',
  password: '246810'
})

const rules = reactive({
  username: [{validator: username, trigger: 'blur'}],
  password: [{validator: password, trigger: 'blur'}],
})

const login = async () => {
  let {username, password} = user
  try {
    await store.dispatch('login', {username, password})
    await router.push('/')
  } catch (e) {
    console.log('登陆失败')
  }
}

const resetForm = () => {
  user.username = ''
  user.password = ''
}
</script>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 100%;
  background: url("~@/assets/bg.jpg");
  background-size: 100%;

  .login {
    width: 500px;
    height: 350px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);

    .demo-ruleForm {
      width: 400px;
      position: absolute;
      top: 50%;
      left: 42%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
