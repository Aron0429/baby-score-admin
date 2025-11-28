<template>
  <div class="header-content">
    <!-- 折叠按钮 -->
    <div class="collapse-button" @click="toggleCollapse">
      <el-icon v-if="props.isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>

    <!-- 头部其他内容 -->
    <div class=""></div>

    <!-- 用户信息等 -->
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          管理员<el-icon><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// 接收父组件传递的折叠状态
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['changeCollapse'])

// 切换折叠状态
const toggleCollapse = () => {
  emit('changeCollapse', !props.isCollapse)
}
</script>

<style lang="scss" scope>
.header-content {
  display: flex;
  align-items: center;
  height: 60px;

  .collapse-button {
    cursor: pointer;
    margin-right: 20px;
    display: flex;
    align-items: center;

    > .el-icon {
      font-size: 20px;
    }
  }

  .user-info {
    cursor: pointer;
  }
}
</style>
