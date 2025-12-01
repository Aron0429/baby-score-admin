<template>
  <div class="target-type-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="分类名称">
          <el-input v-model="queryForm.name" placeholder="请输入分类名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchTargets">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
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
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-if="state.totalCount >= pageState.pageSize"
      :total="state.totalCount"
      :pageSize="pageState.pageSize"
      :currentPage="pageState.page"
      @changeSize="changeSize"
      @changeCurrent="changeCurrent"
    ></pagination>
    <el-dialog v-model="state.dialogVisible" title="修改用户身份" width="400">
      <el-form :model="params">
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="params.name" autocomplete="off" />
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

import { querySysTargetTypes } from '@/apis/system.js'

const queryForm = ref({
  name: null,
})

const state = ref({
  tableData: [],
  totalCount: 0,
  dialogVisible: false,
})

const pageState = ref({
  page: 1,
  pageSize: 10,
})

const params = ref({
  name: null,
})

fetchTargetTypes()

async function fetchTargetTypes() {
  const res = await querySysTargetTypes({ ...queryForm.value, ...pageState.value })
  if (res.code == 200) {
    state.value.tableData = res.data.list.map(item => {
      item.createAt = utils.transforDate(item.createAt)
      item.updateAt = utils.transforDate(item.updateAt)
      return item
    })
  }
}

const changeSize = size => {
  pageState.value.pageSize = size
  fetchTargetTypes()
}

const changeCurrent = num => {
  pageState.value.page = num
  fetchTargetTypes()
}

const handleEdit = row => {
  params.value.name = row.name
  state.value.dialogVisible = true
}

// async function handleDelete(row) {
//   const res = await babyDelete(row.id)
//   if (res.code === 200) {
//     utils.showToast('删除成功')
//     fetchBabys()
//   }
// }

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

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>
