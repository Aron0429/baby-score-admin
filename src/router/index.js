/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 16:18:42
 * @LastEditTime: 2025-11-30 14:42:03
 */
import { createWebHashHistory, createRouter } from 'vue-router'
import { useNavStore } from '@/stores/nav'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true, // 不在菜单中显示
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '根目录',
      hidden: true, // 不在菜单中显示
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          isShow: true,
        },
      },
      {
        path: '/information',
        name: 'information',
        meta: {
          title: '数据管理',
          icon: 'Coin',
          isShow: true,
        },
        children: [
          {
            path: '/information/user',
            name: 'user',
            component: () => import('@/views/information/user.vue'),
            meta: {
              title: '用户管理',
              icon: 'User',
            },
          },
          {
            path: '/information/baby',
            name: 'userBaby',
            component: () => import('@/views/information/baby.vue'),
            meta: {
              title: '宝贝管理',
              icon: 'User',
            },
          },
          {
            path: '/information/target',
            name: 'BabyTarget',
            component: () => import('@/views/information/target.vue'),
            meta: {
              title: '目标管理',
              icon: 'Tickets',
            },
          },
          {
            path: '/information/targetType',
            name: 'BabyTargetType',
            component: () => import('@/views/information/targetType.vue'),
            meta: {
              title: '分类管理',
              icon: 'Collection',
            },
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          title: '系统管理',
          icon: 'Setting',
          isShow: true,
        },
        children: [
          {
            path: '/system/target',
            name: 'systemTarget',
            component: () => import('@/views/system/target.vue'),
            meta: {
              title: '预设目标',
              icon: 'Tickets',
            },
          },
          {
            path: '/system/targetType',
            name: 'systemTargetType',
            component: () => import('@/views/system/targetType.vue'),
            meta: {
              title: '预设分类',
              icon: 'Collection',
            },
          },
          {
            path: '/system/wish',
            name: 'systemWish',
            component: () => import('@/views/system/wish.vue'),
            meta: {
              title: '预设心愿',
              icon: 'Star',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const routes = router.getRoutes()
  const menuRoutes = routes.filter(route => route.meta && route.meta.isShow && !route.meta.hidden)
  const hasRoute = menuRoutes.find(route => route.path == to.path)

  if (hasRoute) {
    const navStore = useNavStore()
    navStore.addTab({ path: to.path, meta: to.meta })
  }
})

export default router
