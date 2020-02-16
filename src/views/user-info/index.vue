<!--个人中心模块-->
<template>
  <div class="user-home-wrapper">
    <div class="user-header-wrapper">
      <div class="user-header">
        <div class="avatar-wraper">
          <el-avatar :size="80" :src="userInfo.avatar" :key="userInfo.avatar">
            <img src="./img/head.png" />
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
        <div class="user-dir-wrapper">
          <h3 class="user-item-header">{{LoginName}}</h3>
          <!-- 研究方向 -->
          <span
            v-if="userInfo.researchDirection"
            class="user-info-detail"
          >{{userInfo.researchDirection}}</span>
        </div>
      </div>
      <div class="user-item">
        <div class="user-item-foot">
          <div class="user-info-btn"></div>
          <el-button type="primary" plain @click="editUserHandel">编辑个人资料</el-button>
        </div>
      </div>
    </div>
    <div class="user-main">
      <div class="user-tab-wrapper">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="汇交记录" name="first">
            <submission-record></submission-record>
          </el-tab-pane>
          <el-tab-pane label="发布记录" name="second">
            <release-record></release-record>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="user-side-wrapper">
        <!-- 消费 -->
        <div class="consume-wrapper">
          <h4>消费</h4>
          <ul>
            <li>
              <span>当月存储费用：666</span>
            </li>
            <li>
              <span>当月计算费用：666</span>
              <a href="#">明细</a>
            </li>
            <li>
              <span>当月终端费用：666</span>
            </li>
            <li>
              <span>账户余额：666</span>
            </li>
          </ul>
          <div class="btn-wrapper">
            <el-button type="primary">充值</el-button>
            <el-button type="primary">充值记录</el-button>
          </div>
        </div>
        <!-- 我的消息 -->
        <div class="my-msg">
          <i class="iconfont el-icon-kf-message"></i>
          我的消息
        </div>
        <!-- 设置 -->
        <div class="set-up">
          <i class="iconfont el-icon-kf-setting"></i>
          设置
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubmissionRecord from './submission-record'
import ReleaseRecord from './release-record'
import appConfig from '@/config'
import { mapGetters, mapActions } from 'vuex'
import { userApi } from '@/service'
export default {
  name: 'UserHome',
  components: {
    SubmissionRecord,
    ReleaseRecord
  },
  data() {
    return {
      activeName: 'first',
      uploadUrl: appConfig.uploadUrl
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
    LoginName() {
      if (this.userInfo.username) {
        return this.userInfo.username
      } else {
        return this.userInfo.mobile ? this.userInfo.mobile : this.userInfo.email
      }
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),

    handleClick(tab, event) {
      console.log(tab, event)
    },

    // 编辑个人资料
    editUserHandel() {
      this.$router.push('/user/edit')
    },

    // 修改用户名/头像
    async changUserNameOrImage(param) {
      try {
        await userApi.changUserNameOrImage(param)
        this.$message.success('修改成功!')
        this.getUserInfo()
        setTimeout(this.$router.push('/user/info?' + new Date()), 1000)
      } catch (error) {
        console.log('错误信息：', error)
      }
    },

    // 上传头像成功回调--自动上传
    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data.url
      this.changUserNameOrImage({ titUrl: this.imgUrl }) // 提交用户头像修改
    }
  }
}
</script>
<style lang='less' scoped>
.user-home-wrapper {
  width: 100%;
  height: calc(100vh - 120px);
  .user-header-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
    background: #fff;
    margin-bottom: 12px;
    .user-header {
      display: flex;
      .avatar-wraper {
        position: relative;
        img {
          width: 86px;
          height: 86px;
          border-radius: 50%;
        }
      }
      .user-dir-wrapper {
        display: flex;
        flex-flow: column nowrap;
        padding-left: 15px;
      }
      .modify-head {
        content: '';
        display: none;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 99%;
        height: 96%;
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
  }
  .user-main {
    display: flex;
    .user-tab-wrapper {
      width: calc(100% - 260px);
      padding: 15px 25px;
      background: #fff;
    }
  }
  .user-side-wrapper {
    margin-left: 10px;
    font-size: 14px;
    width: 250px;
    min-width: 250px;
    .consume-wrapper {
      padding: 1px 15px 20px;
      background: #fff;
      margin-bottom: 10px;
      ul {
        padding-bottom: 10px;
        li {
          padding: 5px 0;
          span {
            color: #a3a3a3;
          }
        }
        li:nth-child(2) {
          display: flex;
          justify-content: space-between;
          a {
            color: #409eff;
          }
        }
      }
    }
    .my-msg {
      padding: 15px;
      color: #a3a3a3;
      background: #fff;
      margin-bottom: 10px;
    }
    .set-up {
      padding: 15px;
      color: #a3a3a3;
      background: #fff;
    }
  }
}
</style>
