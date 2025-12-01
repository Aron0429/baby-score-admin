import Request from '@/utils/axiosInstance'

// 查询用户列表
export const queryUsers = async params => {
  const res = await Request.get('/admin/users', { params })
  return res.data
}
