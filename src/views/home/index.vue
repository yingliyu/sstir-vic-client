<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="logo-wrapper">
        <img src="./img/logo.png" />
        <span class="logo-txt">病毒基因组检测平台</span>
      </div>
      <div class="link-wrapper">
        <span class="login-link" @click="toLogin">登录</span>
        <span class="line">|</span>
        <span class="reg-link" @click="toReg">注册</span>
      </div>
    </div>
    <div class="index-container">
      <div class="banner">
        <div class="block">
          <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
          <el-carousel height="450px" arrow="never">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="desc-wrapper">
          <p>基因组测序是新型冠状病毒疑似病例确诊的病原学证据之一，是病毒朔源、变异进化、致病机理等研究的基础性工作。</p>

          <p>我们直接对接二代基因测序原始数据，具有对数据全自动质量控制、拼接和病毒组成分析等功能，实现了快速检测样本中可能存在的包括新型冠状病毒在内的各种病毒，并在线分析其相对载量，基于分析结果，精准识别病毒基因特性，监测病毒变异趋势，为后续的疫苗与药物研发提供数据支撑。</p>
        </div>
        <el-button type="primary" size="medium" @click="toLogin">开始体验</el-button>
      </div>
    </div>
    <footer>
      <div class="footer-inner">
         <p>客服咨询： tyzuo@sstir.cn</p>
          <ul>
            <li>
              沪ICP备10209921号-8
            </li>
            <li>
              沪公网安备 31010402003580号
            </li>
            <li>
              上海市钦州路100号二号楼4楼
            </li>
          </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
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
    toLogin () {
      this.$router.push('/login')
    },
    toReg () {
      this.$router.push('/reg')
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
  footer{
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    left: 0%;
    background: #898989;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    .footer-inner{
      width: 1200px;
      margin: 0 auto;
    }
    ul{
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<style>
.home-wrapper .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.home-wrapper .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.home-wrapper .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
