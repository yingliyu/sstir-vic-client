<template>
  <div class="i18n-wrapper">
    <i v-if="language === 'en'" class="iconfont vic-zhongwen1 i18n" @click="handleSetLanguage('zh')" />
    <i v-else class="iconfont vic-yingwen i18n" @click="handleSetLanguage('en')" />
  </div>
</template>

<script>

export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('set_language', lang)
    }
  }
}
</script>

<style lang="less" scoped>
.i18n-wrapper {
  display: flex;
  align-items: center;
  padding-right: 15px;
  .i18n {
    font-size: 32px;
    color: #ccc;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
