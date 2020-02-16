<template>
  <div class="phone-form-wrapper">
    <div class="phone-form-wrapper">
      <h2>绑定手机</h2>
      <el-form ref="mobileform" :model="form" label-width="100px" :rules="rules" size="medium">
        <el-form-item prop="bingName" label="手机：">
          <el-input
            type="phone"
            v-model="form.bingName"
            auto-complete="off"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码：">
          <el-input
            type="text"
            v-model="form.code"
            auto-complete="off"
            placeholder="请输入短信验证码"
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
import { baseApi, userApi } from '@/service'
import { phone } from '@/utils/validate'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'phoneForm',
  data() {
    return {
      vcodeBtnName: '获取验证码',
      isComplete: false,
      duration: 60,
      timer: null,
      kind: 'bing',
      regMobile: /^1[3456789]\d{9}$/,
      form: {
        bingName: '',
        code: ''
      },
      rules: {
        bingName: [phone['required'], phone['pattern']],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6的数字', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initMobile()
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 获取验证码按钮的状态
    ifDisabled() {
      if (this.form.bingName !== '' && this.form.bingName.length === 11 && this.duration === 60) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),

    initMobile () {
      this.form.bingName = this.userInfo.mobile ? this.userInfo.mobile : ''
    },
    // 获取验证码
    async getVcode() {
      if (this.regMobile.test(this.form.bingName)) {
        try {
          const totalDuration = this.duration // 记住倒计时总时长
          await baseApi.getVcodeByMobile({ mobile: this.form.bingName, kind: this.kind })
          this.$Notify(`验证码已发送到您的手机：${this.form.bingName}`, 'top-right')
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
    async submitForm () {
      try {
        await this.$refs.mobileform.validate(async (valid) => {
          if (valid) {
            const res = await userApi.bingMobileOrPhone(this.form)
            if (res.data.successtag === 'success') {
              this.$message.success('绑定成功！')
              this.isComplete = true
              this.getUserInfo()
              setTimeout(d => {
                this.$router.push({ path: '/user/edit?' + new Date() })
              }, 2000)
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style>
.phone-form-wrapper .el-input {
  width: 240px;
}
</style>
<style lang='less' scoped>
.phone-form-wrapper {
  .back-wrapper {
    text-align: right;
    padding: 20px 20px 0 0;
  }
  .get-code {
    margin-left: 15px;
  }
  .phone-form-wrapper {
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
