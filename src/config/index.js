// 根据当前mode获取Base Url 类型
const env = process.env.VUE_APP_BASE_URL_TYPE

// const url = 'http://10.11.0.91:9998/'
// const url = 'http://rap2api.taobao.org/app/mock/244425'

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getUrl = () => {
  switch (env) {
    // development
    case 'dev':
      return {
        baseUrl: 'http://10.11.0.91:9998/',
        ucloudUrl: 'http://172.16.62.200:8001/v1/s3c/home/bucket'
      }
    // qa
    case 'qa':
      return {
        baseUrl: 'http://10.11.0.91:9998/',
        ucloudUrl: 'http://172.16.62.200:8001/v1/s3c/home/bucket'
      }
    // production
    default:
      return {
        baseUrl: 'http://10.11.0.91:9998/',
        ucloudUrl: 'http://172.16.62.200:8001/v1/s3c/home/bucket'
      }
  }
}

const appConfig = {
  baseUrl: getUrl().baseUrl,
  ucloudUrl: getUrl().ucloudUrl,
  appToken: process.env.VUE_APP_TOKEN_KEY // token key
}

export default appConfig
