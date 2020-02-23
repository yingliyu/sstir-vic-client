<!--编辑用户资料信息-->
<template>
  <div class="edit-user-wrap">
    <ul>
      <li class="profess" v-if="userInfo.isReal!=='0'">
        <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
        <!-- 设置昵称 -->
        <div class="set-nickname" v-if="!userInfo.nickname">
          <span class="icon-wrapper">
            <i class="iconfont el-icon-kf-wrong"></i>
            未设置 &nbsp;&nbsp;|
          </span>
          <el-button type="primary" round plain @click="showName = !showName">设置</el-button>
        </div>
        <!-- 修改昵称 -->
        <div class="modify-nickname" v-else>
          <span class="has-set-wrapper">{{userInfo.nickname}}</span>
          <el-button type="primary" round plain @click="showName = !showName">修改</el-button>
        </div>
      </li>
      <li class="modify-uname-form" v-if="showName">
        <transition name="slide-fade">
          <el-form
            label-width="90px"
            :model="nicknameForm"
            :rules="nicknameRules"
            ref="nicknameForm"
          >
            <el-form-item prop="nickname">
              <el-input
                v-model="nicknameForm.nickname"
                required
                maxlength="20"
                placeholder="请输入你的昵称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="showName=!showName">取消</el-button>
              <el-button type="primary" @click="submitNickname">保 存</el-button>
            </el-form-item>
          </el-form>
        </transition>
      </li>
      <li class="realname">
        <span>真实姓名：</span>
        <span>{{userInfo.realName}}</span>
      </li>
      <li class="workin" v-if="userInfo.isReal!=='0'">
        <span>机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;构：</span>
        <div class="workin-wrapper" v-if="userInfo.orgName">
          <span>{{userInfo.orgName}}</span>
        </div>
      </li>

      <li class="email">
        <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
        <div class="modify-email">
          <span class="has-set-wrapper">{{userInfo.email}}</span>
        </div>
      </li>

      <li class="loginpwd">
        <span>登录密码：</span>
        <div class="set-pwd">
          <span class="icon-wrapper">
            <i class="iconfont el-icon-kf-right"></i>
            已设置 &nbsp;&nbsp;|
          </span>
          <router-link to="/user/changepwd">
            <el-button type="primary" round plain>修改</el-button>
          </router-link>
        </div>
      </li>
    </ul>
    <div class="user-agree">
      <a @click="agreementVisible=true">用户协议</a>
      <a @click="policyVisible=true">隐私政策</a>
    </div>
    <!-- 隐私政策 -->
    <el-dialog title :visible.sync="policyVisible" width="60%" :before-close="handleClose">
      <user-doc :list="policyList" :imgW="imgW" :titleAlign="titleAlign"></user-doc>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="policyVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 用户协议 -->
    <el-dialog title :visible.sync="agreementVisible" width="60%" :before-close="handleClose">
      <user-doc :list="agreementList" :imgW="imgW" :titleAlign="titleAlign"></user-doc>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreementVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { userApi } from '@/service'
import { mapGetters, mapActions } from 'vuex'
import appConfig from '@/config'
import UserDoc from '@/components/user-doc'
import policyData from './policy-data'
import agreementData from './user-agree'

export default {
  name: 'EditUser',
  data () {
    return {
      policyList: policyData,
      agreementList: agreementData,
      titleAlign: 'center',
      imgW: '70%',
      uploadUrl: appConfig.uploadUrl,
      showName: false, // 用户名编辑按钮显示
      policyVisible: false,
      agreementVisible: false,
      nicknameForm: {
        // nickname: this.userInfo.nickname
        nickname: ''
      },
      nicknameRules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    UserDoc
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
    imageUrl () {
      return this.userInfo.avatar ? this.userInfo.avatar : this.errorLoadImg
    }
  },
  mounted () {
    console.log(this.userInfo)
  },
  methods: {
    ...mapActions(['getUserInfo']),
    handleClose (done) {
      done()
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    },
    toUserAgree () {
      this.$router.push('/user/agreement')
    },

    toPolicy () {
      this.$router.push('/user/policy')
    },
    showModifyUnameForm () {
      this.showName = true
    },

    // 提交用户昵称修改
    submitNickname () {
      this.$refs.nicknameForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await userApi.setNickname(this.nicknameForm)
            this.showName = false
            this.getUserInfo()
            console.log(res)
          } catch (error) {
            console.log(error)
            this.$message.error(error)
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.edit-user-wrap {
  max-width: 100%;
  height: calc(100vh - 150px);
  background: #fff;
  margin: 15px;
  padding: 30px;
  font-size: 14px;
  position: relative;
  .back-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .user-head {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    .head-wrapper {
      width: 80px;
      height: 80px;
      position: relative;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .modify-head {
        content: '';
        display: none;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 99%;
        height: 98%;
        position: absolute;
        left: 0;
        top: 0px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        p {
          margin: 0;
          padding-top: 5px;
          font-size: 12px;
        }
      }
      &:hover {
        .modify-head {
          display: flex;
        }
      }
    }
    .nickname {
      padding: 0 20px;
      font-size: 20px;
      font-weight: 600;
    }
    .nickname-wrapper {
      &:hover {
        .modify-item {
          display: inline-block;
        }
      }
    }
    .modify-uname-form {
      padding-top: 18px;
      box-sizing: border-box;
    }
  }
  .modify-item {
    color: #999;
    display: none;
    cursor: pointer;
    i {
      font-size: 14px;
    }
  }
  ul {
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 15px 0;
      span:first-child {
        width: 90px;
        text-align: right;
        padding-right: 12px;
        box-sizing: border-box;
      }
      span:nth-child(2) {
        padding-right: 15px;
      }
      .realnameTxt {
        padding: 7px 15px;
        color: #409eff;
        background: #ecf5ff;
        border: 1px solid #b3d8ff;
        border-radius: 20px;
        font-size: 12px;
      }
      .icon-wrapper {
        color: #ccc;
        i {
          font-size: 22px;
          vertical-align: middle;
        }
      }
      .workin-wrapper,
      .profess-wrapper {
        &:hover {
          .modify-item {
            display: inline-block;
          }
        }
      }
    }
  }
  .user-agree {
    position: absolute;
    bottom: 40px;
    a {
      color: #409eff;
      text-decoration: underline;
      padding-right: 20px;
    }
  }
}
</style>
