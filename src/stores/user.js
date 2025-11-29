/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-29 01:51:40
 * @LastEditTime: 2025-11-29 18:43:58
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const accessToken = ref('')
    const refreshToken = ref('')
    const userInfo = ref(null)

    function setAccessToken(token) {
      accessToken.value = token
    }

    function setRefreshToken(token) {
      refreshToken.value = token
    }

    function setUserInfo(info) {
      userInfo.value = info
    }

    function clearUserInfo() {
      accessToken.value = ''
      refreshToken.value = ''
      userInfo.value = null
    }

    return { accessToken, refreshToken, userInfo, setAccessToken, setRefreshToken, setUserInfo, clearUserInfo }
  },
  {
    persist: {
      key: 'user-store', // 指定存储键名
      storage: localStorage, // 明确存储方式
      paths: ['accessToken', 'refreshToken', 'userInfo'], // 指定要持久化的字段
    },
  },
)
