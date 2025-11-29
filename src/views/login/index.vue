<template>
  <div class="login-container">
    <div class="login-panel">
      <h2 class="login-title">后台管理系统登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large" @keyup.enter="handleLogin">
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入用户名" prefix-icon="User" clearable />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password clearable />
        </el-form-item>
        <el-form-item class="remember-item">
          <el-checkbox v-model="state.remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" :loading="state.loading" @click="handleLogin">
            {{ state.loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

import { login } from '@/apis/index'

const loginFormRef = ref()
const router = useRouter()
const store = useUserStore()

const loginRules = {
  email: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' },
  ],
}

const loginForm = ref({
  email: '',
  password: '',
})

const state = ref({
  loading: false,
  remember: false,
})

// 检查本地存储的记住密码信息
onMounted(() => {
  const savedLoginInfo = localStorage.getItem('savedLoginInfo')
  if (savedLoginInfo) {
    try {
      const { email, password, remember } = JSON.parse(savedLoginInfo)
      if (remember) {
        loginForm.value.email = email
        loginForm.value.password = password
        state.value.remember = remember
      }
    } catch (error) {
      console.error('解析保存的登录信息失败:', error)
    }
  }
})

const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) return

    state.value.loading = true

    const res = await login(loginForm.value)

    if (res.code === 200) {
      const { accessToken, refreshToken, userInfo } = res.data
      ElMessage.success(res.message)
      store.setAccessToken(accessToken)
      store.setRefreshToken(refreshToken)
      store.setUserInfo(userInfo)

      // 处理记住密码功能
      if (state.value.remember) {
        const loginInfo = {
          username: loginForm.username,
          password: loginForm.password,
          remember: true,
        }
        localStorage.setItem('savedLoginInfo', JSON.stringify(loginInfo))
      } else {
        localStorage.removeItem('savedLoginInfo')
      }

      router.push('/')
    }
  } catch (error) {
    ElMessage.error(error.message || '登录失败，请检查用户名和密码')
  } finally {
    state.value.loading = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('../assets/login-bg.jpg'); /* 可选的背景图片 */
  background-size: cover;
  background-position: center;

  .login-panel {
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);

    .login-title {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
      font-size: 24px;
      font-weight: 600;
    }

    .login-button {
      width: 100%;
      height: 45px;
      font-size: 16px;
    }

    .remember-item {
      margin-bottom: 20px;
    }
  }
}
</style>
