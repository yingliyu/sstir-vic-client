<!--从已有项目中选择数据-->
<template>
  <div class="to-choose-wrapper">
    <div class="project-list-wrapper">
      <el-form>
        <el-form-item>
          <el-input placeholder="搜索项目" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="project-data-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="大小" width="120" align="center"></el-table-column>
        <el-table-column prop="address" label="类型" show-overflow-tooltip align="center"></el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="5">
        </el-pagination>
      </div>
      <div class="btn-wrapper">
        <el-button size="medium">取消</el-button>
        <el-button type="primary" size="medium">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StepTwo',
  data() {
    return {
      tableData: [
        {
          date: 'c978_sdfjdf.vcf',
          name: '199.8MB',
          address: 'VCF'
        },
        {
          date: 'c978_sdfjdf.vcf',
          name: '199.8MB',
          address: 'VCF'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="less" scoped>
.to-choose-wrapper {
  width: 100%;
  display: flex;
  padding: 15px;
  .project-list-wrapper {
    width: 300px;
    min-width: 200px;
    padding-right: 15px;
    border-right: 1px solid #eee;
  }
  .project-data-wrapper {
    width: 100%;
    padding-left: 15px;
    .page-wrapper{
      padding: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .btn-wrapper{
      display: flex;
      justify-content: center;
      padding: 20px;
    }
  }
}
</style>
