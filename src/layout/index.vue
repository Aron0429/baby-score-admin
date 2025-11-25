<!--
 * @Description: 
 * @Author: HuGang
 * @Date: 2025-11-25 16:19:48
 * @LastEditTime: 2025-11-25 16:30:13
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
