<template>
  <div class="setpwd-wrapper">
    <div class="setpwd-con">
      <div class="ico-logo">
        <img width="120px" src="./img/logo.png" />
      </div>
      <h2>设置密码</h2>
      <small>设置密码后，可以使用绑定的手机号+密码登录</small>
      <el-form :model="setpwdForm" :rules="setpwdRules" ref="setpwdForm" class="setpwd-form">
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="setpwdForm.password"
            auto-complete="off"
            placeholder="请设置登录密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="setpwdForm.checkPass"
            auto-complete="off"
            placeholder="请再次输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('setpwdForm')">完 成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginApi } from '@/service'
import { password } from '@/utils/validate'
import { mapActions } from 'vuex'
export default {
  data () {
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.setpwdForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else if (!this.pattern.test(value) || value.length < 8 || value.length > 16) {
        callback(new Error('密码长度8-16位，包括字母和数字（区分大小写）'))
      } else {
        callback()
      }
    }
    return {
      pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
      setpwdForm: {
        password: '',
        checkPass: ''
      },
      setpwdRules: {
        password: [password['required'], password['length'], password['pattern']],
        checkPass: [{ validator: validatePassAgain, trigger: 'blur' }]
      }
    }
  },

  methods: {
    ...mapActions(['getUserInfo']),

    // 提交
    async submitForm (formName) {
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const temp = await loginApi.setPassword({ password: this.setpwdForm.password })
          if (temp.data.successtag === 'success') {
            this.$message({
              message: '密码设置成功！',
              type: 'success'
            })
            if (this.$route.query.newuser === '0') {
              this.getUserInfo()
            }
            setTimeout((d) => {
              if (this.$route.query.newuser === '0') {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/') // 返回上一页
              } else {
                this.$router.push('/home/dashboard')
              }
            }, 2000)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.setpwd-wrapper {
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  background: url(./img/banner0.png) no-repeat;
  background-size: cover;
  .setpwd-con {
    height: 500px;
    width: 300px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    .ico-logo {
      text-align: center;
      padding-bottom: 20px;
    }
    h2 {
      text-align: center;
      color: #fff;
      font-weight: 500;
    }
    small {
      text-align: center;
      padding-bottom: 20px;
      color: #ccc;
    }
    .setpwd-form {
      text-align: center;
    }
  }
}
</style>
