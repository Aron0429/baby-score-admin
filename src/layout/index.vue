<!--
 * @Description: 
 * @Author: HuGang
 * @Date: 2025-11-25 16:19:48
 * @LastEditTime: 2025-11-25 16:30:13
-->
<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside class="layout-aside" :width="isCollapse ? '64px' : '200px'">
        <Sidebar :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <HeaderBar :is-collapse="isCollapse" @change-collapse="updateIsCollapse" />
        </el-header>
        <el-main class="layout-main">
          <NavTabs />
          <el-container class="layout-content">
            <router-view />
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from './components/HeaderBar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import NavTabs from './components/NavTabs/index.vue'

// 侧边栏折叠状态
const isCollapse = ref(false)

const updateIsCollapse = value => {
  isCollapse.value = value
}
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;

  .layout-container {
    height: 100%;

    .layout-header {
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
    }

    .layout-aside {
      transition: width 0.3s ease;
      overflow: hidden;
      overflow-y: auto;
    }

    .layout-main {
      padding: 10px 20px;
      background-color: #f5f7f9;
      overflow: hidden;

      .layout-content {
        padding: 15px;
        background-color: #fff;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
