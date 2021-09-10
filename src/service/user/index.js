import { AppPost } from '@/utils/request'

// 修改密码
export function changePwd (data) {
  return AppPost('/vic/modifyPwd', data)
}

// 设置/修改昵称
export function setNickname (data) {
  return AppPost('/vic/setNickname', data)
}
