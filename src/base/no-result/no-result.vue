<template>
  <div class="no-result">
    <div class="no-result-icon">
      <i class="iconfont icon-ico_meiyoushuju"></i>
    </div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .no-result
    width 100%
    text-align center
    .no-result-icon
      text-align center
      .icon-ico_meiyoushuju
        color $color-text-gray-d
        font-size 40px
    .no-result-text
      text-align center
      margin-top 10px
      font-size 20px
      color $color-text-gray-d
</style>
