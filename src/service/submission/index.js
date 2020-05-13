import { AppPost, AppGet } from '@/utils/request'

// 查询已认领的项目
export function getClaimSubmissionList (param) {
  return AppPost('exchange/exchange-flow/page', param)
}

// 查询新汇交项目列表
export function getNewSubmissionList (param) {
  return AppPost('/exchange/exchange-project/page', param)
}

// 查询已通过的汇交列表
export function getPassSubmissionList (param) {
  return AppPost('/exchange/exchange-project/enablePage', param)
}

// 认领项目(同时处理是我的项目即认领，不是我的即删掉)
export function claimProject (param) {
  return AppPost(`/exchange/exchange-project/claim`, param)
}

// 查询基本信息
export function findBaseInfo (id) {
  return AppGet(`/exchange/exchange-flow/find-base-info/${id}`)
}

// 通过版本号version查询汇交详情
export function getSubmissionDetail (param) {
  return AppPost('/exchange/exchange-project/findByVersion', param)
}

// 从已有项目中复制文件
export function copyFile (param) {
  return AppPost('/file/project-data/copy', param)
}

// 未知原因退出审核流程时修改汇交项目状态
export function updateInfo (param) {
  return AppPost('/exchange/exchange-flow/update-info', param)
}

// 根据版本号查询汇交项目
// export function findByVersion (param) {
//   return AppPost('/exchange/exchange-project/findByVersion', param)
// }

// 数据文件信息保存
export function saveUploadFile (param) {
  return AppPost('/file/project-data/create', param)
}

// 提交审核
export function submitVerify (param) {
  return AppPost('/exchange/exchange-flow/submitCheck', param)
}

// 查询版本信息
export function getProjectVersion (param) {
  return AppPost('/exchange/exchange-flow/getProjectVersion', param)
}
