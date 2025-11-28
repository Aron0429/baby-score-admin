import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', () => {
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
})
