import { AppPost, AppGet } from '@/utils/request'

// 判断登录获取token
export function checkLogin (data) {
  return AppPost('/vic/login', data) // 账号密码登录api
}

// 获取用户信息
export function getUserInfo () {
  return AppGet(`/vic/getUserInfo`)
}

// 用户注册
export function regByEmail (data) {
  return AppPost('/vic/userReg', data)
}

// 邮箱验证激活
export function emailActive (data) {
  return AppGet('/vic/checkEmail', data)
}

// 邮箱验证码验证
export function checkCode (data) {
  return AppGet('/vic/checkCode', data)
}
