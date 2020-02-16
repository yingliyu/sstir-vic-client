<template>
  <div class="home-wrapper">
    <!-- <div class="index-header">
      <div class="img">
        <img src="./img/logo.png" />
      </div>
      <div class="btn">
        <div @click="linkTo">注册</div>
        <div @click="onLogin">登录</div>
      </div>
    </div>-->
    <div class="header">
      <img src="./img/logo.png" />
      <span class="logo-txt">病毒基因组检测平台</span>
    </div>
    <div class="index-container">
      <div class="banner">
        <img class="pic-banner" src="./img/banner0.png" />
        <!-- 登录注册 start-->
        <div class="login-wrapper">
          <div class="ico-logo">
            <!-- <img width="120px" src="./img/logo.png" /> -->
          </div>
          <div class="login-form">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="欢迎登录" name="first">
                <user-form></user-form>
              </el-tab-pane>
              <!-- <el-tab-pane label="免密码登录" name="second">
                <vcode-form></vcode-form>
              </el-tab-pane>-->
            </el-tabs>
          </div>
        </div>
        <!-- 登录注册 end-->
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from './components/userForm'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    UserForm
  },
  data () {
    return {
      redirect: '',
      activeName: 'first', // tabBar active
      loginType: '', // 登录方式：账号密码password|免密vcode
      imgCarousel: 0
    }
  },

  mounted () {
    this.redirect = this.$route.query.redirect
  },

  methods: {
    ...mapActions({
      login: 'logIn'
    }),

    changeCarousel (e) {
      this.imgCarousel = e
    },

    linkTo () {
      // this.login()
    },

    async onLogin () {
      try {
        await this.login()
        this.$router.push({ path: this.redirect || '/home/dashboard' })
      } catch {
        this.$message.error('登录失败，请重试')
      }
    },
    handleClick (tab, event) {
      this.loginType = tab.index === 0 ? 'user' : 'vcode'
    },
    // 微信登录渠道
    wechatLogin () {
      // alert('功能升级中，敬请期待~')
      if (this.getMsgLength() === 0) {
        this.$message.warning('功能升级中，敬请期待~')
      }
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
    // background: -webkit-linear-gradient(#2e3033, #383c44); /* Safari 5.1 - 6.0 */
    // background: linear-gradient(#2e3033, #383c44); /* 标准的语法 */
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
    line-height: 46px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    img {
      height: 40px;
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
  .login-wrapper {
    width: 400px;
    position: absolute;
    top: 50%;
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
.login-wrapper .el-tabs__content {
  width: 320px;
  margin: 0 auto;
}
.login-wrapper .el-tabs__header {
  margin: 0 0 25px;
}
.login-wrapper .el-col.el-col-12:first-child {
  text-align: left;
}
.login-wrapper .el-col.el-col-12:last-child {
  text-align: right;
  color: #377ffc;
}
.login-wrapper .el-button.btn-login {
  width: 320px;
  height: 40px;
}
.login-wrapper .el-input--mini .el-input__inner {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.login-wrapper .el-button.get-code {
  width: 90px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 0;
  top: 0;
}
.login-wrapper .el-button.get-code:hover {
  color: #f1f1f1;
}
.login-wrapper .el-button--mini,
.login-wrapper .el-button--mini.is-round {
  padding: 0;
}

.login-wrapper .el-tabs__nav-scroll {
  height: 55px;
  line-height: 55px;
  display: flex;
  justify-content: center;
}
</style>
