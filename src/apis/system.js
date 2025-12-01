import Request from '@/utils/axiosInstance'
// ---------目标管理--------
// 查询预设目标列表
export const querySysTarget = async params => {
  const res = await Request.get('/admin/targets', { params })
  return res.data
}
// 删除目标
export const sysTargetDelete = async params => {
  const res = await Request.delete('/target/delete', params)
  return res.data
}

// ---------分类管理--------
// 查询预设分类列表
export const querySysTargetTypes = async params => {
  const res = await Request.get('/admin/targetTypes', { params })
  return res.data
}
