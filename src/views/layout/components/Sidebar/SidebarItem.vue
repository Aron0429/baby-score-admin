<template>
  <template v-for="item in props.routerList" :key="item.path">
    <el-sub-menu v-if="item.children && item.children.length > 0 && !item.meta?.hidden" :index="item.path">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>

      <!-- 递归调用 -->
      <sidebar-item :router-list="item.children" :base-path="item.path" />
    </el-sub-menu>

    <el-menu-item v-else-if="!item.meta?.hidden" :index="item.path" @click="handleClickMenuItem(item.path, item.meta)">
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { useNavStore } from '@/stores/nav'

const store = useNavStore()

const props = defineProps({
  routerList: {
    type: Array,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const handleClickMenuItem = (path, meta) => {
  store.addTab({ path, meta })
}
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color);
  font-weight: 500;
}
</style>
