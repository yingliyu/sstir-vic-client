<template>
  <div class="agree-wrapper">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <user-doc :list="list" :imgW='imgW' :titleAlign='titleAlign'></user-doc>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import UserDoc from '@/components/user-doc'

import list from './data'
export default {
  name: 'Policy',
  components: {
    UserDoc
  },
  data() {
    return {
      list: list,
      titleAlign: 'center',
      imgW: '70%',
      dialogVisible: true
    }
  }
}
</script>
<style lang='less' scoped>
.agree-wrapper{
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px 40px 15px;
  .lang {
    position: absolute;
    top: 15px;
    right: 30px;
    /deep/ i.i18n{
      color: #ccc;
      &:hover{
        color: #888;
      }
    }
  }
}
</style>
