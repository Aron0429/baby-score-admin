<template>
  <div class="target-type-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="目标名称">
          <el-input v-model="queryForm.name" placeholder="请输入目标名称" clearable />
        </el-form-item>
        <el-form-item label="目标分类">
          <el-select v-model="queryForm.typeId" placeholder="请选择目标分类" clearable>
            <el-option v-for="item in state.typesList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄段">
          <el-select v-model="queryForm.groupId" placeholder="请选择年龄段" clearable>
            <el-option v-for="item in state.ageList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchTargets">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="state.tableData" stripe border style="width: 100%" max-height="640px">
      <el-table-column label="id">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目标名称" prop="name"></el-table-column>
      <el-table-column label="评分方式" prop="score">
        <template #default="scope">
          <span>{{ scope.row.fixed == 1 ? '固定评分' : '自由评分' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="typeId">
        <template #default="scope">
          <span>
            <span>{{ state.typesObj[scope.row.typeId] }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import utils from '@/utils'

import pagination from '@/components/pagination.vue'

import { querySysTarget, querySysTargetTypes, sysTargetDelete } from '@/apis/system.js'

const queryForm = ref({
  name: null,
  typeId: null,
  groupId: null,
})

const state = ref({
  tableData: [],
  totalCount: 0,
  ageList: [
    {
      value: 1,
      label: '3-5岁幼儿园阶段',
    },
    {
      value: 2,
      label: '6-8岁低龄阶段',
    },
    {
      value: 3,
      label: '9岁及以上小学阶段',
    },
  ],
  typesList: [],
  typesObj: {},
})

const pageState = ref({
  page: 1,
  pageSize: 10,
})

const pageInit = () => {
  fetchTargets()
  fetchTargetTypes()
}

pageInit()

async function fetchTargets() {
  const res = await querySysTarget({ ...queryForm.value, ...pageState.value })
  if (res.code == 200) {
    state.value.totalCount = res.data.total
    state.value.tableData = res.data.list.map(item => {
      item.createAt = utils.transforDate(item.createAt)
      item.updateAt = utils.transforDate(item.updateAt)
      return item
    })
  }
}

async function fetchTargetTypes() {
  const res = await querySysTargetTypes()
  if (res.code == 200) {
    res.data.list.map(item => {
      state.value.typesList.push({ value: item.id, label: item.name })
      state.value.typesObj[item.id] = item.name
    })
  }
}

const changeSize = size => {
  pageState.value.pageSize = size
  fetchTargets()
}

const changeCurrent = num => {
  pageState.value.page = num
  fetchTargets()
}

async function handleDelete(row) {
  const res = await sysTargetDelete(row.id)
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
