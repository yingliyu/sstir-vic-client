<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="logo-wrapper">
        <img @click="toHome" class="logo" src="./img/logo.png" />
        <span @click="toHome" class="logo-txt">{{$t('base.title')}}</span>
      </div>
      <lang-select></lang-select>
    </div>
    <div class="index-container">
      <div class="banner">
        <img class="pic-banner" src="./img/banner0.png" />
        <!-- 登录注册 start-->
        <div class="reg-wrapper-outer">
          <div class="login-form">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="title ? title : $t('reg.regTitle2')" name="first">
                <vcode-form @showUserAgreement="showAgreeHandle" @update="receiveHandle"></vcode-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 登录注册 end-->
      </div>
    </div>
    <!-- 用户协议 -->
    <el-dialog :visible.sync="agreementVisible" width="60%">
      <user-doc :list="$t('policy')" :imgW="imgW" :titleAlign="titleAlign"></user-doc>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreementVisible = false">{{$t('base.close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VcodeForm from './components/vcode-form'
import { mapActions } from 'vuex'
import UserDoc from '@/components/user-doc'
import LangSelect from '@/components/lang-select'
export default {
  name: 'UserReg',
  components: {
    VcodeForm,
    UserDoc,
    LangSelect
  },
  data () {
    return {
      agreementVisible: false,
      titleAlign: 'center',
      imgW: '70%',
      redirect: '',
      // title: '平台注册',
      activeName: 'first', // tabBar active
      loginType: '', // 登录方式：账号密码password|免密vcode
      imgCarousel: 0
    }
  },

  mounted () {
    this.redirect = this.$route.query.redirect
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
    title() {
      return this.language === 'en' ? 'Register' : '平台注册'
    }
  },
  methods: {
    ...mapActions({
      login: 'logIn'
    }),
    showAgreeHandle (val) {
      this.agreementVisible = val
    },
    toHome () {
      this.$router.push('/home')
    },
    receiveHandle (val) {
      this.title = val
    },

    handleClick (tab, event) {
      // this.loginType = tab.index === 0 ? 'user' : 'vcode'
    },
    getMsgLength () {
      return document.getElementsByClassName('el-message').length
    }
  }
}
</script>

<style lang="less" scoped>
.home-wrapper {
  .banner {
    img.pic-banner {
      width: 100%;
      height: 768px;
    }
  }
  .header {
    font-size: 32px;
    font-family: Arial;
    font-weight: bold;
    color: #2c4c87;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    .logo-wrapper{
      display: flex;
      align-items: center;
    }
    .logo-txt {
      padding-left: 5px;
      cursor: pointer;
    }
    img {
      height: 40px;
      cursor: pointer;
    }
  }
  .index-header {
    display: flex;
    justify-content: space-around;
    align-content: center;
    padding: 20px;
    img {
      width: 100px;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #666666;
      div {
        padding: 0px 20px;
        margin-right: 20px;
        height: 30px;
        line-height: 30px;
      }
      div:last-child {
        background-color: #3695ed;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .index-container {
    .banner {
      text-align: center;
      position: relative;
    }
  }
  .reg-wrapper-outer {
    width: 400px;
    position: absolute;
    top: 40%;
    right: 15%;
    transform: translateY(-50%);
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.11);
    .ico-logo {
      padding-bottom: 15px;
      box-sizing: border-box;
      img {
        width: 120px;
      }
    }
    .login-form {
      background: #fff;
      border-radius: 10px;
      padding-bottom: 30px;
      position: relative;
    }
    .wechat-wraper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      // bottom: 10px;
    }
    figure {
      cursor: pointer !important;
    }
    figcaption {
      font-size: 12px;
      color: #ccc;
      white-space: nowrap;
    }
  }
}
</style>
<style>
.el-tabs__nav-scroll .el-tabs__item {
  font-size: 16px;
}
.el-tabs__active-bar {
  height: 3px;
}
.reg-wrapper-outer .el-tabs__content {
  width: 320px;
  margin: 0 auto;
}
.reg-wrapper-outer .el-tabs__header {
  margin: 0 0 25px;
}
.reg-wrapper-outer .el-col.el-col-12:first-child {
  text-align: left;
}
.reg-wrapper-outer .el-col.el-col-12:last-child {
  text-align: right;
  color: #377ffc;
}
.reg-wrapper-outer .el-button.btn-reg {
  width: 320px;
  height: 40px;
}
.reg-wrapper-outer .el-input--mini .el-input__inner {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.reg-wrapper-outer .el-button.get-code {
  width: 135px;
  height: 40px;
  padding: 0;
  /* line-height: 40px; */
  position: absolute;
  right: 0;
  top: 0;
}
.reg-wrapper-outer .el-button.get-code:hover {
  color: #f1f1f1;
}
.reg-wrapper-outer .el-button--mini,
.reg-wrapper-outer .el-button--mini.is-round {
  padding: 0;
}

.reg-wrapper-outer .el-tabs__nav-scroll {
  height: 55px;
  line-height: 55px;
  display: flex;
  justify-content: center;
}
</style>
