<template>
  <div class="add-data-wrapper">
    <p><b>由于测序数据普遍比较大，我们建议您通过FTP传输数据</b></p>
    <p class="ftp-data-txt">
      <span>IP地址：<i>{{ip}}</i></span>
      <span>端口：<i>{{port}}</i></span>
      <span>用户名：<i>{{email}}</i></span>
      <span>密码：<i>{{pwd}}</i></span>
    </p>
    <br>
    <p>立即下载</p>
    <ul>
      <li><i class="iconfont vic-mac"></i><span>mac版filezilla</span></li>
      <li><i class="iconfont vic-windowsicon"></i><span>filezilla</span></li>
      <li class="intro-txt"><span>使用说明</span></li>
    </ul>
    <br>

    <p>
      如果您的数据量特别大（超过20G），请发送邮件至tyzuo@sstir.cn，我们将安排服务专员与您取得联系。
    </p>
    <p>
      疫情当前，服务量可能较大，服务时间可能超出常规时间，敬请理解。
    </p>
  </div>
</template>

<script>
import { datasheetsApi } from '@/service'
export default {
  name: 'ToolList',

  data () {
    return {
      ip: '',
      port: '',
      email: '',
      pwd: ''
    }
  },

  mounted () {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { ip, port, email, pwd } = await datasheetsApi.getDataSource()
        this.ip = ip
        this.port = port
        this.email = email
        this.pwd = pwd
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-data-wrapper {
  background: #fff;
  // margin-left: 5px;
  padding: 30px 50px;
  .ftp-data-txt{
    span{
      font-size: 14px;
      padding-right: 15px;
      i{
        font-style: normal;
        color: #0e6c9c;
      }
    }
  }
  ul{
    display: flex;
    span{
      color: #0e6c9c;
      text-decoration: underline;
      padding-top: 10px;
      font-size: 14px;
    }
    .intro-txt{
      padding-left: 20px;
    }
    li{
      display: flex;
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
</style>
