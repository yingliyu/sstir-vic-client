<template>
  <div class="project-list-wrapper">
    <query-form
      v-if="querySchema.length > 0"
      ref="queryForm"
      :query-schema="querySchema"
      :query-model="queryModel"
      @queryclick="onQueryClick"
    >
    </query-form>

    <query-tbl>
      <el-table
        :data="tblData"
        stripe
        style="width: 100%"
        :max-height="maxHeight"
        border
        fit
        highlight-current-row
      >
        <el-table-column header-align="center" align="center" label="项目名称" prop="projectName" />
        <el-table-column header-align="center" align="center" label="创建人" prop="creator" />
        <el-table-column header-align="center" align="center" label="权限" prop="role" />
        <el-table-column header-align="center" align="center" label="最后修改时间" prop="lastModifyTime" />
        <el-table-column header-align="center" align="center" label="对外发布" prop="isPublish" />
      </el-table>
    </query-tbl>
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
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import query from '@/mixins/query'

export default {
  name: 'ProjectList',

  mixins: [query],

  data () {
    return {
    }
  },

  mounted () {
    this.$nextTick(() => {
      this._initQuery()
      this.onQuery()
    })
  },

  methods: {
    _initQuery () {
      this.querySchema.push(new this.$Schema('projectName', 'input', '项目名称:'))
      this.querySchema.push(new this.$Schema('creator', 'input', '创建人:'))
    },

    onQuery () {
      this.tblData = [
        {
          projectName: '项目1',
          creator: '左天宇',
          role: 'admin',
          lastModifyTime: '2019-08-30 19:20:11',
          isPublish: '是'
        }
      ]
      this.tblCnt = this.tblData.length
    }
  }
}
</script>

<style lang="less" scoped>
  .project-list-wrapper {
    .page-wrapper{
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
