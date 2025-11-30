/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-29 02:10:53
 * @LastEditTime: 2025-11-30 17:21:32
 */
import Request from '@/utils/axiosInstance'

// 登录
export const login = async params => {
  const res = await Request.post('/admin/login', params)
  return res.data
}

/* 用户管理 */
// 查询用户列表
export const queryUsers = async params => {
  const res = await Request.get('/admin/users', { params })
  return res.data
}

/* 系统管理 */
// 查询预设目标分类列表
export const queryTargetTypes = async params => {
  const res = await Request.get('/admin/targetTypes', { params })
  return res.data
}
