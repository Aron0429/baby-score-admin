<template>
  <div class="navtabs-container">
    <keep-alive>
      <el-tabs
        type="card"
        v-model="store.tabActivePath"
        closable
        @tab-click="handleSwitchTab"
        @tab-remove="handleRemoveTab"
      >
        <el-tab-pane v-for="(item, index) in store.tabList" :key="index" :name="item.path">
          <template #label>
            <div class="nav-tab-label">
              <el-icon v-if="item.meta?.icon">
                <component :is="item.meta.icon" />
              </el-icon>
              <span>{{ item.meta?.title }}</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </keep-alive>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNavStore } from '@/stores/nav'

const router = useRouter()
const store = useNavStore()

const handleSwitchTab = tabItem => {
  const path = tabItem.props.name
  store.tabActivePath = path

  router.push(path)
}

const handleRemoveTab = path => {
  if (path == '/home') return

  store.removeTab(path)

  const lastTab = store.tabList[store.tabList.length - 1]
  store.tabActivePath = lastTab.path

  router.push(lastTab.path)
}
</script>

<style lang="scss" scoped>
.nav-tab-label {
  display: flex;
  align-items: center;
  > .el-icon {
    font-size: 16px;
    margin-right: 5px;
  }
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border-bottom-color: var(--el-border-color-light);
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  border-bottom-color: transparent;
}
:deep(.el-tabs--card > .el-tabs__header) {
  margin-bottom: 0;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  background-color: #fff;
}
</style>
