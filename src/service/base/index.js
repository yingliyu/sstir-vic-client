/**
 * 公共分类接口
 */
import { AppPost } from '@/utils/request'
// import appConfig from '@/config'
/**
 * 手机短信验证 —— 手机获取验证码
 */
export function getVcodeByMobile (param) {
  return AppPost('/user/sms', param)
}

/**
 * 邮箱验证码
 */
export function getVcodeByEmail (param) {
  return AppPost('/user/getVcode', param)
}

// 下拉框接口类型：type（first一级学科； second二级学科；datatype数据分级；peotecttime数据保护期；getcenter接收中心；dept_name工作单位；title职称；direction研究方向）
export function userconfigWork (type) {
  return AppPost('/userconfig/config/work/type', { type })
}

// 文件上传
export function fileUpload (file) {
  return AppPost('/file/file/upload', { file })
}

// 下载示例文档
export function downFile (type) {
  return AppPost('/userconfig/model/type', type)
}
