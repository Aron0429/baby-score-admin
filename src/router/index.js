/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 16:18:42
 * @LastEditTime: 2025-12-01 01:50:01
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
    component: () => import('@/views/layout/index.vue'),
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
        path: '/account',
        name: 'account',
        meta: {
          title: '数据管理',
          icon: 'Coin',
          isShow: true,
          isSub: true,
        },
        children: [
          {
            path: '/account/user',
            name: 'user',
            component: () => import('@/views/account/user.vue'),
            meta: {
              title: '用户管理',
              icon: 'User',
            },
          },
          {
            path: '/account/baby',
            name: 'userBaby',
            component: () => import('@/views/account/baby.vue'),
            meta: {
              title: '宝贝管理',
              icon: 'User',
            },
          },
          {
            path: '/account/target',
            name: 'BabyTarget',
            component: () => import('@/views/account/target.vue'),
            meta: {
              title: '目标管理',
              icon: 'Tickets',
            },
          },
          {
            path: '/account/targetType',
            name: 'BabyTargetType',
            component: () => import('@/views/account/targetType.vue'),
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
          isSub: true,
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
  const filterRoutes = routes.filter(route => route.meta && !route.meta.hidden && !route.meta.isSub)
  const hasRoute = filterRoutes.find(route => route.path == to.path)

  if (hasRoute) {
    const navStore = useNavStore()
    navStore.addTab({ path: to.path, meta: to.meta })
  }
})

export default router
