<template>
  <div class="add-data-wrapper">
    <p>
      <b>由于测序数据普遍比较大，我们建议您通过SFTP传输数据</b>
    </p>
    <p class="ftp-data-txt">
      <span v-if="userInfo.ftpHost">
        IP地址：
        <i>{{userInfo.ftpHost}}</i>
      </span>
      <span v-if="userInfo.pord">
        端口：
        <i>{{userInfo.pord}}</i>
      </span>
      <span v-if="userInfo.ftpUsername">
        用户名：
        <i>{{userInfo.ftpUsername}}</i>
      </span>
      <span class="showPwd" v-if="userInfo.ftpPassword">
        密码：
        <el-tooltip class="item" effect="dark" :content="tooltipDesc" placement="right-start">
          <el-button @click="copyActiveCode($event, userInfo.ftpPassword)">
            <i>******</i>
          </el-button>
        </el-tooltip>
      </span>
    </p>
    <br />
    <p>立即下载</p>
    <ul>
      <li>
        <a :href="macUrl">
          <i class="iconfont vic-mac"></i>
          <p>mac-filezilla</p>
        </a>
      </li>
      <li>
        <a :href="windowsUrl">
          <i class="iconfont vic-windowsicon"></i>
          <p>windows-filezilla</p>
        </a>
      </li>
      <li class="intro-txt">
        <a :href="useDocs">
          <i class="iconfont vic-word"></i>
          <p>Readme</p>
        </a>
      </li>
    </ul>
    <br />

    <p>如果您的数据量特别大（超过20G），请发送邮件至tyzuo@sstir.cn，我们将安排服务专员与您取得联系。</p>
    <p>疫情当前，服务量可能较大，服务时间可能超出常规时间，敬请理解。</p>
  </div>
</template>

<script>
// import { datasheetsApi } from '@/service'
import appConfig from '@/config'
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
export default {
  name: 'ToolList',

  data () {
    return {
      tooltipDesc: '点击复制',
      macUrl: appConfig.downloadUrl + 'FileZilla_3.46.3_macosx-x86.app.tar.bz2',
      windowsUrl: appConfig.downloadUrl + 'FileZilla_3.46.3_win64-setup.exe',
      useDocs: appConfig.downloadUrl + 'filezilla使用指南.docx'
    }
  },

  mounted () {
    // this.initData()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 复制密码到粘贴板
    copyActiveCode (e, text) {
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
        this.$message({ type: 'error', message: '该浏览器不支持自动复制，更换浏览器试试吧~' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    },
    async initData () {
      // try {
      //   const { ftpHost, port, ftpUsername, ftpPassword } = await datasheetsApi.getDataSource()
      //   this.ip = ftpHost
      //   this.port = port
      //   this.email = ftpUsername
      //   this.pwd = ftpPassword
      // } catch (error) {
      //   console.log(error)
      //   this.$message.error(error)
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.add-data-wrapper {
  background: #fff;
  padding: 30px 50px;
  .ftp-data-txt {
    span {
      font-size: 14px;
      padding-right: 15px;
      i {
        font-style: normal;
        color: #409eff;
      }
    }
    .showPwd {
      cursor: pointer;
    }
  }
  ul {
    display: flex;
    p {
      color: #409eff;
      text-decoration: underline;
      padding-top: 10px;
      font-size: 14px;
    }
    .intro-txt {
      padding-left: 20px;
    }
    a {
      display: inline-block;
      height: 100%;
      // flex-direction: column;
      // -ms-flex-direction: column;
      // justify-content: center;
      // align-items: center;
      padding: 10px 40px 10px 0px;
      cursor: pointer;
      text-align: center;
      .iconfont {
        font-size: 40px;
        color: #666666;
      }
    }
  }
}
</style>
