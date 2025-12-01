import Request from '@/utils/axiosInstance'
// ---------用户管理--------
// 查询用户列表
export const queryUsers = async params => {
  const res = await Request.get('/admin/users', { params })
  return res.data
}

// 查询用户身份列表
export const queryUserTypeList = async params => {
  const res = await Request.get('/user/type', { params })
  return res.data
}

// ---------宝贝管理--------
// 查询宝贝列表
export const queryBabys = async params => {
  const res = await Request.get('/admin/babys', { params })
  return res.data
}

// 删除宝贝
export const babyDelete = async (babyId, params) => {
  const res = await Request.delete(`/admin/baby/${babyId}`, params)
  return res.data
}

// ---------目标管理--------
// 查询(全部)宝贝目标列表
export const queryTargetList = async params => {
  const res = await Request.get('/admin/babyTargets', params)
  return res.data
}

// 删除目标
export const targetDelete = async params => {
  const res = await Request.delete('/target/delete', params)
  return res.data
}
