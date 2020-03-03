<template>
  <div class="data-mgt-list-wrapper">
    <!-- <query-form
      v-if="querySchema.length > 0"
      :query-schema="querySchema"
      :query-model="queryModel"
      @queryclick="onQueryClick"
      :showAdd="false"
    />-->
    <query-tbl>
      <div slot="btn" class="btn-wrapper">
        <el-link
          v-if="showDelBtn"
          @click="delDataConfirm"
          type="primary"
        >{{$t('dataMgt.lists.delData')}}</el-link>
        <span></span>
        <el-link @click="toNewData" type="primary">{{$t('dataMgt.lists.addData')}}</el-link>
        <span></span>
        <el-link @click="toTaskList" type="primary">{{$t('dataMgt.lists.toTask')}}</el-link>
      </div>
      <div class="tbl-container">
        <el-tag
          v-for="tag in Object.keys(currentSelect)"
          :key="tag"
          closable
          class="tag"
          size="medium"
          @close="onCurrentTagDel(tag)"
        >{{ tag }}</el-tag>
        <el-table
          :data="tblData"
          border
          style="width:100%"
          ref="datasheetsTbl"
          @select="selectHandle"
          @select-all="selectAllHandle"
          @sort-change="changeSort"
          :default-sort = "{prop: 'size', order: 'descending'}"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column fixed :label="$t('dataMgt.lists.name')" prop="dataName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :label="$t('dataMgt.lists.size')" sortable="custom" :show-overflow-tooltip="true" width="200px">
            <template slot-scope="scope">
              <span>{{ ((scope.row.dataSize)/Math.pow(1024,3)).toFixed(2) }}G</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('dataMgt.lists.upDate')"
            prop="uploadTime"
            :show-overflow-tooltip="true"
            width="200px"
          ></el-table-column>
        </el-table>

        <el-pagination
          @current-change="onQuery"
          @size-change="onPageSizeChange"
          :current-page.sync="queryModel.pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryModel.pageSize"
          layout="total, prev, pager, next, sizes"
          :total="tblCnt"
        ></el-pagination>
      </div>
    </query-tbl>
    <div class="start-task-wrapper">
      <el-button type="primary" size="medium" @click="startTask">{{$t('dataMgt.lists.startTask')}}</el-button>
    </div>
  </div>
</template>

<script>
import queryMixin from '@/mixins/query'
import { datasheetsApi } from '@/service'
import { mapGetters } from 'vuex'

export default {
  name: 'DataMgtList',

  mixins: [queryMixin],

  data () {
    return {
      showDelBtn: false,
      selectedData: [],
      currentSelect: {},
      order: '' // 大小排序方式
    }
  },
  computed: {
    ...mapGetters(['language'])
  },

  mounted () {
    this.$nextTick(() => {
      this.initData()
      this.onQuery()
    })
  },

  methods: {
    // 排序
    changeSort(column) {
      // 正序
      if (column.order === 'ascending') {
        this.order = 'asc'
      } else {
        this.order = 'desc'
      }
      this.onQuery(this.order)
    },
    // 删除标签
    onCurrentTagDel (tag) {
      delete this.currentSelect[tag]
      this.$forceUpdate()
      const rows = this.tblData.filter(row => {
        return row.dataName === tag
      })
      rows.forEach(row => {
        this.$refs.datasheetsTbl.toggleRowSelection(row, false)
      })
    },
    // 开始任务
    startTask () {
      this.selectedData = []
      Object.keys(this.currentSelect).forEach(key => {
        this.selectedData.push({
          dataName: this.currentSelect[key].dataName,
          userId: this.currentSelect[key].userId,
          filePath: this.currentSelect[key].filePath
        })
      })
      if (this.selectedData.length) {
        this.$router.push({ path: '/task/run', query: { list: JSON.stringify(this.selectedData) } })
      } else {
        this.$message.error(this.$t('dataMgt.lists.tips1'))
      }
    },
    // 删除确认提示
    delDataConfirm () {
      this.$confirm(this.$t('dataMgt.lists.tips2') + '?', this.$t('dataMgt.lists.tips'), {
        confirmButtonText: this.$t('base.sure'),
        cancelButtonText: this.$t('base.cancel'),
        type: 'warning'
      }).then(() => {
        this.toDelData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('dataMgt.lists.tips3')
        })
      })
    },
    // 删除数据
    async toDelData () {
      try {
        this.selectedData = []
        Object.keys(this.currentSelect).forEach(key => {
          this.selectedData.push({
            dataName: this.currentSelect[key].dataName,
            userId: this.currentSelect[key].userId
          })
        })
        if (this.selectedData.length) {
          const postData = { list: this.selectedData }
          await datasheetsApi.delDatas(postData)
          this.$message.success(this.$t('dataMgt.lists.tips4') + '!')
          this.onQuery() // 刷新页面
        } else {
          this.$message.error(this.$t('dataMgt.lists.tips1'))
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 新增数据
    toNewData () {
      this.$router.push('/datasheets/add')
    },
    // 任务列表
    toTaskList () {
      this.$router.push('/task/list')
    },
    handleSelectTable () {
      if (this.tblData) {
        const keys = Object.keys(this.currentSelect)
        const rows = this.tblData.filter(row => {
          return keys.includes(row.dataName)
        })
        rows.forEach(row => {
          this.$refs.datasheetsTbl.toggleRowSelection(row)
        })
      }
    },
    // 选择表格某行
    selectHandle (selection, row) {
      if (this.currentSelect[row.dataName]) {
        delete this.currentSelect[row.dataName]
      } else {
        this.currentSelect[row.dataName] = {
          dataName: row.dataName,
          userId: row.userId,
          filePath: row.filePath
        }
      }
      if (selection.length === 0) {
        this.showDelBtn = false
      } else {
        this.showDelBtn = true
      }
      this.$forceUpdate()
    },
    // 表格全选
    selectAllHandle (selection) {
      // 全选
      if (selection.length) {
        selection.forEach((row) => {
          this.currentSelect[row.dataName] = {
            dataName: row.dataName,
            userId: row.userId,
            filePath: row.filePath
          }
        })
      } else {
        // 取消全选
        this.tblData.forEach((row) => {
          delete this.currentSelect[row.dataName]
        })
      }
      this.$forceUpdate()
      if (selection.length === 0) {
        this.showDelBtn = false
      } else {
        this.showDelBtn = true
      }
    },
    // 初始化数据
    initData () {
      this.querySchema.push(new this.$Schema('dataName', 'input', this.language === 'en' ? 'Data Name' : '数据名称:'))
    },
    // query
    async onQuery (order) {
      try {
        const { total, data } = await datasheetsApi.getDataList({ ...this.queryModel, order: order || '' })
        this.tblCnt = total || 0
        this.tblData = data
        this.$nextTick(() => {
          this.handleSelectTable()
        })
      } catch (error) {
        this.$message.error(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.data-mgt-list-wrapper {
  display: flex;
  flex-flow: column nowrap;
  .btn-wrapper {
    padding-right: 10px;
    span {
      padding: 0 10px;
      color: #666;
    }
  }
  .start-task-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
  .tag {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
