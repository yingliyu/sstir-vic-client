import { AppPost, AppGet } from '@/utils/request'

// 查询数据中心
export function getDataCenter (param) {
  return AppPost('/exchange/data-center/find', param)
}

// 增加数据中心
export function AddDataCenter (param) {
  return AppPost('/exchange/data-center', param)
}

// 根据id查询数据中心
export function getDataCenterById (id) {
  return AppGet(`/exchange/data-center/findById/${id}`)
}

// 根据汇交项目id查询数据中心
export function getSubmissionDataCenter (id) {
  return AppGet(`/exchange/exchange-project/findById/${id}`)
}

// 分页查询目录/文件
export function getFileList (param) {
  return AppPost('/file/project-dir/page', param)
}

// 获取项目目录pid
export function getDirId(projectId) {
  return AppPost(`/file/project-dir/findDirId`, { projectId })
}
// 数据管理
export function dataManage (param) {
  return AppPost('/file/project-dir/pageBack', param)
}
