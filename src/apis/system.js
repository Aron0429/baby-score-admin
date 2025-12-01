import Request from '@/utils/axiosInstance'
// 查询预设目标分类列表
export const queryTargetTypes = async params => {
  const res = await Request.get('/admin/targetTypes', { params })
  return res.data
}
