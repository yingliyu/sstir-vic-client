<template>
  <!-- 汇交项目列表 -->
  <div class="submission-list-wrapper">
    <!-- 未实名 -->
    <div class="not-real-wrapper" v-cloak v-if="showRealname">
      <!-- <transition name="fade-transform" mode="out-in"> -->
      <i class="iconfont el-icon-kf-gantanhao"></i>
      <span class="my-txt">使用数据交汇功能请先实名认证</span>
      <router-link to="/user/realname">
        <el-button size="medium" type="primary">前往实名认证</el-button>
      </router-link>
      <!-- </transition> -->
    </div>
    <!-- <div class="backbtn-wrapper" v-cloak v-if="!showRealname">
      <el-button type="primary" plain @click="active--">返回</el-button>
    </div>-->
    <!-- 1.汇交流程 -->
    <div class="submission-flow-wrapper" v-cloak v-if="showFlowOne">
      <h2>汇交流程图</h2>
      <div class="step-wrapper">
        <p>对于任意项目，请按照以下步骤进行汇交：</p>
        <div class="step-inner">
          <el-steps direction="vertical">
            <el-step title="项目信息"></el-step>
            <el-step title="选择数据" description="上传需要汇交的数据，超过30M的文件请使用专门软件<下载链接>传至该项目目录下"></el-step>
            <el-step title="补充信息">
              <template slot="description">
                参考
                <a class="exmpleDoc" :href="dataIntroDocUrl" download="数据说明文档">示例文档</a> 对本次汇交的数据进行说明；上传该项目的结题报告；填写发表论文情况
              </template>
            </el-step>
            <el-step title="最终确认"></el-step>
            <el-step title="等待审核"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="start-submission-btn">
        <el-button size="medium" type="primary" @click="active=1">开始汇交</el-button>
      </div>
    </div>
    <!-- 2.汇交项目确认 -->
    <div class="subission-con" v-cloak v-if="showFlowTwo">
      <h4>尊敬的{{userInfo.realName}}[{{userInfo.title}}]：</h4>
      <h4>系统检测到您名下出现以下新项目，请选中属于您的项目，点击“确认”进入汇交入口！</h4>
      <el-table ref="tblList" :data="list" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="项目名称" prop="projectName" align="center" fixed show-overflow-tooltip/>
        <el-table-column label="资金来源" prop="fundsSources" align="center" />
        <el-table-column label="基金项目" prop="fundsProject" align="center" />
        <el-table-column label="编号" prop="no" align="center" />
        <el-table-column label="项目结题时间" align="center" prop="completeTime" width="150px" />
      </el-table>
      <div class="sublist-btn-wrapper">
        <el-button size="medium" type="primary" @click="openDia()">确认</el-button>
      </div>
    </div>
    <!-- 3.汇交入口/清单 -->
    <div class="submission-entry-wrapper" v-cloak v-if="showSubmissionEntry">
      <p>尊敬的{{userInfo.realName}}[{{userInfo.title}}]，请您分别汇交以下项目的数据：</p>
      <el-table :data="claimList" style="width: 100%" border>
        <el-table-column label="操作" align="center" width="100px" fixed>
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus===0">
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </span>
            <span v-else-if="scope.row.checkStatus===2" style="color: green">
              <!-- 审核通过 -->
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
            </span>
            <span v-else-if="scope.row.checkStatus===3" style="color: red">
              <!-- 未通过 -->
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" prop="projectName" align="center" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.$index, scope.row)">{{scope.row.projectName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="资金来源" width="120px" prop="fundsSources" align="center" />
        <el-table-column label="基金项目" prop="fundsProject" align="center" />
        <el-table-column label="编号" prop="no" align="center" />
        <el-table-column label="项目结题时间" align="center" prop="completeTime" width="150px" />
        <el-table-column label="提交审核" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.checkStatus===0? '否':'是' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核结果" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus===0"></span>
            <span v-else-if="scope.row.checkStatus===2" style="color: green">
              <i class="iconfont el-icon-kf-ai53" style="font-size:16px;"></i>审核通过
            </span>
            <span v-else-if="scope.row.checkStatus===1" style="color: orange">
              <i class="iconfont el-icon-kf-jinhangzhong" style="font-size:14px;"></i> 审核中
            </span>
            <span v-else-if="scope.row.checkStatus===3" style="color: red">
              <i class="iconfont el-icon-kf-jujuehuanhuo" style="font-size:16px;"></i> 未通过
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </div>
      <!-- <br />
      <br />
      <ul class="tips-wrapper">
        <li>友情提示：</li>
        <li>在审核过程中，您无法修改提交的内容，但可以点击“查看”看到所提交的内容！</li>
        <li>审核通过后，您可以修改提交的内容，系统会以版本的形式记录您的改动！</li>
      </ul> -->
    </div>
    <!-- 项目确认提示框 -->
    <el-dialog title="项目确认" :visible.sync="showConfirm" width="750px" :before-close="closeConfirm">
      <div class="final-dialog-wrapper">
        <p>您有以下项目未选取，请确认：</p>
        <div class="submission-confirm-wrapper">
          <el-table :data="confirmList" style="width: 100%" max-height="350px">
            <el-table-column label="项目名称" prop="projectName" align="center" fixed show-overflow-tooltip/>
            <el-table-column label="资金来源" prop="fundsSources" align="center" />
            <el-table-column label="基金项目" prop="fundsProject" align="center" />
            <el-table-column label="编号" prop="no" align="center" />
            <el-table-column label="项目结题时间" align="center" prop="completeTime" width="150px" />
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirm" size="medium">重新选择</el-button>
        <el-button type="primary" @click="claimProject()" size="medium">不是我的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { submissionApi, baseApi } from '@/service'
import { mapGetters } from 'vuex'
export default {
  name: 'SubmissionList',

  data() {
    return {
      active: 0,
      current: 1,
      size: 10,
      total: 0,
      pages: '',
      showConfirm: false, // 确认弹框
      list: false, // 全部待认领未认领项目
      claimList: [], // 已认领项目
      confirmList: [], // 待确认项目
      dataIntroDocUrl: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),

    showRealname() {
      if (this.userInfo.isReal === '1') {
        return false
      } else {
        return true
      }
    },

    showFlowOne() {
      if (
        this.userInfo.isReal === '1' &&
        this.active === 0 &&
        this.list &&
        this.list.length !== 0
      ) {
        return true
      } else {
        return false
      }
    },

    showFlowTwo() {
      if (
        this.userInfo.isReal === '1' &&
        this.active === 1 &&
        this.list &&
        this.list.length !== 0
      ) {
        return true
      } else {
        return false
      }
    },

    // 显示汇交入口
    showSubmissionEntry() {
      if (this.userInfo.isReal === '1' && this.active === 2 && this.claimList) {
        return true
      } else {
        return false
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getNewSubmissionData()
      this.getClaimSubmissionData()
      this.downloadFile()
    })
  },

  methods: {
    // 获取未/待认领的项目
    async getNewSubmissionData() {
      try {
        const res = await submissionApi.getNewSubmissionList({
          current: this.current,
          size: this.size,
          sort: '',
          order: ''
        })
        this.list = res.data.records
        if (!this.list.length) {
          this.active = 2
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 查询已认领的汇交项目
    async getClaimSubmissionData() {
      try {
        const res = await submissionApi.getClaimSubmissionList({
          current: this.current,
          size: this.size,
          sort: '',
          order: ''
        })
        this.claimList = res.data.records
        this.current = res.data.current
        this.size = res.data.size
        this.total = res.data.total
        this.pages = res.data.pages
      } catch (error) {
        console.log(error)
      }
    },

    modifyId(param) {
      this.$router.params.id = param
    },

    openDia(index, row) {
      // 对比所有list和selected list筛选出未选中的去confirm
      this.confirmList = this.list.filter(
        (item) => [...this.$refs.tblList.selection.map((d) => d.id)].indexOf(item.id) === -1
      )
      if (this.confirmList.length) {
        this.showConfirm = true
      } else {
        this.claimProject()
      }
    },

    closeConfirm() {
      this.showConfirm = false
    },

    // [不是我的]按钮触发事件
    async claimProject() {
      this.showConfirm = false
      try {
        const selectedIdList = [...this.$refs.tblList.selection.map((d) => d.id)]
        const unselectList = [...this.confirmList.map(d => d.id)]
        await submissionApi.claimProject({
          inids: selectedIdList, // 选中的即要认领的项目
          outids: unselectList // 不是自己的项目
        })
        this.active = 2 // 进入到汇交入口页
        setTimeout(this.getClaimSubmissionData, 1000) // 重新获取已认领项目列表
      } catch (error) {
        console.log(error)
      }
    },

    // 编辑/更新
    handleEdit(index, row) {
      this.$router.push({
        name: 'submissionOperate',
        params: { id: row.id }
      })
    },

    // 查看
    handleView(index, row) {
      this.$router.push(`/submission/detail/${row.id}/${row.version}`)
    },

    handleSizeChange(size) {
      this.size = size
      this.current = 1
      this.getClaimSubmissionData()
    },

    handleCurrentChange(current) {
      this.current = current
      this.getClaimSubmissionData()
    },

    // 下载示例文档
    async downloadFile() {
      try {
        const temp = await baseApi.downFile({
          type: 'data'
        })
        this.dataIntroDocUrl = temp.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.submission-list-wrapper {
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  flex-flow: column nowrap;
  background: #fff;
  padding: 10px 20px;
  .exmpleDoc {
    color: #409eff;
    cursor: pointer;
  }
  .backbtn-wrapper {
    text-align: right;
  }
  .subission-con {
    width: 100%;
    // height: 100%;
  }
  .page-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
  }
  .not-real-wrapper {
    width: 100%;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      padding: 35px;
    }
    i {
      font-size: 50px;
      color: #a2acc0;
    }
  }
  .sublist-btn-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
}
.submission-flow-wrapper {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column nowrap;
  background: #fff;
  p {
    width: 100%;
    padding-bottom: 20px;
  }
  .step-wrapper {
    padding-bottom: 30px;
    color: #333 !important;
    .step-inner {
      height: 400px;
    }
  }
}
.submission-entry-wrapper {
  width: 100%;
  /deep/ .el-table:before {
    z-index: inherit!important;
  }
  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }
  .tips-wrapper {
    color: #ccc;
    font-size: 14px;
    li {
      padding: 3px;
    }
  }
}
</style>
<style>
[v-cloak] {
  display: none;
}
.submission-flow-wrapper .el-step__icon.is-text {
  border-color: #5fc969;
}
.submission-flow-wrapper .el-step__icon {
  background: #5fc969;
  color: #fff;
}
.submission-flow-wrapper .el-step__line {
  background-color: #e1e2e4;
}
.submission-flow-wrapper .el-step__title.is-wait {
  color: #333;
}
.submission-flow-wrapper .el-step__description.is-wait {
  color: #a5aec2;
}
.submission-list-wrapper .el-dialog__header {
  background: #eee;
}
.el-dialog__footer {
  text-align: center;
}
.el-dialog__footer button:first-child {
  margin-right: 50px;
}
</style>
