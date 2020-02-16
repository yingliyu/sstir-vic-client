<!--编辑用户资料信息-->
<template>
  <div class="edit-user-wrap">
    <!-- <div class="back-wrapper">
      <router-link to="/user/info">
        <el-button type="primary">返回个人中心</el-button>
      </router-link>
    </div>-->
    <!-- <div class="user-head">
      <div class="head-wrapper">
        <el-avatar :size="80" :src="imageUrl" @error="handleLoadError" :key="imageUrl">
          <img src="../img/head.png" />
        </el-avatar>
        <div class="modify-head">
          <el-upload
            class="avatar-uploader"
            :headers="{access_token: token}"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :limit="1"
          >
            <i class="iconfont el-icon-kf-photo"></i>
            <p>修改头像</p>
          </el-upload>
        </div>
      </div>
      <div class="nickname-wrapper" v-if="showName">
        <span class="nickname">{{userInfo.username}}</span>
        <span class="modify-name modify-item" @click="showModifyUnameForm()">
          <i class="iconfont el-icon-kf-pencil2"></i>修改
        </span>
      </div>
    </div>-->
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
          <el-form label-width="90px">
            <el-form-item>
              <el-input
                v-model="userInfo.username"
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
        <!-- 设置邮箱 -->
        <div class="set-email" v-if="!userInfo.email">
          <span class="icon-wrapper">
            <i class="iconfont el-icon-kf-wrong"></i>
            未设置 &nbsp;&nbsp;|
          </span>
          <router-link to="/user/bindemail">
            <el-button type="primary" round plain>设置</el-button>
          </router-link>
        </div>
        <!-- 修改邮箱 -->
        <div class="modify-email" v-else>
          <span class="has-set-wrapper">{{userInfo.email}}</span>
          <router-link to="/user/bindemail">
            <el-button type="primary" round plain>修改</el-button>
          </router-link>
        </div>
      </li>

      <li class="loginpwd">
        <span>登录密码：</span>
        <div class="set-pwd" v-if="userInfo.pwd">
          <span class="icon-wrapper">
            <i class="iconfont el-icon-kf-right"></i>
            已设置 &nbsp;&nbsp;|
          </span>
          <router-link to="/user/changepwd">
            <el-button type="primary" round plain>修改</el-button>
          </router-link>
        </div>
        <div class="modify-pwd" v-else>
          <span class="icon-wrapper">
            <i class="iconfont el-icon-kf-wrong"></i>
            未设置 &nbsp;&nbsp;|
          </span>
          <router-link to="/setpwd?newuser=0">
            <el-button type="primary" round plain>设置</el-button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { userApi } from '@/service'
import { mapGetters, mapActions } from 'vuex'
import appConfig from '@/config'
export default {
  name: 'EditUser',
  data () {
    return {
      uploadUrl: appConfig.uploadUrl,
      showName: false // 用户名编辑按钮显示
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
    imageUrl () {
      return this.userInfo.avatar ? this.userInfo.avatar : this.errorLoadImg
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),

    showModifyUnameForm () {
      this.showName = true
    },

    // 提交用户昵称修改
    async submitNickname () {
      try {
        const res = await userApi.setNickname({ nickname: this.userInfo.username })
        this.showName = false
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.edit-user-wrap {
  max-width: 100%;
  height: 100%;
  background: #fff;
  margin: 15px;
  padding: 30px;
  font-size: 14px;
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
}
</style>
