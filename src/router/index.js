/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 16:18:42
 * @LastEditTime: 2025-11-29 21:00:44
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
        path: '/system',
        name: 'system',
        meta: {
          title: '系统管理',
          icon: 'Setting',
          isShow: true,
        },
        children: [
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user/index.vue'),
            meta: {
              title: '用户管理',
              icon: 'User',
            },
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role/index.vue'),
            meta: {
              title: '角色管理',
              icon: 'UserFilled',
            },
          },
        ],
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
            path: '/information/target',
            name: 'informationTarget',
            component: () => import('@/views/information/target.vue'),
            meta: {
              title: '目标管理',
              icon: 'Tickets',
            },
          },
          {
            path: '/information/targetType',
            name: 'informationTargetType',
            component: () => import('@/views/information/targetType.vue'),
            meta: {
              title: '目标分类',
              icon: 'Collection',
            },
          },
          {
            path: '/information/wish',
            name: 'informationWish',
            component: () => import('@/views/information/wish.vue'),
            meta: {
              title: '心愿管理',
              icon: 'Collection',
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
