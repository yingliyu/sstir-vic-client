<template>
  <div class="home-wrapper">
    <p>{{$t('base.welcome')}}</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',

  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.home-wrapper {
  padding: 20px;
  font-size: 24px;
  p{
    padding-top: 200px;
    text-align: center;
    color: #666;
  }
}
</style>
