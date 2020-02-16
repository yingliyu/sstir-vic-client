<template>
  <div class="header-wrapper">
    <header>
      <img src="./img/logo.png" />
      <span class="logo-txt">病毒基因组检测平台</span>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
.header-wrapper {
  header {
    font-size: 32px;
    font-family: Arial;
    font-weight: bold;
    color: #2c4c87;
    line-height: 46px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    .logo-txt {
      padding-left: 5px;
    }
    img {
      height: 40px;
    }
  }
}
</style>
