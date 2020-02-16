<template>
  <div class="login-by-user">
    <el-form :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="loginName">
        <el-input placeholder="邮箱" v-model="userForm.loginName" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="userForm.password" clearable></el-input>
      </el-form-item>
      <transition name="slide-fade" mode="in-out">
        <el-form-item class="get-code-wrapper" prop="vcode" v-if="!ifReg">
          <el-input placeholder="输入验证码" v-model="userForm.vcode"></el-input>
          <el-button
            type="primary"
            class="get-code"
            :disabled="ifDisabled"
            @click="getCheckCode()"
          >{{vcodeBtnName}}</el-button>
        </el-form-item>
      </transition>
      <el-form-item class="checkbox-wrapper">
        <el-row>
          <el-col :span="12">
            <el-checkbox label="下次自动登录" v-model="userForm.remeberPwd" name="type"></el-checkbox>
          </el-col>
          <el-col :span="12">
            <router-link to="/reg" target="_blank">
              <span>没有账户，去注册</span>
            </router-link>
          </el-col>
          <!-- <el-col :span="12">
            <router-link to="/findpwd" target="_blank">
              <span>忘记密码</span>
            </router-link>
          </el-col>-->
        </el-row>
        <el-form-item>
          <router-link to="/findpwd" target="_blank">
            <span>忘记密码</span>
          </router-link>
        </el-form-item>
      </el-form-item>
      <el-button type="primary" class="btn-login" @click="formValidate()">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import { baseApi } from '@/service'
import { mapActions } from 'vuex'
import { loginName, password } from '@/utils/validate'
export default {
  name: 'UserForm',
  data () {
    return {
      loginTypeName: '', // 手机|邮箱，用于提示描述
      ifReg: true, // 默认true已注册
      vcodeBtnName: '获取验证码', // 用户名密码登录获取验证码按钮名称
      redirect: '',
      timer: null, // 定时器
      duration: 60, // 倒计时60s
      kind: 'login', // 实名认证：auth  登陆：login
      regEmail: /^\w+@[a-z0-9]+\.[a-z]+$/i,
      regMobile: /^1[3456789]\d{9}$/,
      userForm: {
        loginName: '',
        password: '',
        remeberPwd: true,
        vcode: '', // 未注册时输入的验证码
        flag: 0 // 0前端，1后端
      },
      userRules: {
        loginName: [loginName['required'], loginName['pattern']],
        password: [password['required'], password['length'], password['pattern']],
        vcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.redirect = this.$route.query.redirect
  },
  computed: {
    // 获取验证码按钮的状态
    ifDisabled () {
      if (this.userForm.loginName !== '' && this.duration === 60) {
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
          if (this.userForm.loginName.includes('@')) {
            if (this.regEmail.test(this.userForm.loginName)) {
              await baseApi.getVcodeByEmail({
                email: this.userForm.loginName,
                html: '<a>[vcode]</a>'
              })
              this.$Notify(
                `验证码已发送到您的邮箱：${this.userForm.loginName}`,
                'top-right'
              )
              this.countDown(totalDuration)
            }
          } else {
            if (this.regMobile.test(this.userForm.loginName)) {
              await baseApi.getVcodeByMobile({
                mobile: this.userForm.loginName,
                kind: this.kind
              })
              this.$Notify(
                `验证码已发送到您的手机：${this.userForm.loginName}`,
                'top-right'
              )
              this.countDown(totalDuration)
            }
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
      this.loginTypeName = this.userForm.loginName.includes('@') ? '邮箱' : '手机'
      let info = await this.login(this.userForm, this.userForm.remeberPwd)
      // 判断是否已注册：已注册跳转，是否是第一次注册0是 1否 是第一次就发送验证码
      if (info.data.isvode === '0') {
        this.ifReg = false // 未注册
        this.$Notify(
          `验证码已发送到您的${this.loginTypeName}：${this.userForm.loginName}`,
          'top-right'
        )
        this.getCheckCode(0) // 开始倒计时
        return false
      } else {
        // 返回token,登录成功
        this.$router.push({ path: '/home/dashboard' }) // 已注册
      }
    },

    // 表单验证
    formValidate () {
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) {
          console.log('error submit!!有必填项为空')
          return
        }
        await this.submitForm()
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
