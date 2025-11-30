<template>
  <div class="target-type-container">
    <div class="button-container">
      <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">新建分类</el-button>
    </div>
    <el-table :data="state.tableData" stripe border style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import utils from '@/utils'

import { queryTargetTypes } from '@/apis'

const state = ref({
  tableData: [],
})

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

async function fetchTargetTypes() {
  const res = await queryTargetTypes()
  const needhms = true
  if (res.code == 200) {
    state.value.tableData = res.data.map(item => {
      item.createAt = utils.transforDate(item.createAt, needhms)
      item.updateAt = utils.transforDate(item.updateAt, needhms)
      return item
    })
  }
}

fetchTargetTypes()
</script>

<style lang="scss" scoped>
.target-type-container {
  width: 100%;

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>
