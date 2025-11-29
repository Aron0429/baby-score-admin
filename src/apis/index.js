/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-29 02:10:53
 * @LastEditTime: 2025-11-29 18:01:42
 */
import Request from '@/utils/axiosInstance'

// 登录
export const login = async params => {
  const res = await Request.post('/admin/login', params)
  return res.data
}

// 查询目标分类列表
export const queryTargetTypes = async params => {
  const res = await Request.get('/admin/targetTypes', { params })
  return res.data
}
