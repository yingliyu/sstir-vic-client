<template>
  <div class="reg-wrapper">
    <el-form v-if="formIndex===0" :model="codeForm" :rules="codeRules" ref="codeForm">
      <el-form-item prop="email">
        <el-input :placeholder="$t('base.email')" v-model="codeForm.email" clearable></el-input>
      </el-form-item>
      <el-form-item class="get-code-wrapper" prop="vcode">
        <el-input :placeholder="$t('reg.vcode')" v-model="codeForm.vcode"></el-input>
        <el-button
          type="primary"
          :disabled="ifDisabled"
          class="get-code"
          @click="getCheckCode()"
        >{{vcodeBtnName}}</el-button>
      </el-form-item>
      <el-form-item>
        <div class="user-pact">
          {{$t('reg.regAgree')}}
          <span @click="toUserAgreement(true)">{{$t('reg.agreement')}}</span>
        </div>
      </el-form-item>
      <el-button type="primary" class="btn-reg" @click="nextStep('codeForm')">{{$t('reg.nextStep')}}</el-button>
    </el-form>
    <!-- 添加用户信息表单 -->
    <el-form v-else :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="pwd">
        <el-input
          type="password"
          v-model="userForm.pwd"
          auto-complete="off"
          :placeholder="$t('reg.pwd')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="newpwd">
        <el-input
          type="password"
          v-model="userForm.newpwd"
          auto-complete="off"
          :placeholder="$t('reg.repwd')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="realName">
        <el-input :placeholder="$t('reg.realName')" v-model="userForm.realName" clearable></el-input>
      </el-form-item>
      <el-form-item prop="orgName">
        <el-input :placeholder="$t('reg.orgName')" v-model="userForm.orgName" clearable></el-input>
      </el-form-item>
      <el-button type="primary" class="btn-reg" @click="submitForm('userForm')">{{$t('base.btnReg')}}</el-button>
    </el-form>
  </div>
