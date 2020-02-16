<template>
  <div class="change-pwd-wrapper">
    <div class="container">
      <el-alert center :title="'密码修改成功，将在' + sec + '秒后自动退出登录'" type="success" v-show="showSuccess"></el-alert>
      <el-row type="flex" justify="center">
        <el-col :span="8" style="text-align: center;">
          <i class="el-icon-lock" style="font-size:40px"></i>
        </el-col>
      </el-row>
      <br />
      <el-row type="flex" justify="center">
        <el-col :span="9">
          <el-form label-width="120px" :model="model" :rules="rules" ref="form">
            <el-form-item label="老密码:" prop="oldPwd">
              <el-input
                class="form-input"
                :type="passwordType"
                v-model="model.oldPwd"
                placeholder="请输入老密码"
                clearable
              >
                <i slot="suffix" class="el-icon-yg-eye icon el-input__icon" @click="changePwdType"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPwd">
              <el-input
                class="form-input"
                :type="newPwdType"
                v-model="model.newPwd"
                placeholder="请输入新密码"
                clearable
              >
                <i
                  slot="suffix"
                  class="el-icon-yg-eye icon el-input__icon"
                  @click="changeNewPwdType"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码:" prop="newPwdAg">
              <el-input
                class="form-input"
                :type="newPwdAgType"
                v-model="model.newPwdAg"
                placeholder="再次输入新密码"
                clearable
              >
                <i
                  slot="suffix"
                  class="el-icon-yg-eye icon el-input__icon"
                  @click="changeNewPwdAgType"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="!isComplete">
        <el-col :span="8" class="btn">
          <el-button type="primary" @click="onSave('form')">保存</el-button>
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
        cb(new Error('请输入老密码'))
      } else if (val.length < 8 || val.length > 16) {
        cb(new Error('密码长度8-16位，包括字母和数字（区分大小写）'))
      } else {
        if (this.model.newPwd !== '') {
          this.$refs.form.validateField('newPwd')
        }
        cb()
      }
    }

    let validateNewPwd = (rule, val, cb) => {
      if (val === '') {
        cb(new Error('请输入新密码'))
      } else {
        if (this.model.oldPwd) {
          if (val === this.model.oldPwd) {
            cb(new Error('新老密码不能一致'))
          }
        }
        const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
        if (!reg.test(val) || val.length < 8 || val.length > 16) {
          cb(new Error('密码长度8-16位，包括字母和数字（区分大小写）'))
        } else {
          if (this.model.newPwdAg !== '') {
            this.$refs.form.validateField('newPwdAg')
          }
          cb()
        }
      }
    }

    let validateNewPwdAg = (rule, val, cb) => {
      if (val === '') {
        cb(new Error('请再次输入新密码'))
      } else if (val !== this.model.newPwd) {
        cb(new Error('新密码不一致'))
      } else {
        cb()
      }
    }
    return {
      passwordType: 'password',
      newPwdType: 'password',
      newPwdAgType: 'password',
      isComplete: false,
      showSuccess: false,
      sec: 5,
      model: {
        oldPwd: '',
        newPwd: '',
        newPwdAg: ''
      },
      rules: {
        oldPwd: [{ validator: validatePwd, trigger: 'blur' }],
        newPwd: [{ validator: validateNewPwd, trigger: 'blur' }],
        newPwdAg: [{ validator: validateNewPwdAg, trigger: 'blur' }]
      }
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
    userId() {
      return this.userInfo.userId
    }
  },
  methods: {
    changePwdType() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text'
    },

    changeNewPwdType() {
      this.newPwdType = this.newPwdType === 'text' ? 'password' : 'text'
    },

    changeNewPwdAgType() {
      this.newPwdAgType = this.newPwdAgType === 'text' ? 'password' : 'text'
    },

    onSave(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const postData = {
            oldPwd: this.model.oldPwd,
            newPwd: this.model.newPwd,
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
                location.reload() // in order to re-instaniate vue-router
              })
            }, 5000)
          } catch (e) {
            console.log(e)
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
