<template>
  <el-pagination
    background
    :total="total"
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, prev, pager, next, sizes"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
defineProps({
  pageSize: {
    //一页显示条数
    type: Number,
    default: 5,
  },
  currentPage: {
    //当前页
    type: Number,
    default: 2,
  },
  total: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['changeCurrent', 'changeSize'])

const handleCurrentChange = (val: number) => {
  emit('changeCurrent', val)
}
const handleSizeChange = (val: number) => {
  emit('changeSize', val)
}
</script>

<style lang="scss">
.el-pagination {
  flex: 1 1 0%;
  margin: 16px 0 0;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
