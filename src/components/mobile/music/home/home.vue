<template>
  <div>
    <div class="tbe-m-music-tab">
      <router-link tag="div" class="tab-item" to="/m/music/home/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/m/music/home/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/m/music/home/rank">
        <span class="tab-link">排行</span>
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-m-music-tab
    width 100%
    background-color $color-background-red
    display flex
    height 45px
    line-height 40px
    font-size $font-size-14px
    z-index 100
    .tab-item
      flex 1
      text-align center
      .tab-link
        padding-bottom 5px
        color $color-text-white-d
      &.router-link-active
        .tab-link
          color $color-text-white
          border-bottom 2px solid $color-text-white
</style>
