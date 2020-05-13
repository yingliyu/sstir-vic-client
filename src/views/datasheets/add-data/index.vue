<template>
  <div class="add-data-wrapper">
    <p><b>{{$t('dataMgt.add.tips')}}</b></p>
    <p class="ftp-data-txt">
      <span v-if='userInfo.ftpHost'>{{$t('dataMgt.add.ip')}}：<i>{{userInfo.ftpHost}}</i></span>
      <span v-if='userInfo.pord'>{{$t('dataMgt.add.port')}}：<i>{{userInfo.pord}}</i></span>
      <span v-if='userInfo.ftpUsername'>{{$t('dataMgt.add.userName')}}：<i>{{userInfo.ftpUsername}}</i></span>
      <span class='showPwd' v-if='userInfo.ftpPassword'>{{$t('dataMgt.add.pwd')}}：
        <el-tooltip class="item" effect="dark" :content="language==='en'? 'Click to copy' : '点击复制'" placement="right-start">
          <el-button @click='copyActiveCode($event, userInfo.ftpPassword)'><i>******</i></el-button>
        </el-tooltip>
      </span>
    </p>
    <br>
    <p>{{$t('dataMgt.add.download')}}</p>
    <ul>
      <li><a :href="macUrl"><i class="iconfont vic-mac"></i><br><span>mac-filezilla</span></a></li>
      <li><a :href="windowsUrl"><i class="iconfont vic-windowsicon"></i><br><span>windows-filezilla</span></a></li>
      <li class="intro-txt"><a :href="useDocs"><i class="iconfont vic-word"></i><br><span>Readme</span></a></li>
    </ul>
    <br>
    <p>
      {{$t('dataMgt.add.desc1')}}
    </p>
    <p>
      {{$t('dataMgt.add.desc2')}}
    </p>
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
      macUrl: appConfig.downloadUrl + 'FileZilla_3.46.3_macosx-x86.app.tar.bz2',
      windowsUrl: appConfig.downloadUrl + 'FileZilla_3.46.3_win64-setup.exe',
      useDocs: appConfig.downloadUrl + 'filezilla-guide.docx'
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'language'])
  },

  methods: {
    // 复制密码到粘贴板
    copyActiveCode (e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: 'Copied to clipboard!' })
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
    async initData() {
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
  .ftp-data-txt{
    span{
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
  ul{
    display: flex;
    span{
      color: #409EFF;
      display: inline-block;
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
