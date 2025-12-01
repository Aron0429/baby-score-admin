<template>
  <div class="target-type-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="目标名称">
          <el-input v-model="queryForm.targetName" placeholder="请输入目标名称" clearable />
        </el-form-item>

        <el-form-item label="宝贝ID">
          <el-input v-model="queryForm.babyId" placeholder="请输入宝贝ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchTargets">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="state.tableData" stripe border style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目标名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="parentId"></el-table-column>
      <el-table-column label="评分方式" prop="score"></el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import utils from '@/utils'

import { queryTargetList, targetDelete } from '@/apis/account.js'

const queryForm = ref({
  targetName: '',
  babyId: null,
})

const state = ref({
  sex: [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
  ],
  tableData: [],
})

fetchTargets()

async function fetchBabys() {
  const res = await queryTargetList(queryForm.value)
  if (res.code == 200) {
    state.value.tableData = res.data.list.map(item => {
      item.createAt = utils.transforDate(item.createAt)
      item.updateAt = utils.transforDate(item.updateAt)
      return item
    })
  }
}

async function handleDelete(row) {
  const res = await targetDelete(row.id)
  if (res.code === 200) {
    utils.showToast('删除成功')
    fetchTargetList()
  }
}
</script>

<style lang="scss" scoped>
.target-type-container {
  width: 100%;

  .search-container {
    display: flex;
    margin-bottom: 20px;
  }
}
</style>
