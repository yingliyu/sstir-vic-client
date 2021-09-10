<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="logo-wrapper">
        <img src="./img/logo.png" />
        <span class="logo-txt">病毒基因组检测平台</span>
      </div>
      <div class="btn-wrapper">
        <el-button @click="toLogin">登录</el-button>
        <el-button type="primary" @click="toReg">注册</el-button>
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
      this.$router.push('/home')
    },
    toReg () {
      this.$router.push('/setpwd')
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
    width: 100%;
    height: 300px;
    text-align: center;
    position: relative;
    .desc-wrapper {
      width: 900px;
      margin: 0 auto;
      p {
        text-align: left;
        line-height: 26px;
      }
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
    padding-right: 20px;
    .logo-wrapper {
      display: flex;
      align-items: center;
    }
    .btn-wrapper {
      display: flex;
      align-items: center;
    }
    img {
      height: 40px;
      padding-right: 10px;
    }
  }
}
</style>
<style>
.home-wrapper .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 17px;
  height: 17px;
  border-radius: 50%;
}
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
