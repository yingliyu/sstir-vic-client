<template>
  <div class="data-mgt-list-wrapper">

    <query-form
      v-if="querySchema.length > 0"
      :query-schema="querySchema"
      :query-model="queryModel"
      @queryclick="onQuery"
      :showAdd="false"
    />
    <query-tbl>
      <div slot="btn" class="btn-wrapper">
        <el-link v-if="showDelBtn" @click="toDelData" type="primary">删除数据 </el-link>
        <span></span>
        <el-link @click="toNewData" type="primary">添加数据 </el-link>
        <span></span>
        <el-link @click="toTaskList" type="primary">进入任务列表</el-link>
      </div>
      <div class="tbl-container">
        <el-table :data="tblData" border style="width:100%" ref="tbl"
        @select="selectHandle"
        @select-all="selectHandle">
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
            prop="dataSize"
            sortable
            :show-overflow-tooltip="true"
            width="200px"
          ></el-table-column>
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
          layout="total,  prev, pager, next, sizes"
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
      selection: []
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initData()
      this.onQuery()
    })
  },

  methods: {
    startTask() {
      this.$router.push('/task/run')
    },
    async toDelData() {
      try {
        let delIds = []
        this.$refs.tbl.selection.forEach(item => {
          delIds.push(item.dataName)
        })
        const param = delIds.join(',')
        console.log(param)
        await datasheetsApi.delDatas({ 'list': param })
        this.$message.success('删除成功~')
        setTimeout(this.$router.go(0), 1000) // 刷新页面
      } catch (error) {
        console.log(error)
      }
    },
    toNewData() {
      this.$router.push('/datasheets/add')
    },
    toTaskList() {
      this.$router.push('/task/list')
    },
    selectHandle(selection, row) {
      if (selection.length !== 0) {
        this.showDelBtn = true
        this.selection = selection
      } else {
        this.showDelBtn = false
      }
    },
    initData () {
      this.querySchema.push(new this.$Schema('dataName', 'input', '数据名称:'))
    },

    async onQuery () {
      const { total, records } = await datasheetsApi.getDataList(this.queryModel)
      this.tblCnt = total
      this.tblData = records
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
}
</style>