</template>
<script>
import { loginApi } from '@/service'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'VcodeForm',
  data () {
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('reg.repwd')))
      } else if (value !== this.userForm.pwd) {
        callback(new Error(this.$t('reg.pwdTip2')))
      } else if (!this.pattern.test(value) || value.length < 8 || value.length > 16) {
        callback(new Error(this.$t('reg.pwdTip1')))
      } else {
        callback()
      }
    }
    return {
      kind: 'login',
      formIndex: 0, // 当前展示第几步
      redirect: '',
      timer: null, // 定时器
      duration: 60, // 倒计时长60s
      pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
      vcodeBtnName: this.$t('reg.getVcode'),
      formTitle: this.$t('reg.regTitle1'),
      codeForm: {
        email: '', // 登录名-邮箱
        vcode: '' // 验证码
      },
      codeRules: {
        email: [
          {
            required: true,
            message: this.$t('reg.emailTip'),
            trigger: 'blur'
          },
          {
            type: 'email',
            // pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/i,
            message: this.$t('reg.emailTip'),
            trigger: ['blur']
          }
        ],
        vcode: [
          { required: true, message: this.$t('reg.vcodeTip1'), trigger: 'blur' },
          { min: 6, max: 6, message: this.$t('reg.vcodeTip2'), trigger: 'blur' }
        ]
      },
      userForm: {
        pwd: '', // 密码
        newpwd: '', // 再次输入密码
        realName: '', // 真实姓名
        orgName: '' // 工作机构
      },
      userRules: {
        pwd: [
          {
            required: true,
            message: this.$t('reg.pwd'),
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: this.$t('reg.pwdTip1'),
            trigger: ['blur']
          },
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
            message: this.$t('reg.pwdTip1')
          }
        ],
        newpwd: [{ validator: validatePassAgain, trigger: 'blur' }],
        realName: [{ required: true, message: this.$t('reg.realName'), trigger: 'blur' }],
        orgName: [{ required: true, message: this.$t('reg.orgName'), trigger: 'blur' }]
      }
    }
  },

  mounted () {
    this.redirect = this.$route.query.redirect
  },
  computed: {
    ...mapGetters(['language']),

    // 获取验证码按钮的状态
    ifDisabled: {
      get() {
        if (
          this.codeForm.email !== '' &&
          this.duration === 60
        ) {
          return false
        } else {
          return true
        }
      },
      set(val) {}
    }
  },
  watch: {
    language(val) {
      this.codeRules = {
        email: [
          {
            required: true,
            message: this.$t('reg.emailTip'),
            trigger: 'blur'
          },
          {
            type: 'email',
            // pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/i,
            message: this.$t('reg.emailTip'),
            trigger: ['blur']
          }
        ],
        vcode: [
          { required: true, message: this.$t('reg.vcodeTip1'), trigger: 'blur' },
          { min: 6, max: 6, message: this.$t('reg.vcodeTip2'), trigger: 'blur' }
        ]
      }
      this.userRules = {
        pwd: [
          {
            required: true,
            message: this.$t('reg.pwd'),
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: this.$t('reg.pwdTip1'),
            trigger: ['blur']
          },
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
            message: this.$t('reg.pwdTip1')
          }
        ],
        newpwd: [{ validator: this.validatePassAgain, trigger: 'blur' }],
        realName: [{ required: true, message: this.$t('reg.realName'), trigger: 'blur' }],
        orgName: [{ required: true, message: this.$t('reg.orgName'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'logIn'
    }),
    validatePassAgain  (rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('reg.repwd')))
      } else if (value !== this.userForm.pwd) {
        callback(new Error(this.$t('reg.pwdTip2')))
      } else if (!this.pattern.test(value) || value.length < 8 || value.length > 16) {
        callback(new Error(this.$t('reg.pwdTip1')))
      } else {
        callback()
      }
    },
    toUserAgreement (val) {
      this.$emit('showUserAgreement', val)
    },
    nextStep (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await loginApi.checkCode(this.codeForm) // 验证验证码是否正确
            this.formIndex = 1
            this.formTitle = this.$t('reg.regTitle2')
            this.$emit('update', this.formTitle)
          } catch (error) {
            this.$message.error(error)
          }
        }
      })
    },
    // 获取邮箱验证码
    async getCheckCode () {
      try {
        const totalDuration = this.duration // 记住倒计时总时长
        await loginApi.emailActive({
          email: this.codeForm.email
        })
        this.ifDisabled = true

        this.$notify({
          title: this.language === 'en' ? 'Tips' : '提示',
          message: this.language === 'en' ? `The verification code has been sent to your mailbox: ${this.codeForm.email}` : `验证码已发送到您的邮箱：${this.codeForm.email}`,
          position: 'top-right'
        })
        this.countDown(totalDuration)
      } catch (error) {
        this.$message.error(error)
      }
    },

    // 倒计时
    countDown (totalDuration) {
      const that = this
      this.duration = this.duration - 1
      this.vcodeBtnName = `${this.duration}s`
      if (this.duration === 0) {
        this.duration = totalDuration
        this.ifDisabled = false
        this.vcodeBtnName = this.language === 'en' ? 'Resend' : '重新发送'
        return
      }
      this.timer = setTimeout(function () {
        that.countDown(totalDuration)
      }, 1000)
    },

    // 注册调api
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid)
        if (valid) {
          try {
            const params = {
              ...this.codeForm,
              ...this.userForm
            }
            await loginApi.regByEmail(params)
            this.$message({
              message: this.language === 'en' ? 'Congratulations on your successful registration and will be jumping to login' : '恭喜你注册成功,即将跳转至登录',
              type: 'success',
              duration: 2000
            })
            setTimeout(this.$router.push({ path: '/login' }), 3000)
          } catch (e) {
            this.$message.error(e)
          }
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
.reg-wrapper {
  .get-code-wrapper{
   /deep/ .get-code{
      font-size: 12px;
    }
  }
  .btn-reg {
    font-size: 16px;
  }
  .user-pact {
    text-align: left;
    span {
      color: #409eff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
