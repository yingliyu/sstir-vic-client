<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="logo-wrapper">
        <img src="./img/logo.png" />
        <span class="logo-txt">{{ $t('base.title') }}</span>
      </div>
      <div class="link-wrapper">
        <lang-select></lang-select>
        <span class="login-link" @click="toLogin">{{ $t('base.btnLogin') }}</span>
        <span class="line">|</span>
        <span class="reg-link" @click="toReg">{{ $t('base.btnReg') }}</span>
      </div>
    </div>
    <div class="index-container">
      <div class="banner">
        <div class="block">
          <el-carousel arrow="never">
            <el-carousel-item v-for="item in 2" :key="item">
              <div :style="{width: '100%',paddingBottom: '60%', backgroundImage: `url(${require('./img/0'+item+'.png')})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 0'}" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="desc-wrapper">
          <p>
            {{$t('home.desc1')}}
          </p>
          <p>
            {{$t('home.desc2')}}
          </p>
        </div>
        <br>
        <el-button type="primary" size="medium" @click="toLogin">{{$t('home.btnStart')}}</el-button>
        <br><br><br>
        <footer>
          <div class="footer-inner">
            <p>{{$t('home.customerService')}}</p>
            <!-- <ul>
              <li>
                沪ICP备10209921号-8
              </li>
              <li>
                沪公网安备 31010402003580号
              </li>
              <li>
                上海市钦州路100号二号楼4楼
              </li>
            </ul> -->
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import pic1 from './img/01.png'
import LangSelect from '@/components/lang-select'

export default {
  name: 'Login',
  components: {
    LangSelect
  },
  data() {
    return {
      pic1,
      redirect: '',
      activeName: 'first', // tabBar active
      loginType: '', // 登录方式：账号密码password|免密vcode
      imgCarousel: 0
    }
  },

  mounted() {
    this.redirect = this.$route.query.redirect
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    ...mapActions({
      login: 'logIn'
    }),
    toLogin() {
      this.$router.push('/login')
    },
    toReg() {
      this.$router.push('/reg')
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
    width: 100%;
    height: 300px;
    text-align: center;
    position: relative;
    .desc-wrapper {
      width: 1200px;
      margin: 0 auto;
      p {
        text-align: left;
        line-height: 26px;
      }
    }
  }
  .header {
    font-family: Arial;
    font-weight: bold;
    color: #2c4c87;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 20px;
    .logo-txt {
      font-size: 32px;
      padding-left: 5px;
      cursor: pointer;
    }
    .logo-wrapper {
      display: flex;
      align-items: center;
    }
    .link-wrapper {
      display: flex;
      align-items: center;
      .login-link {
        color: #2dbcef;
        margin-right: 10px;
        cursor: pointer;
      }
      .line {
        color: #ccc;
      }
      .reg-link {
        color: #7f7f7f;
        padding-left: 10px;
        cursor: pointer;
      }
    }
    img {
      height: 40px;
      padding-right: 10px;
      cursor: pointer;
    }
  }
  footer {
    width: 100%;
    height: 80px;
    background: #898989;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    .footer-inner {
      width: 1200px;
      text-align:left;
      margin: 0 auto;
    }
    ul {
      display: flex;
      justify-content: space-between;
    }
  }
  /deep/ .el-carousel__container{
    width:100%;
    height:auto;
    padding-bottom:60%;
  }
}
</style>
