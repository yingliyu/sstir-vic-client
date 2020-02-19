// 根据当前mode获取Base Url 类型
const env = process.env.VUE_APP_BASE_URL_TYPE
// const url = 'http://192.168.2.12:8080'
const url = 'http://10.11.0.91:9998/'
// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case 'dev':
      return url
    // qa
    case 'qa':
      return url
    // production
    default:
      return url
  }
}

const appConfig = {
  baseUrl: getBaseUrl(env),
  uploadUrl: `${url}/file/file/upload`,
  appToken: process.env.VUE_APP_TOKEN_KEY // token key
}

export default appConfig
