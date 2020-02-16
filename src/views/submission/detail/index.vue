<template>
  <div class="submission-detail-wrapper">
    <!-- 汇交项目详情页 -->
    <div class="detail-tab-bar">
      <div class="select-version-wrapper">
        <el-form ref="versionForm" :model="versionForm" label-width="80px">
          <el-form-item label="版本" style="width:180px">
            <el-select v-model="versionForm.version" placeholder="请选择活动区域">
              <el-option
                v-for="(item, index) in versionOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="base-info-wrapper">
            <el-card class="box-card desc-card">
              <div slot="header" class="clearfix">
                <span>项目描述</span>
              </div>
              <div class="text item">
                <div class="title-wrapper">
                  <h4>{{baseinfo.projectName}}</h4>
                  <span>编号:{{baseinfo.no}}</span>
                </div>
                <div class="tags-wrapper">
                  <span v-if="baseinfo.firstSubjectName">
                    <i>一级学科：</i>
                    <i>{{baseinfo.firstSubjectName}}</i>
                  </span>
                  <span v-if="baseinfo.secondSubjectName">
                    <i>二级学科：</i>
                    <i>{{baseinfo.secondSubjectName}}</i>
                  </span>
                  <br />
                  <span>
                    <i>项目基金：</i>
                    <i>{{baseinfo.fundsSources}}</i>
                  </span>
                </div>
                <div class="content-wrapper" v-if="baseinfo.description">
                  <p>{{baseinfo.description}}</p>
                </div>
              </div>
            </el-card>
            <el-card class="box-card member-card">
              <div slot="header" class="clearfix">
                <span>成员</span>
              </div>
              <div class="text item">
                <ul>
                  <li>
                    <div class="avatar-wrapper">
                      <el-avatar :size="60" :src="userInfo.avatar" :key="userInfo.avatar">
                        <img src="./img/head.png" />
                      </el-avatar>
                    </div>
                    <div class="user-wrapper">
                      <p>{{userInfo.realName}}</p>
                      <span>{{userInfo.deptName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据" name="second">
            <div class="text item data-tab-wrapper">
              <div class="no-result" v-if="datalist.length===0" style="text-align: center;">
                <svg
                  width="184"
                  height="152"
                  viewBox="0 0 184 152"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(24 31.67)">
                      <ellipse
                        fill-opacity="0.8"
                        fill="#F5F5F7"
                        cx="67.797"
                        cy="106.89"
                        rx="67.797"
                        ry="12.668"
                      />
                      <path
                        d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        fill="#AEB8C2"
                      />
                      <path
                        d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                        fill="url(#linearGradient-1)"
                        transform="translate(13.56)"
                      />
                      <path
                        d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        fill="#F5F5F7"
                      />
                      <path
                        d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        fill="#DCE0E6"
                      />
                    </g>
                    <path
                      d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                      fill="#DCE0E6"
                    />
                    <g transform="translate(149.65 15.383)" fill="#FFF">
                      <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                      <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                  </g>
                </svg>
                <p style="color:#ccc;">暂无数据</p>
              </div>
              <div class="data-wrapper" v-else>
                <el-table ref="datalist" :data="datalist" style="width: 100%" border>
                  <el-table-column label="名称" prop="name" align="center" fixed/>
                  <el-table-column label="大小" align="center">
                    <template slot-scope="scope">
                      {{scope.row.size}} M
                    </template>
                  </el-table-column>
                  <el-table-column label="提交者" prop="uploadUserName" align="center" />
                  <el-table-column label="最后修改日期" align="center" prop="updateTime" width="150px" />
                </el-table>
                <div class="page-wrapper">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="size"
                    layout="total, prev, pager, next, sizes"
                    :total="total"
                  ></el-pagination>
                </div>
              </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="工具" name="third">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工具</span>
            </div>
            <div class="text item">
              <div class="no-result" v-if="showNoData" style="text-align: center;">
                <svg
                  width="184"
                  height="152"
                  viewBox="0 0 184 152"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(24 31.67)">
                      <ellipse
                        fill-opacity="0.8"
                        fill="#F5F5F7"
                        cx="67.797"
                        cy="106.89"
                        rx="67.797"
                        ry="12.668"
                      />
                      <path
                        d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        fill="#AEB8C2"
                      />
                      <path
                        d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                        fill="url(#linearGradient-1)"
                        transform="translate(13.56)"
                      />
                      <path
                        d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        fill="#F5F5F7"
                      />
                      <path
                        d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        fill="#DCE0E6"
                      />
                    </g>
                    <path
                      d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                      fill="#DCE0E6"
                    />
                    <g transform="translate(149.65 15.383)" fill="#FFF">
                      <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                      <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                  </g>
                </svg>
                <p style="color:#ccc;">暂无数据</p>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="任务" name="fourth">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>任务</span>
            </div>
            <div class="text item">
              <div class="no-result" v-if="showNoData" style="text-align: center;">
                <svg
                  width="184"
                  height="152"
                  viewBox="0 0 184 152"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(24 31.67)">
                      <ellipse
                        fill-opacity="0.8"
                        fill="#F5F5F7"
                        cx="67.797"
                        cy="106.89"
                        rx="67.797"
                        ry="12.668"
                      />
                      <path
                        d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        fill="#AEB8C2"
                      />
                      <path
                        d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                        fill="url(#linearGradient-1)"
                        transform="translate(13.56)"
                      />
                      <path
                        d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        fill="#F5F5F7"
                      />
                      <path
                        d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        fill="#DCE0E6"
                      />
                    </g>
                    <path
                      d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                      fill="#DCE0E6"
                    />
                    <g transform="translate(149.65 15.383)" fill="#FFF">
                      <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                      <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                  </g>
                </svg>
                <p style="color:#ccc;">暂无数据</p>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="交互分析" name="five">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>交互分析</span>
            </div>
            <div class="text item">
              <div class="no-result" v-if="showNoData" style="text-align: center;">
                <svg
                  width="184"
                  height="152"
                  viewBox="0 0 184 152"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(24 31.67)">
                      <ellipse
                        fill-opacity="0.8"
                        fill="#F5F5F7"
                        cx="67.797"
                        cy="106.89"
                        rx="67.797"
                        ry="12.668"
                      />
                      <path
                        d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        fill="#AEB8C2"
                      />
                      <path
                        d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                        fill="url(#linearGradient-1)"
                        transform="translate(13.56)"
                      />
                      <path
                        d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        fill="#F5F5F7"
                      />
                      <path
                        d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        fill="#DCE0E6"
                      />
                    </g>
                    <path
                      d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                      fill="#DCE0E6"
                    />
                    <g transform="translate(149.65 15.383)" fill="#FFF">
                      <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                      <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                  </g>
                </svg>
                <p style="color:#ccc;">暂无数据</p>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { submissionApi, dataApi } from '@/service'
import { mapGetters } from 'vuex'
export default {
  name: 'SubmissionDetail',

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      activeName: 'first',
      showNoData: true,
      current: 1,
      size: 10,
      total: 0,
      pid: '',
      baseinfo: {},
      versionForm: {
        version: this.$route.params.version
      },
      versionOptions: [],
      datalist: [] // tab栏数据列表
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getVersionOptions() // 获取可选版本号列表
      this.getPid()
      this.getSubmissionDetail()
    })
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  watch: {
    // 监听版本号，版本号改变会重新获取汇交详情
    'versionForm.version': function(val, oldval) {
      this.versionForm.version = val
      this.getSubmissionDetail()
    }
  },

  methods: {
    // 获取pid
    async getPid() {
      try {
        const res = await dataApi.getDirId(this.$route.params.id)
        if (res.data.dataDirId) {
          this.pid = res.data.dataDirId
          // this.getDataManage()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取版本号下拉数据
    async getVersionOptions() {
      const res = await submissionApi.getProjectVersion({ projectId: this.$route.params.id })
      if (res.data) {
        this.versionOptions = res.data.data
      }
    },

    // 根据版本号获取汇交信息详情
    async getSubmissionDetail() {
      try {
        const res = await submissionApi.getSubmissionDetail({
          id: this.$route.params.id,
          version: parseInt(this.versionForm.version)
        })
        if (res.data && res.data.dataDirId) {
          this.baseinfo = res.data
          this.pid = res.data.dataDirId
          this.getDataManage()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取tab栏数据管理列表
    async getDataManage() {
      try {
        const temp = await dataApi.dataManage({
          userid: this.userInfo.userId,
          pid: this.pid,
          search: '',
          level: '',
          // flag: '0',
          code: '',
          // type: '1',
          current: this.current,
          size: this.size
        })
        this.datalist = []
        if (temp.data.records.length) {
          this.datalist = temp.data.records
          this.total = temp.data.total
          this.size = temp.data.size
          this.current = temp.data.current
        }
      } catch (error) {
        console.log(error)
      }
    },

    handleSizeChange(size) {
      this.size = size
      this.current = 1
      this.getDataManage()
    },

    handleCurrentChange(current) {
      this.current = current
      this.getDataManage()
    },

    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.submission-detail-wrapper {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  background: #fff;
  padding: 15px;
  font-size: 14px;
  .detail-tab-bar {
    width: 100%;
    .select-version-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      label {
        padding-top: 8px;
      }
    }
  }
  .base-info-wrapper {
    display: flex;
    justify-content: space-between;
    .desc-card {
      width: 50%;
      min-width: 350px;
      // color: #5a728a;
      .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
        h4 {
          font-size: 16px;
        }
      }
      .tags-wrapper {
        padding-top: 10px;
        span {
          display: inline-block;
          padding: 5px 50px 5px 0;
        }
        i {
          font-style: normal;
          &:first-child {
            color: #ccc;
          }
        }
      }
      .content-wrapper {
        p {
          line-height: 24px;
        }
      }
    }
    .member-card {
      width: 49%;
      min-width: 350px;
      li {
        // color: #5a728a;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 25px;
        .avatar-wrapper {
          width: 80px;
          padding-right: 15px;
          border-radius: 50%;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .user-wrapper {
          p {
            margin-top: 0;
          }
          span {
            padding-right: 20px;
          }
        }
      }
    }
  }
  .page-wrapper{
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
<style>
.submission-detail-wrapper .el-tabs__header {
  border: 1px solid #ebebeb;
  padding: 0 10px;
  box-shadow: 0px 0px 15px #e4e7ed;
  border-radius: 4px;
}
.submission-detail-wrapper .el-tabs__nav-wrap::after {
  height: 0px;
}
.submission-detail-wrapper .el-card__header {
  padding: 10px 20px;
  background: #f5f5f5;
  font-weight: 600;
  color: #333;
}
</style>
