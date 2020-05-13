import { AppPost } from '@/utils/request'

/**
 * 获取汇交项目列表
 */
export function changePwd (data) {
  return AppPost('/changePwd', data)
}

// 新建项目
export function newProject (param) {
  return AppPost('/project/add', param)
}

// 删除项目
export function delProject (param) {
  return AppPost('/project/del', param)
}

// 项目列表
export function projectList (param) {
  return AppPost('/project/page', param)
}

// 修改项目描述
export function modifyRemark (param) {
  return AppPost('/project/remark', param)
}
