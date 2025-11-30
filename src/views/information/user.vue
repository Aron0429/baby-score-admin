<template>
  <div class="target-type-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="用户ID">
          <el-input v-model="queryForm.publicId" placeholder="请输入用户ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchUsers">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="state.tableData" stripe border style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span>{{ scope.row.publicId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型">
        <template #default="scope">
          <span>{{ scope.row.openid ? `微信用户[${scope.row.openid}]` : `App用户[${scope.row.email}]` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户身份" prop="typeId"></el-table-column>
      <el-table-column label="当前宝贝ID" prop="currentBabyId"></el-table-column>
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

import { queryUsers } from '@/apis'

const queryForm = ref({
  publicId: null,
})

const state = ref({
  tableData: [],
})

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

async function fetchUsers() {
  const res = await queryUsers(queryForm.value)
  const needhms = true
  if (res.code == 200) {
    state.value.tableData = res.data.map(item => {
      item.createAt = utils.transforDate(item.createAt, needhms)
      item.updateAt = utils.transforDate(item.updateAt, needhms)
      return item
    })
  }
}

fetchUsers()
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
