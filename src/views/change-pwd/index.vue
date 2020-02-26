<template>
  <div class="change-pwd-wrapper">
    <div class="container">
      <el-alert center :title="$t('user.changepwd.tips') + sec + 's'" type="success" v-show="showSuccess"></el-alert>
      <el-row type="flex" justify="center">
        <el-col :span="8" style="text-align: center;">
          <i class="el-icon-lock" style="font-size:40px"></i>
        </el-col>
      </el-row>
      <br />
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form label-width="260px" :model="model" :rules="rules" ref="form">
            <el-form-item :label="$t('user.changepwd.oldpwd')" prop="pwd">
              <el-input
                class="form-input"
                :type="passwordType"
                v-model="model.pwd"
                :placeholder="$t('user.changepwd.oldpwd1')"
                clearable
              >
                <i slot="suffix" class="el-icon-yg-eye icon el-input__icon" @click="changePwdType"></i>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('user.changepwd.newpwd')" prop="newpwd">
              <el-input
                class="form-input"
                :type="newpwdType"
                v-model="model.newpwd"
                :placeholder="$t('user.changepwd.newpwd1')"
                clearable
              >
                <i
                  slot="suffix"
                  class="el-icon-yg-eye icon el-input__icon"
                  @click="changeNewpwdType"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('user.changepwd.newpwd2')" prop="newpwdAg">
              <el-input
                class="form-input"
                :type="newpwdAgType"
                v-model="model.newpwdAg"
                :placeholder="$t('user.changepwd.newpwd2')"
                clearable
              >
                <i
                  slot="suffix"
                  class="el-icon-yg-eye icon el-input__icon"
                  @click="changeNewpwdAgType"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="!isComplete">
        <el-col :span="8" class="btn">
          <el-button type="primary" @click="onSave('form')">{{$t('user.changepwd.save')}}</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import md5 from 'blueimp-md5'
import { mapGetters } from 'vuex'
import { userApi } from '@/service'
export default {
  name: 'ChangePwd',

  data() {
    let validatePwd = (rule, val, cb) => {
      if (val === '') {
        cb(new Error(this.$t('user.changepwd.oldpwd1')))
      } else if (val.length < 8 || val.length > 16) {
        cb(new Error(this.$t('user.changepwd.pwdRule2')))
      } else {
        if (this.model.newpwd !== '') {
          this.$refs.form.validateField('newpwd')
        }
        cb()
      }
    }

    let validatenewpwd = (rule, val, cb) => {
      if (val === '') {
        cb(new Error(this.$t('user.changepwd.newpwd1')))
      } else {
        if (this.model.pwd) {
          if (val === this.model.pwd) {
            cb(new Error(this.$t('user.changepwd.pwdRule1')))
          }
        }
        const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
        if (!reg.test(val) || val.length < 8 || val.length > 16) {
          cb(new Error(this.$t('user.changepwd.pwdRule2')))
        } else {
          if (this.model.newpwdAg !== '') {
            this.$refs.form.validateField('newpwdAg')
          }
          cb()
        }
      }
    }

    let validatenewpwdAg = (rule, val, cb) => {
      if (val === '') {
        cb(new Error(this.$t('user.changepwd.newpwd2')))
      } else if (val !== this.model.newpwd) {
        cb(new Error(this.$t('user.changepwd.pwdRule3')))
      } else {
        cb()
      }
    }
    return {
      passwordType: 'password',
      newpwdType: 'password',
      newpwdAgType: 'password',
      isComplete: false,
      showSuccess: false,
      sec: 5,
      model: {
        pwd: '', // 旧密码
        newpwd: '', // 新密码
        newpwdAg: '' // 在此输入的新密码
      },
      rules: {
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
        newpwd: [{ validator: validatenewpwd, trigger: 'blur' }],
        newpwdAg: [{ validator: validatenewpwdAg, trigger: 'blur' }]
      }
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'language']),
    userId() {
      return this.userInfo.userId
    }
  },
  watch: {
    language() {
      this.rules = {
        pwd: [{ validator: this.validatePwd, trigger: 'blur' }],
        newpwd: [{ validator: this.validatenewpwd, trigger: 'blur' }],
        newpwdAg: [{ validator: this.validatenewpwdAg, trigger: 'blur' }]
      }
    }
  },
  methods: {
    validatenewpwd (rule, val, cb) {
      if (val === '') {
        cb(new Error(this.$t('user.changepwd.newpwd1')))
      } else {
        if (this.model.pwd) {
          if (val === this.model.pwd) {
            cb(new Error(this.$t('user.changepwd.pwdRule1')))
          }
        }
        const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
        if (!reg.test(val) || val.length < 8 || val.length > 16) {
          cb(new Error(this.$t('user.changepwd.pwdRule2')))
        } else {
          if (this.model.newpwdAg !== '') {
            this.$refs.form.validateField('newpwdAg')
          }
          cb()
        }
      }
    },

    validatenewpwdAg(rule, val, cb) {
      if (val === '') {
        cb(new Error(this.$t('user.changepwd.newpwd2')))
      } else if (val !== this.model.newpwd) {
        cb(new Error(this.$t('user.changepwd.pwdRule3')))
      } else {
        cb()
      }
    },
    changePwdType() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text'
    },

    changeNewpwdType() {
      this.newpwdType = this.newpwdType === 'text' ? 'password' : 'text'
    },

    changeNewpwdAgType() {
      this.newpwdAgType = this.newpwdAgType === 'text' ? 'password' : 'text'
    },

    onSave(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const postData = {
            pwd: this.model.pwd,
            newpwd: this.model.newpwd,
            userId: this.userId
          }
          try {
            await userApi.changePwd(postData)
            this.showSuccess = true
            this.isComplete = true
            setInterval(() => {
              this.sec = this.sec - 1 >= 0 ? this.sec - 1 : 0
            }, 1000)
            setTimeout(() => {
              this.$store.dispatch('logOut').then(() => {
                this.$router.push('/login')
              })
            }, 5000)
          } catch (e) {
            console.log(e)
            this.$message.error(e)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.change-pwd-wrapper {
  .container {
    margin-top: 50px;
    .info {
      margin: 30px 0;
      .el-alert {
        padding: 8px;
        .el-alert__content {
          padding: 0;
        }
      }
      .alert {
        line-height: 16px;
        padding-inline-start: 10px;
        li {
          margin-bottom: 5px;
        }
      }
    }
    .btn {
      margin-top: 30px;
      text-align: center;
    }
    .icon {
      cursor: pointer;
    }
  }
}
</style>
