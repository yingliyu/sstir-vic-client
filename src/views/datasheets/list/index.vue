<template>
  <div class="data-mgt-list-wrapper">

    <query-form
      v-if="querySchema.length > 0"
      :query-schema="querySchema"
      :query-model="queryModel"
      @queryclick="onQueryClick"
      :showAdd="false"
    />
    <query-tbl>
      <div slot="btn" class="btn-wrapper">
        <el-link v-if="showDelBtn" @click="delDataConfirm" type="primary">删除数据 </el-link>
        <span></span>
        <el-link @click="toNewData" type="primary">添加数据 </el-link>
        <span></span>
        <el-link @click="toTaskList" type="primary">进入任务列表</el-link>
      </div>
      <div class="tbl-container">
        <el-tag
        v-for="tag in Object.keys(currentSelect)"
        :key="tag"
        closable
        class="tag"
        size="medium"
        @close="onCurrentTagDel(tag)"
      >
        {{ tag }}
      </el-tag>
        <el-table :data="tblData" border style="width:100%" ref="datasheetsTbl"
        @select="selectHandle"
        @select-all="selectAllHandle">
           <el-table-column
            type="selection"
            width="40"
           >
          </el-table-column>
          <el-table-column
            fixed
            label="数据名称"
            align="center"
            prop="dataName"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="大小"
            align="center"
            sortable
            :show-overflow-tooltip="true"
            width="200px"
          >
          <template slot-scope="scope">
            <span>{{ ((scope.row.dataSize)/Math.pow(1024,3)).toFixed(2) }}G</span>
          </template>
          </el-table-column>
          <el-table-column
            label="上传日期"
            align="center"
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
      <el-button type="primary" size="medium" @click="startTask">开始任务</el-button>
    </div>

  </div>
</template>

<script>
import queryMixin from '@/mixins/query'
import { datasheetsApi } from '@/service'

export default {
  name: 'DataMgtList',

  mixins: [queryMixin],

  data () {
    return {
      showDelBtn: false,
      selectedData: [],
      currentSelect: {}
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initData()
      this.onQuery()
    })
  },

  methods: {
    // 删除标签
    onCurrentTagDel(tag) {
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
    startTask() {
      this.selectedData = []
      Object.keys(this.currentSelect).forEach(key => {
        this.selectedData.push({
          dataName: this.currentSelect[key].dataName,
          userId: this.currentSelect[key].userId
        })
      })
      if (this.selectedData.length) {
        this.$router.push({ path: '/task/run', query: { list: JSON.stringify(this.selectedData) } })
      } else {
        this.$message.error('请先选择数据')
      }
    },
    delDataConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.toDelData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除数据
    async toDelData() {
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
          this.$message.success('删除成功~')
          setTimeout(this.$router.go(0), 1000) // 刷新页面
        } else {
          this.$message.error('请先选择数据')
        }
      } catch (error) {
        console.log(error)
        this.$message.error(error)
      }
    },
    // 新增数据
    toNewData() {
      this.$router.push('/datasheets/add')
    },
    // 任务列表
    toTaskList() {
      this.$router.push('/task/list')
    },
    handleSelectTable() {
      const keys = Object.keys(this.currentSelect)
      const rows = this.tblData.filter(row => {
        return keys.includes(row.dataName)
      })
      rows.forEach(row => {
        this.$refs.datasheetsTbl.toggleRowSelection(row)
      })
    },
    // 选择表格某行
    selectHandle(selection, row) {
      if (this.currentSelect[row.dataName]) {
        delete this.currentSelect[row.dataName]
      } else {
        this.currentSelect[row.dataName] = {
          dataName: row.dataName,
          userId: row.userId
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
    selectAllHandle(selection) {
      // 全选
      if (selection.length) {
        selection.forEach((row) => {
          this.currentSelect[row.dataName] = {
            dataName: row.dataName,
            userId: row.userId
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
      this.querySchema.push(new this.$Schema('dataName', 'input', '数据名称:'))
    },
    // query
    async onQuery () {
      const { total, data } = await datasheetsApi.getDataList(this.queryModel)
      this.tblCnt = total
      this.tblData = data
      this.$nextTick(() => {
        this.handleSelectTable()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.data-mgt-list-wrapper {
  display: flex;
  flex-flow: column nowrap;
  .btn-wrapper{
    padding-right: 10px;
    span{
      padding: 0 10px;
      color: #666;
    }
  }
  .start-task-wrapper{
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
