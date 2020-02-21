<template>
  <div class="add-data-wrapper">
    <el-card class="box-card">
      <b>方法一：请点击下方链接前往上传</b>&nbsp;&nbsp;&nbsp;&nbsp;
      <a class="ucloudLink" :href="url" target="_blank">
        上传地址
      </a>
    </el-card>
    <br>
    <el-card class="box-card">
    <p><b>方法二：由于测序数据普遍比较大，我们建议您通过S3-Brower传输数据</b></p>
    <div class="step-one">
      <p>步骤一：立即下载</p>
      <ul>
        <li><a :href="macUrl"><i class="iconfont vic-mac"></i><span>mac版S3-Browser</span></a></li>
        <li><a :href="windowsUrl"><i class="iconfont vic-windowsicon"></i><span>S3-Browser</span></a></li>
        <li class="intro-txt"><a :href="useDocs"><span>使用说明</span></a></li>
      </ul>
    </div>
    <div class="step-two">
      <p class="title">步骤二：登录客户端（登录信息如下）</p>
      <ul>
        <li>
          <span>Account Name：</span>
            <el-tooltip class="item" effect="dark" :content="tooltipDesc" placement="right-start">
              <el-button><i @click='copyActiveCode($event, userInfo.uid)'>{{userInfo.uid}}</i></el-button>
            </el-tooltip>
        </li>
        <li>
          <span>REST Endpoint：</span>
          <el-tooltip class="item" effect="dark" :content="tooltipDesc" placement="right-start">
            <el-button><i @click='copyActiveCode($event, userInfo.endpoint)'>{{userInfo.endpoint}}</i></el-button>
          </el-tooltip>
        </li>
        <li>
          <span>Access Key ID：</span>
          <el-tooltip class="item" effect="dark" :content="tooltipDesc" placement="right-start">
            <el-button><i @click='copyActiveCode($event, userInfo.accessKey)'>{{userInfo.accessKey}}</i></el-button>
          </el-tooltip>
        </li>
        <li>
          <span>Secret Access Key：</span>
          <el-tooltip class="item" effect="dark" :content="tooltipDesc" placement="right-start">
            <el-button><i @click='copyActiveCode($event, userInfo.secretKey)'>{{userInfo.secretKey}}</i></el-button>
          </el-tooltip>
        </li>
        </ul>
    </div>
    <p>
      如果您的数据量特别大（超过20G），请发送邮件至tyzuo@sstir.cn，我们将安排服务专员与您取得联系。
    </p>
    <p>
      疫情当前，服务量可能较大，服务时间可能超出常规时间，敬请理解。
    </p>
    </el-card>
  </div>
</template>

<script>
import appConfig from '@/config'
import { mapGetters } from 'vuex'
import { datasheetsApi } from '@/service'
import Clipboard from 'clipboard'

export default {
  name: 'ToolList',

  data() {
    return {
      ip: '',
      port: '',
      email: '',
      pwd: '',
      tooltipDesc: '点击复制',
      macUrl: appConfig.baseUrl + 'S3-Browser-1.1 for mac.zip',
      windowsUrl: appConfig.baseUrl + 's3browser-8-6-7.exe',
      useDocs: appConfig.baseUrl + '配置 S3 Brower.docx'
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapGetters(['userInfo']),

    url() {
      return `${appConfig.ucloudUrl}?accesskey=${this.userInfo.accessKey}&secretkey=${this.userInfo.secretKey}`
    }
  },
  methods: {
    // 复制密码到粘贴板
    copyActiveCode(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制，更换浏览器试试吧~' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    },
    async initData() {
      try {
        const { ip, port, email, pwd } = await datasheetsApi.getDataSource()
        this.ip = ip
        this.port = port
        this.email = email
        this.pwd = pwd
      } catch (error) {
        console.log(error)
        this.$message.error(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-data-wrapper {
  background: #fff;
  padding: 30px 50px;
  .ucloudLink{
    display: inline-block;
    color: #409EFF;
    cursor:pointer;
    text-decoration: underline;
    padding: 30px 0;
  }
  .ftp-data-txt{
    span{
      font-size: 14px;
      padding-right: 15px;
      i{
        font-style: normal;
        color: #409EFF;
      }
    }
    .showPwd{
      cursor:pointer;
    }
  }
  .step-one{
  ul{
    display: flex;
    padding-left: 20px;
    span{
      color: #409EFF;
      text-decoration: underline;
      padding-top: 10px;
      font-size: 14px;
    }
    .intro-txt{
      padding-left: 20px;
    }
    a{
      display: flex;
      height:100%;
      flex-direction: column ;
      justify-content: center;
      align-items: center;
      padding: 10px 40px 10px 0px;
      cursor: pointer;
      .iconfont{
        font-size: 40px;
        color: #666666;
      }
    }

  }
  }
  .step-two{
    .title{
      padding-top: 30px;
      padding-bottom:10px;
    }
    li{
      font-size: 14px;
      padding-left:20px;
      padding-bottom: 10px;
    }
  }
}
</style>
