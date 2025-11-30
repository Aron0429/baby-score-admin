<template>
  <div class="sidebar-container">
    <div class="sidebar-logo">
      <!-- <img src="@/assets/logo.png" alt="logo" class="logo-icon" /> -->
      <span class="sidebar-title" v-if="!isCollapse">后台管理系统</span>
    </div>

    <el-menu :default-active="activeMenu" :unique-opened="true" :collapse="props.isCollapse" router>
      <sidebar-item :router-list="menuRoutes" :base-path="'/'" />
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const router = useRouter()

// 获取当前激活的菜单路径
const activeMenu = computed(() => {
  const { path } = route
  return path
})

// 获取过滤后的菜单路由
const menuRoutes = computed(() => {
  const routes = router.getRoutes()
  return routes.filter(route => route.meta && route.meta.isShow && !route.meta.hidden)
})
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;

  .sidebar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 59px;
    border-bottom: 1px solid #e6e6e6;

    .sidebar-title {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .el-menu {
    height: calc(100% - 60px);
    border-right: none;
    overflow-y: auto;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
}

// 滚动条样式
.el-menu::-webkit-scrollbar {
  width: 3px;
}

.el-menu::-webkit-scrollbar-thumb {
  background: #324157;
  border-radius: 3px;
}

.el-menu::-webkit-scrollbar-track {
  background: #001529;
}
</style>
