import { AppGet, AppPost } from '@/utils/request'

// 获取任务列表
export function getTaskList (data) {
  return AppGet('/vic/taskList', data)
}

export function runTask(data) {
  return AppPost('/vic/runTask', data)
}
