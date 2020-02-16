<template>
  <div class="login-by-vcode">
    <el-form :model="codeForm" :rules="codeRules" ref="codeForm">
      <el-form-item prop="loginName">
        <el-input placeholder="手机号" v-model="codeForm.loginName" clearable></el-input>
      </el-form-item>
      <el-form-item class="get-code-wrapper" prop="vcode">
        <el-input placeholder="输入6位短信验证码" v-model="codeForm.vcode"></el-input>
        <el-button
          type="primary"
          :disabled="ifDisabled"
          class="get-code"
          @click="getCheckCode()"
        >{{vcodeBtnName}}</el-button>
      </el-form-item>
      <el-button type="primary" class="btn-login" @click="submitForm('codeForm')">登录/注册</el-button>
    </el-form>
  </div>
</template>
<script>
import { baseApi } from '@/service'
import { mapActions } from 'vuex'
import { phone } from '@/utils/validate'
export default {
  name: 'VcodeForm',
  data() {
    return {
      kind: 'login',
      vcodeBtnName: '获取验证码', // 验证码登录获取验证码按钮名称
      redirect: '',
      timer: null, // 定时器
      duration: 60, // 倒计时长60s
      regMobile: /^1[3456789]\d{9}$/,
      codeForm: {
        loginName: '',
        vcode: '', // 验证码
        flag: 0 // 0前端，1后端
      },
      codeRules: {
        loginName: [ phone[ 'required' ], phone[ 'pattern' ] ],
        vcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6的数字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.redirect = this.$route.query.redirect
  },
  computed: {
    // 获取验证码按钮的状态
    ifDisabled() {
      if (
        this.codeForm.loginName !== '' &&
        this.codeForm.loginName.length === 11 &&
        this.duration === 60
      ) {
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

    // 获取验证码
    async getCheckCode() {
      if (this.regMobile.test(this.codeForm.loginName)) {
        try {
          const totalDuration = this.duration // 记住倒计时总时长
          await baseApi.getVcodeByMobile({
            mobile: this.codeForm.loginName,
            kind: this.kind
          })
          this.ifDisabled = true
          this.$Notify(`验证码已发送到您的手机：${this.codeForm.loginName}`, 'top-right')
          this.countDown(totalDuration)
        } catch (error) {
          console.log(error)
        }
      }
    },

    // 倒计时
    countDown(totalDuration) {
      const that = this
      this.duration = this.duration - 1
      this.vcodeBtnName = `${this.duration}s`
      if (this.duration === 0) {
        this.duration = totalDuration
        this.ifDisabled = false
        this.vcodeBtnName = `重新发送`
        return
      }
      this.timer = setTimeout(function() {
        that.countDown(totalDuration)
      }, 1000)
    },

    // 登录注册调api
    submitForm(formName) {
      const that = this
      const totalDuration = this.duration // 记住倒计时总时长
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            let info = await this.login(this.codeForm)
            console.log(info)
            if (info.data.isFrist === '0') {
              // 新用户0;已有用户1
              this.countDown(totalDuration) // 开始倒计时
              if (info.data.token) {
                that.openMsg()
              }
              return false
            } else {
              this.$router.push({ path: '/home/dashboard' })
            }
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('error submit!!有必填项为空')
        }
      })
    },
    openMsg() {
      this.$confirm('注册成功！为了保障您账号的安全，请先设置密码~', '', {
        showClose: false,
        showCancelButton: true,
        center: true,
        confirmButtonText: '确定',
        cancelButtonText: '跳过'
      })
        .then(() => {
          this.$router.push({ path: '/setpwd' }) // 新用户验证码通过，去设置密码
        })
        .catch(() => {
          this.$router.push({ path: '/home/dashboard' }) // 已注册
        })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style scoped>
.login-by-vcode .warning-dsc {
  margin: 0;
  text-align: left;
  font-size: 12px;
  color: #ccc;
}
</style>
