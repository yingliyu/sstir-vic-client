<template>
  <div class="task-mgt-list-wrapper">
    <query-form
      v-if="querySchema.length > 0"
      :query-schema="querySchema"
      :query-model="queryModel"
      @queryclick="onQueryClick"
      @addclick="onAddClick"
    />
    <query-tbl>
      <div slot="btn" class="btn-wrapper">
        <el-link @click="toDataList" type="primary">返回数据列表</el-link>
      </div>
      <div class="tbl-container">
        <el-table :data="tblData" border style="width:100%" ref="tbl">
          <el-table-column fixed label="任务名称" prop="taskName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            label="发起时间"
            prop="startTime"
            :show-overflow-tooltip="true"
            width="200px"
          ></el-table-column>
          <el-table-column label="运行时间" prop="duration" :show-overflow-tooltip="true" width="200px"></el-table-column>
          <el-table-column label="状态" prop="taskStatus" :show-overflow-tooltip="true" width="200px">
            <template slot-scope="scope">
              <span>{{scope.row.taskStatus==='0'? '进行中': '完成'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分析报告" :show-overflow-tooltip="true" width="250px">
            <template slot-scope="scope">
              <a class="report-url" :href="scope.row.reportUrl">{{scope.row.reportUrl}}</a>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="onQuery"
          @size-change="onPageSizeChange"
          :current-page.sync="queryModel.pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryModel.pageSize"
          layout="total,  prev, pager, next, sizes"
          :total="tblCnt"
        ></el-pagination>
      </div>
    </query-tbl>
  </div>
</template>

<script>
import queryMixin from '@/mixins/query'
import { taskApi } from '@/service'

export default {
  name: 'TaskList',

  mixins: [queryMixin],

  data () {
    return {}
  },

  mounted () {
    this.$nextTick(() => {
      this.initData()
      this.onQuery()
    })
  },

  methods: {
    toDataList () {
      this.$router.push('/datasheets/list')
    },
    initData () {
      const statusList = [{
        value: 0,
        text: '进行中'
      },
      {
        value: 1,
        text: '完成'
      }]
      this.querySchema.push(new this.$Schema('taskStatus', 'select', '状态:', '请选择', statusList))
    },

    async onQuery () {
      try {
        const { total, records: list } = await taskApi.getTaskList(this.queryModel)
        this.tblCnt = total
        this.tblData = list
      } catch (error) {
        this.$message.error(error)
      }
    },

    onAddClick () { }
  }
}
</script>

<style lang="less" scoped>
.task-mgt-list-wrapper {
  display: flex;
  flex-flow: column nowrap;
  .btn-wrapper {
    padding-right: 10px;
  }
  .report-url {
    color: #409eff;
    text-decoration: underline;
  }
}
</style>
