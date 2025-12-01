import Request from '@/utils/axiosInstance'

// 登录
export const login = async params => {
  const res = await Request.post('/admin/login', params)
  return res.data
}
