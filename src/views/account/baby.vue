<template>
  <div class="target-type-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="宝贝名称">
          <el-input v-model="queryForm.babyName" placeholder="请输入宝贝名称" clearable />
        </el-form-item>
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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宝贝昵称" prop="name"></el-table-column>
      <el-table-column label="所属用户ID" prop="parentId"></el-table-column>
      <el-table-column label="宝贝性别">
        <template #default="scope">
          <span>{{ scope.row.sex == 1 ? '男' : '女 ' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宝贝积分" prop="score"></el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="state.dialogVisible" title="修改用户身份" width="400">
      <el-form :model="params">
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="params.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" label-width="80px">
          <el-select v-model="params.sex">
            <el-option v-for="item in state.sex" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="宝贝积分" label-width="80px">
          <el-input v-model="params.score" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import utils from '@/utils'

import { queryBabys, babyDelete } from '@/apis/account.js'

const queryForm = ref({
  babyName: '',
  publicId: null,
})

const state = ref({
  sex: [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
  ],
  tableData: [],
  dialogVisible: false,
})

const params = ref({
  name: '',
  sex: '',
  score: '',
})

fetchUsers()

async function fetchUsers() {
  const res = await queryBabys(queryForm.value)
  if (res.code == 200) {
    state.value.tableData = res.data.list.map(item => {
      item.createAt = utils.transforDate(item.createAt)
      item.updateAt = utils.transforDate(item.updateAt)
      return item
    })
  }
}

const handleEdit = (index, row) => {
  params.value = {
    name: row.name,
    sex: row.sex,
    score: row.score,
  }
  state.value.dialogVisible = true
}

async function handleDelete(row) {
  const res = await babyDelete(row.id)
  if (res.code === 200) {
    utils.showToast('删除成功')
    fetchUsers()
  }
}

const handleCancel = () => {
  state.value.dialogVisible = false
}

async function handleConfirm() {
  state.value.dialogVisible = false
  console.log(params.value.typeId)
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
