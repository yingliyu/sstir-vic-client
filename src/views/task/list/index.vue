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
        <el-link @click="toDataList" type="primary">{{$t('taskMgt.lists.toDatas')}}</el-link>
      </div>
      <div class="tbl-container">
        <el-table :data="tblData" border style="width:100%" ref="tbl">
          <el-table-column
            fixed
            :label="$t('taskMgt.lists.taskName')"
            prop="taskName"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            :label="$t('taskMgt.lists.startTime')"
            prop="startTime"
            :show-overflow-tooltip="true"
            width="180px"
          ></el-table-column>
          <el-table-column
            :label="$t('taskMgt.lists.duration')"
            prop="duration"
            :show-overflow-tooltip="true"
            width="180px"
          ></el-table-column>
          <el-table-column
            :label="$t('taskMgt.lists.taskStatus')"
            prop="taskStatus"
            :show-overflow-tooltip="true"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{scope.row.taskStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column width="160" :label="$t('taskMgt.lists.reportUrl')" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a class="report-url" :href="scope.row.reportUrl">
                <i v-if="scope.row.reportUrl" class="el-icon-download"></i>
              </a>
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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['language'])
  },

  methods: {
    toDataList () {
      this.$router.push('/datasheets/list')
    },
    initData () {
      const statusList = [{
        value: 1,
        text: this.$t('taskMgt.lists.adding')
      },
      {
        value: 2,
        text: this.$t('taskMgt.lists.complete')
      }]
      this.querySchema.push(new this.$Schema('taskStatus', 'select', this.$t('taskMgt.lists.taskStatus') + ':', this.$t('taskMgt.lists.select'), statusList))
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
