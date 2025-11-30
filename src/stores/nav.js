/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-27 14:59:53
 * @LastEditTime: 2025-12-01 01:46:05
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore(
  'nav',
  () => {
    const tabList = ref([{ meta: { title: '首页', icon: 'HomeFilled' }, path: '/home' }])
    const tabActivePath = ref('/home')

    function addTab(tabItem) {
      const hasTab = tabList.value.find(item => item.path == tabItem.path)

      if (!hasTab) {
        tabList.value.push(tabItem)
      }

      tabActivePath.value = tabItem.path
    }

    function removeTab(path) {
      if (path == '/home') return

      const curTabIndex = tabList.value.findIndex(item => item.path == path)
      tabList.value.splice(curTabIndex, 1)
    }

    return { tabList, tabActivePath, addTab, removeTab }
  },
  {
    persist: {
      key: 'nav-store', // 指定存储键名
      storage: localStorage, // 明确存储方式
      paths: ['tabList', 'tabActivePath'], // 指定要持久化的字段
    },
  },
)
