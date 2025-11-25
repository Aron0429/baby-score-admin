/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 16:18:42
 * @LastEditTime: 2025-11-25 16:28:10
 */
import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from '../layout/index.vue'

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: HomeView, // 首页组件
      },
    ],
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
