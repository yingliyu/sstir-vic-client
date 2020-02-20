<template>
  <div class="agree-wrapper">

    <user-doc :list="list" :imgW='imgW' :titleAlign='titleAlign'></user-doc>
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
      imgW: '70%'
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
