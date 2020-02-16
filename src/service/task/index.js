import { AppGet } from '@/utils/request'

// 获取任务列表
export function getTaskList (data) {
  return AppGet('/vic/taskList', data)
}
