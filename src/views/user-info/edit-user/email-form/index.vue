<template>
  <div class="email-form-wrapper">
    <div class="email-form-wrapper">
      <h2>绑定邮箱</h2>
      <el-form ref="emailform" :model="form" label-width="100px" :rules="rules" size="medium">
        <el-form-item prop="email" label="邮箱：">
          <el-input
            type="text"
            v-model="form.email"
            auto-complete="off"
            placeholder="请输入邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码：">
          <el-input
            type="text"
            v-model="form.code"
            auto-complete="off"
            placeholder="请输入邮箱验证码"
            clearable
          ></el-input>
          <el-button
            type="primary"
            class="get-code"
            :disabled="ifDisabled"
            @click="getVcode()"
          >{{vcodeBtnName}}</el-button>
        </el-form-item>
        <div class="btn-wrapper" v-if="!isComplete">
          <el-button type="primary" size="medium" @click="submitForm()">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { email } from '@/utils/validate'
import { baseApi, userApi } from '@/service'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EmailForm',
  data() {
    return {
      vcodeBtnName: '获取验证码',
      isComplete: false,
      duration: 60,
      timer: null,
      regEmail: /^\w+@[a-z0-9]+\.[a-z]+$/i,
      form: {
        email: '',
        code: ''
      },
      rules: {
        email: [ email['required'], email['pattern'] ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度为4的数字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initEmail()
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 获取验证码按钮的状态
    ifDisabled() {
      if (this.form.email !== '' && this.duration === 60) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    initEmail() {
      this.form.email = this.userInfo.email ? this.userInfo.email : ''
    },
    // 获取验证码
    async getVcode() {
      if (this.regEmail.test(this.form.email)) {
        const totalDuration = this.duration // 记住倒计时总时长
        try {
          await baseApi.getVcodeByEmail({ email: this.form.email, html: '<a>[vcode]</a>' })
          this.$Notify(`验证码已发送到您的邮箱：${this.form.email}`, 'top-right')
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
        this.vcodeBtnName = `重新发送`
        return
      }
      this.timer = setTimeout(function() {
        that.countDown(totalDuration)
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    // 提交
    submitForm() {
      try {
        this.$refs.emailform.validate(async (valid) => {
          if (valid) {
            await userApi.bingMobileOrPhone({
              bingName: this.form.email,
              code: this.form.code
            })
            this.$message.success('绑定成功！')
            this.isComplete = true
            setTimeout((d) => {
              this.$router.push({ path: '/user/edit' })
            }, 2000)
            this.getUserInfo()
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.email-form-wrapper .el-input {
  width: 240px;
}
</style>
<style lang='less' scoped>
.email-form-wrapper {
  .get-code {
    margin-left: 15px;
  }
  .back-wrapper {
    text-align: right;
    padding: 20px 20px 0 0;
  }
  .email-form-wrapper {
    width: 480px;
    margin: 60px auto;
    h2 {
      text-align: center;
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
