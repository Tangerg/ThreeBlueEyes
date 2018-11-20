<template>
  <div class="tbe-d-music">

    <m-header></m-header>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import MHeader from './m-header/m-header'

  export default {
    components: {
      MHeader,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-d-music
    position absolute
    top 0
    left 0
    width 100%
    min-height 100%
    background-color $color-background-global
    z-index 300
</style>
