<template>
  <el-card class="tbl-wrapper">
    <div slot="header">
      <span style="font-weight: bolder;"><i style="margin-right: 5px;" class="el-icon-s-grid"></i>{{$t('query.table.result')}}</span>
      <template><span style="float: right;"><slot name="btn"></slot></span></template>
    </div>
    <div>
      <slot name="default"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'QueryTbl'
}
</script>

<style lang="less" scoped>
.tbl-wrapper {
  margin: 10px;
}
</style>
