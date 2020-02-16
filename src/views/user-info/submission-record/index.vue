<template>
  <!-- 个人中心-已审核通过--汇交记录 -->
  <div class="delivery-record-wrapper" v-if="userInfo.isReal==='1'&&tblData">
    <el-table :data="tblData" style="width: 100%" border>
      <el-table-column label="操作" align="center" width="100px" fixed>
        <template slot-scope="scope">
          <span v-if="scope.row.projectStatus==='1'" style="color: green">
            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center" fixed >
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
      <el-table-column label="审核结果" align="center" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.projectStatus==='1'" style="color: green">
            <i class="iconfont el-icon-kf-ai53" style="font-size:16px;"></i>审核通过
          </span>
          <span v-else>未通过</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrapper">
      <el-pagination
        class="page"
        layout="total,  prev, pager, next, sizes"
        :current-page.sync="queryModel.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryModel.pageSize"
        :total="tblCnt"
        @current-change="onQuery"
        @size-change="onPageSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { submissionApi } from '@/service'
import { mapGetters } from 'vuex'
import query from '@/mixins/query'
export default {
  name: 'SubmissionRecord',

  data() {
    return {
    }
  },

  mixins: [query],

  computed: {
    ...mapGetters(['userInfo']),
    isReal() {
      return this.userInfo.userId
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.onQuery()
    })
  },

  methods: {
    handleEdit(index, row) {
      this.$router.push({
        name: 'submissionOperate',
        params: { id: row.id }
      })
    },

    handleView(index, row) {
      this.$router.push(`/submission/detail/${row.id}/${row.version}`)
    },

    // 查询已通过的汇交项目
    async onQuery() {
      try {
        const res = await submissionApi.getPassSubmissionList({
          current: this.queryModel.pageIndex,
          size: this.queryModel.pageSize,
          sort: '',
          order: ''
        })
        this.tblData = res.data.records
        this.tblCnt = res.data.total
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.delivery-record-wrapper {
  width: 100%;
  .page-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
  }
}
</style>
