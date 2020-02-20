<template>
  <div class="add-data-wrapper">
    <p><b>由于测序数据普遍比较大，请点击下方链接前往上传</b></p>
    <p>
      <a class="ucloudLink" :href="url" target="_blank">
        上传地址
      </a>
    </p>
    <p>
      如果您的数据量特别大（超过20G），请发送邮件至tyzuo@sstir.cn，我们将安排服务专员与您取得联系。
    </p>
    <p>
      疫情当前，服务量可能较大，服务时间可能超出常规时间，敬请理解。
    </p>
  </div>
</template>

<script>
import appConfig from '@/config'
import { mapGetters } from 'vuex'
export default {
  name: 'ToolList',

  computed: {
    ...mapGetters(['userInfo']),

    url() {
      return `${appConfig.ucloudUrl}?accessKey=${this.userInfo.accessKey}&secretKey=${this.userInfo.secretKey}`
    }
  }
}
</script>

<style lang="less" scoped>
.add-data-wrapper {
  background: #fff;
  padding: 30px 50px;
  .ucloudLink{
    display: inline-block;
    color: #409EFF;
    cursor:pointer;
    text-decoration: underline;
    padding: 30px 0;
  }
}
</style>
