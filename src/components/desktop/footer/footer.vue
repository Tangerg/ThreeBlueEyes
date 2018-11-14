<template>
  <div class="tbe-copyright">
    Copyright © 2018 Designed by Tangerg
  </div>
</template>

<script>
  export default {
    name: "foot"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-copyright
    position relative
    width 100%
    margin-top 20px
    margin-bottom 20px
    padding 0 200px
    text-align left
    font-size $font-size-16px
    color $color-text-gray
    z-index 200
</style>
