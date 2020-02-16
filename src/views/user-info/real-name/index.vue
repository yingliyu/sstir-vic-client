<template>
  <div class="realname-wrapper">
    <div class="realname-steps-wrapper">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="个人信息"></el-step>
        <el-step title="信息补充"></el-step>
      </el-steps>
    </div>
    <div class="steps-content">
      <div class="realname-first-wrapper" v-show="active===0">
        <el-form
          ref="realBaseForm"
          :rules="realBaseRules"
          :model="realBaseForm"
          label-width="0px"
          style="width: 100%"
        >
          <el-form-item prop="realName">
            <el-input v-model="realBaseForm.realName" placeholder="请输入真实姓名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="idCard">
            <el-input v-model="realBaseForm.idCard" placeholder="请输入身份证号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="realBaseForm.phone" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <div class="flex_col_center">
              <el-input
                v-model="realBaseForm.vcode"
                placeholder="输入短信验证码"
                style="width: 200px; margin-right: 10px"
              ></el-input>
              <el-button
                type="primary"
                :disabled="ifDisabled"
                class="vcode_btn"
                @click="getVcode"
              >{{vcodeBtnName}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="realname-last-wrapper" v-show="active>0">
        <el-form
          ref="realSupForm"
          :rules="realSupRules"
          :model="realSupForm"
          label-width="0px"
          style="width: 100%"
        >
          <el-form-item prop="deptId">
            <el-select v-model="realSupForm.deptId" placeholder="请选择工作单位">
              <el-option
                v-for="item in deptnameOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="title">
            <el-select v-model="realSupForm.title" placeholder="请选择职称">
              <el-option
                v-for="item in titleOptions"
                :key="item.key"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="researchDirection">
            <el-input v-model="realSupForm.researchDirection" placeholder="请输入研究方向" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="steps-action">
      <!-- <el-button v-if="active > 0" class="prev" @click="prev">上一步</el-button> -->
      <el-button v-if="active===0" class="next" type="primary" @click="next">前去认证</el-button>
      <el-button v-if="active>0" class="next" type="primary" @click="completeReal">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { baseApi, userApi } from '@/service'
import { idcard, userName, phone } from '@/utils/validate'
export default {
  name: 'RealName',

  data() {
    return {
      active: 0,
      vcodeBtnName: '获取验证码',
      duration: 60,
      timer: null,
      deptnameOptions: [],
      titleOptions: [],
      regMobile: /^1[3456789]\d{9}$/,
      realBaseForm: {
        realName: '',
        idCard: '',
        phone: '',
        vcode: ''
      },
      realBaseRules: {
        realName: [userName['required']],
        idCard: [idcard['required'], idcard['pattern']],
        phone: [phone['required'], phone['pattern']],
        vcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6的数字', trigger: 'blur' }
        ]
      },
      realSupForm: {
        deptId: '', // 工作单位
        title: '', // 职称
        researchDirection: '' // 研究方向
      },
      realSupRules: {
        deptId: [
          {
            required: true,
            message: '请选择单位',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请选职称',
            trigger: 'blur'
          }
        ],
        researchDirection: [
          {
            required: true,
            message: '请输入研究方向',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
    userId() {
      return this.userInfo.userId
    },
    // 获取验证码按钮的状态
    ifDisabled() {
      if (
        this.realBaseForm.phone !== '' &&
        this.realBaseForm.phone.length === 11 &&
        this.duration === 60
      ) {
        return false
      } else {
        return true
      }
    },
    deptName() {
      let val = ''
      this.deptnameOptions.forEach((item) => {
        if (item.key === this.realSupForm.deptId) {
          val = item.value
        }
      })
      return val
    }
  },

  async mounted() {
    if (this.userInfo && this.userInfo.isReal === '1') {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/') // 返回上一页
    }
    this.deptnameOptions = await this.getData('dept_name')
    this.titleOptions = await this.getData('title')
  },

  methods: {
    ...mapActions(['getUserInfo']),
    // 获取下拉框数据
    async getData(type) {
      try {
        try {
          const res = await baseApi.userconfigWork(type)
          return res.data
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log('error:', error)
      }
    },
    // 下一步
    async next() {
      try {
        await this.$refs.realBaseForm.validate((valid) => {
          if (valid) {
            this.submitRealFirstHandle()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 上一步
    prev() {
      if (this.active-- <= 0) this.active = 0
    },

    // 获取验证码
    async getVcode() {
      if (this.regMobile.test(this.realBaseForm.phone)) {
        try {
          const totalDuration = this.duration // 记住倒计时总时长
          await baseApi.getVcodeByMobile({ mobile: this.realBaseForm.phone, kind: 'auth' })
          this.$Notify(`验证码已发送到您的手机：${this.realBaseForm.phone}`, 'top-right')
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

    async submitRealFirstHandle() {
      try {
        await userApi.authentication({ ...this.realBaseForm, userId: this.userId })
        this.active = 1
        this.getUserInfo()
      } catch (error) {
        console.log(error)
      }
    },

    // 实名完成提交
    async completeReal() {
      try {
        await this.$refs.realSupForm.validate(async (valid) => {
          await userApi.updateUser({
            ...this.realSupForm,
            userId: this.userId,
            deptName: this.deptName
          })
          this.active = 2
          this.getUserInfo()
          setTimeout((d) => {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/') // 返回上一页
          }, 1000)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.realname-wrapper {
  padding: 30px 20px;
  margin: 15px;
  background: #fff;
  height: calc(100vh - 120px);
  .realname-steps-wrapper {
    max-width: 650px;
    margin: 0 auto;
  }
  .steps-content {
    display: flex;
    justify-content: center;
    padding: 30px 0;
  }
  .steps-action {
    display: flex;
    justify-content: center;
  }
  .realname-first-step {
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    height: 100%;
    .vcode_btn {
      margin-left: 10px;
    }
  }
}
</style>
