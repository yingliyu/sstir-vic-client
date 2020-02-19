import { AppPost, AppGet } from '@/utils/request'

// 获取数据列表
export function getDataList (data) {
  return AppGet('/vic/getDataList', data)
}

// 添加数据展示信息
export function getDataSource () {
  return AppGet(`/vic/getDataSource`)
}

// 任务运行
export function runTask (data) {
  return AppPost('/vic/runTask', data)
}

// 批量删除数据
export function delDatas (data) {
  return AppPost('vic/delDatas', data)
}
