<template>
  <div class="login-by-user">
    <el-form :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="userName">
        <el-input placeholder="邮箱" v-model="userForm.userName" clearable></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" placeholder="密码" v-model="userForm.pwd" clearable></el-input>
      </el-form-item>
      <el-form-item class="checkbox-wrapper">
        <el-row>
          <el-col :span="12">
            <el-checkbox label="下次自动登录" v-model="userForm.remeberPwd" name="type"></el-checkbox>
          </el-col>
          <el-col :span="12">
            <router-link to="/setpwd" target="_blank">
              <span>没有账户，去注册</span>
            </router-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-button type="primary" class="btn-login" @click="submitForm">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import { loginApi } from '@/service'
import { mapActions } from 'vuex'
import { email, password } from '@/utils/validate'
export default {
  name: 'UserForm',
  data () {
    return {
      vcodeBtnName: '获取验证码', // 用户名密码登录获取验证码按钮名称
      redirect: '',
      timer: null, // 定时器
      duration: 60, // 倒计时60s
      kind: 'login', // 实名认证：auth  登陆：login
      regEmail: /^\w+@[a-z0-9]+\.[a-z]+$/i,
      regMobile: /^1[3456789]\d{9}$/,
      userForm: {
        userName: '',
        pwd: '',
        remeberPwd: true
      },
      userRules: {
        userName: [email['required'], email['pattern']],
        pwd: [password['required'], password['length'], password['pattern']]
      }
    }
  },
  mounted () {
    this.redirect = this.$route.query.redirect
  },
  computed: {
    // 获取验证码按钮的状态
    ifDisabled () {
      if (this.userForm.userName !== '' && this.duration === 60) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'logIn'
    }),

    // 获取验证码 kind实名认证|登录
    async getCheckCode (param) {
      const totalDuration = this.duration // 记住倒计时总时长
      if (param === 0) {
        this.countDown(totalDuration)
      } else {
        try {
          if (this.regEmail.test(this.userForm.userName)) {
            await loginApi.emailActive({
              email: this.userForm.userName
            })
            this.$Notify(
              `验证码已发送到您的邮箱：${this.userForm.userName}`,
              'top-right'
            )
            this.countDown(totalDuration)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    // 倒计时
    countDown (totalDuration) {
      const that = this
      this.duration = this.duration - 1
      this.vcodeBtnName = `${this.duration}s`
      if (this.duration === 0) {
        this.duration = totalDuration
        this.vcodeBtnName = `重新发送`
        return
      }
      this.timer = setTimeout(function () {
        that.countDown(totalDuration)
      }, 1000)
    },

    // 登录注册调api
    async submitForm () {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          try {
            await this.login({ ...this.userForm })
            this.$router.push({ path: this.redirect || '/home/dashboard' })
          } catch {
            this.$message.error('登录失败，请重试~')
          }
        } else {
          console.log('error submit!!有必填项为空')
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang='less' scoped>
.login-by-user {
  .btn-login {
    font-size: 16px;
  }
}
</style>
