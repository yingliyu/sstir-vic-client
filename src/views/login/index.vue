<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="logo-wrapper">
        <img @click="toHome" src="./img/logo-txt.png" width="143" height="36" />
        <span @click="toHome" class="logo-txt">{{ $t('base.title') }}</span>
      </div>
      <lang-select></lang-select>
    </div>
    <div class="index-container">
      <div class="banner">
        <img class="pic-banner" src="./img/banner0.png" />
        <!-- 登录注册 start-->
        <div class="login-wrapper">
          <div class="ico-logo"></div>
          <div class="login-form">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('base.loginTitle')" name="first">
                <user-form></user-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 登录注册 end-->
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from './components/user-form'
import LangSelect from '@/components/lang-select'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    UserForm,
    LangSelect
  },
  data() {
    return {
      redirect: '',
      activeName: 'first', // tabBar active
      loginType: '' // 登录方式：账号密码password|免密vcode
    }
  },

  mounted() {
    this.redirect = this.$route.query.redirect
  },

  methods: {
    ...mapActions({
      login: 'logIn'
    }),
    toHome() {
      this.$router.push('/home')
    },
    handleClick(tab, event) {
      // this.loginType = tab.index === 0 ? 'user' : 'vcode'
    },

    getMsgLength() {
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
    line-height: 50px;
    display: flex;
    display: box;
    display: -ms-flexbox; /* TWEENER - IE 10 */
    -ms-align-items: center;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    .logo-wrapper {
      display: flex;
      align-items: center;
    }
    .logo-txt {
      padding-left: 20px;
      cursor: pointer;
      position: relative;
      &:before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 30px;
        background: #ccc;
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
    img {
      width: auto;

      cursor: pointer;
      vertical-align: middle;
    }
  }
  .index-header {
    display: flex;
    display: box;
    display: -ms-flexbox; /* TWEENER - IE 10 */
    justify-content: space-around;
    align-content: center;
    padding: 20px;
    img {
      width: 100px;
    }
    .btn {
      display: flex;
      display: box;
      display: -ms-flexbox; /* TWEENER - IE 10 */
      -ms-align-items: center;
      align-items: center;
      justify-content: center;
      -ms-justify-content: center;
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
      display: box;
      display: -ms-flexbox; /* TWEENER - IE 10 */
      justify-content: center;
      ms-justify-content: center;
      -ms-align-items: center;
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
  display: box;
  display: -ms-flexbox; /* TWEENER - IE 10 */
  justify-content: center;
  -ms-justify-content: center;
}
</style>
