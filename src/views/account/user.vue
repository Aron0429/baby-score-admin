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
    <el-table :data="state.tableData" stripe border style="width: 100%" max-height="640px">
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
      <el-table-column label="用户身份">
        <template #default="scope">
          <span>{{ state.userTypeObj[scope.row.typeId] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前宝贝ID" prop="currentBabyId"></el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
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
    <el-dialog v-model="state.dialogVisible" title="修改用户身份" width="300">
      <el-form>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="params.typeId">
            <el-option v-for="item in state.userTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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

import pagination from '@/components/pagination.vue'

import { queryUsers, queryUserTypeList } from '@/apis/account.js'

const queryForm = ref({
  publicId: '',
})

const state = ref({
  tableData: [],
  totalCount: 0,
  userTypeList: [],
  userTypeObj: {},
  dialogVisible: false,
})

const pageState = ref({
  page: 1,
  pageSize: 10,
})

const params = ref({
  typeId: null,
})

const pageInit = () => {
  fetchUsers()
  fetchUserTypeList()
}

pageInit()

async function fetchUsers() {
  const res = await queryUsers({ ...queryForm.value, ...pageState.value })
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
  fetchUsers()
}

const changeCurrent = num => {
  pageState.value.page = num
  fetchUsers()
}

async function fetchUserTypeList() {
  state.value.typeList = []
  const res = await queryUserTypeList()
  if (res.code === 200) {
    if (res.data.length > 0) {
      res.data.forEach(item => {
        state.value.userTypeList.push({ label: item.name, value: item.id })
        state.value.userTypeObj[item.id] = item.name
      })
    }
  }
}

const handleEdit = row => {
  params.value.typeId = row.typeId
  state.value.dialogVisible = true
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
