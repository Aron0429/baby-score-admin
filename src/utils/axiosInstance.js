/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-29 01:45:53
 * @LastEditTime: 2025-11-29 18:42:42
 */
import axios from 'axios'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.217:3000/api',
  timeout: 5000,
})

let isRefreshing = false // 状态锁：标记是否正在刷新Token
let requestsQueue = [] // 请求队列: 存储等待刷新的请求

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 请求头信息统一携带Token
    const accessToken = userStore.accessToken
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const errorConfig = error.config

    // 判断是否为Token过期引起的401错误，并且不是刷新Token的请求本身
    if (error.response && error.response.status === 401 && !errorConfig.url.includes('/api/user/refresh')) {
      // 如果当前没有在刷新，则设置状态锁并开始刷新
      if (!isRefreshing) {
        isRefreshing = true

        try {
          const refreshToken = userStore.refreshToken
          const { data } = await axiosInstance.get('/user/refresh', {
            headers: { refreshToken },
          })
          const newAccessToken = data.data
          userStore.setAccessToken(newAccessToken)

          // 刷新成功！遍历请求队列，用新Token重新执行所有排队中的请求
          requestsQueue.forEach(callback => callback(newAccessToken))
          requestsQueue = [] // 清空队列

          // 重新尝试发起最初触发刷新的那个请求
          return axiosInstance(errorConfig)
        } catch (_error) {
          // 刷新Token失败，清空队列并跳转登录
          requestsQueue = []
          window.location.href = '/#/login'

          return Promise.reject(_error)
        } finally {
          isRefreshing = false // 无论成功失败，最后都要解锁
        }
      } else {
        // 当前正在刷新Token，将当前这个过期请求加入队列等待
        return new Promise((resolve, reject) => {
          // 将一个函数推入队列，这个函数会在Token刷新成功后被执行
          requestsQueue.push(newToken => {
            // 更新当前失败请求的请求头，带上新Token
            errorConfig.headers.Authorization = newToken // 请根据你实际的头字段调整
            // 重新发起请求，并通过resolve返回结果
            resolve(axiosInstance(errorConfig))
          })
        })
      }
    }
    // 其他错误处理逻辑（网络错误、非401错误等）
    const errorMessage = error?.response?.data?.message
    ElMessage.error(errorMessage)
    return Promise.reject(error)
  },
)

export default axiosInstance
