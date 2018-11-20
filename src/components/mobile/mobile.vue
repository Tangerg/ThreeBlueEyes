<template>
  <div class="tbe-mobile">
    <div class="tbe-mobile-body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Tabbar></Tabbar>
  </div>

</template>
<script>
  import Tabbar from 'mobile/tabbar/tabbar'

  export default {
    name: "mobile",
    components: {
      Tabbar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-mobile
    z-index 100
    background-color $color-background-global
    .tbe-mobile-body
      position absolute
      top 0
      left 0
      right 0
      bottom 51px
</style>
