<template>
  <div class="login-by-user">
    <el-form :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="userName">
        <el-input :placeholder="$t('base.email')" v-model="userForm.userName" clearable></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" :placeholder="$t('base.pwd')" v-model="userForm.pwd" clearable></el-input>
      </el-form-item>
      <el-form-item class="checkbox-wrapper">
        <el-row>
          <el-col :span="12">
            <el-checkbox :label="$t('base.autoLogin')" v-model="userForm.remeberPwd" name="type"></el-checkbox>
          </el-col>
          <el-col :span="12">
            <router-link to="/reg" target="_blank">
              <!-- <span>没有账户，去注册</span> -->
              <span>{{$t('base.btnReg')}}</span>
            </router-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-button type="primary" class="btn-login" @click="submitForm">{{$t('base.btnLogin')}}</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserForm',
  data () {
    return {
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
        userName: [ {
          required: true,
          message: this.$t('reg.emailTip'),
          trigger: 'blur'
        },
        {
          type: 'email',
          // pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/i,
          message: this.$t('reg.emailTip'),
          trigger: ['blur']
        }],
        pwd: [{
          required: true,
          message: this.$t('reg.repwd'),
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
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['language']),
    vcodeBtnName() {
      return this.language === 'en' ? 'Get verification code' : '获取验证码'
    }
  },
  mounted () {
    this.redirect = this.$route.query.redirect
  },

  methods: {
    ...mapActions({
      login: 'logIn'
    }),

    // 登录注册调api
    async submitForm () {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          try {
            await this.login({ ...this.userForm })
            this.$router.push({ path: this.redirect || '/home/dashboard' })
          } catch (error) {
            console.log(error)
            this.$message.error(error)
          }
        } else {
          console.log('error submit!!有必填项为空')
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    language(val) {
      this.userRules = {
        userName: [ {
          required: true,
          message: this.$t('reg.emailTip'),
          trigger: 'blur'
        },
        {
          type: 'email',
          // pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/i,
          message: this.$t('reg.emailTip'),
          trigger: ['blur']
        }],
        pwd: [{
          required: true,
          message: this.$t('reg.repwd'),
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
        }]
      }
    }
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
