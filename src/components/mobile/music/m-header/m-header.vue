<template>
  <div class="tbe-m-music-header">
    <div class="header-left">
      <i class="iconfont icon-hamburg" @click="backIndex()"></i>
    </div>
    <div class="header-center">
      <span class="header-center-item" @click="goTo('/m/music/info')" :class="{on: '/m/music/info'===$route.path}">
        <i class="iconfont icon-yinle"></i>
      </span>
      <span class="header-center-item" @click="goTo('/m/music/home')" :class="{on: '/m/music/home/recommend' ===$route.path || '/m/music/home/singer' ===$route.path || '/m/music/home/rank'===$route.path}">
        <i class="iconfont icon-wangyiyunyinle"></i>
      </span>
      <span class="header-center-item" @click="goTo('/m/music/mv')" :class="{on: '/m/music/mv'===$route.path}">
        <i class="iconfont icon-fingerprint"></i>s
      </span>
    </div>
    <div class="header-right" @click="goToPush('/m/music/search')">
      <i class="iconfont icon-search"></i>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    methods: {
      ...mapMutations({
        setPlayingState:'SET_PLAYING_STATE',
      }),
      goTo (path) {
        this.$router.replace(path)
      },
      goToPush (path) {
        this.$router.push(path)
      },
      backIndex(){
        this.setPlayingState(false)
        this.goToPush('/m/index')
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .tbe-m-music-header
    background-color $color-background-red
    position: relative
    width 100%
    height: 50px
    text-align: center
    color: $color-text-white
    font-size: 0
    display flex
    flex-direction row
    align-items center
    z-index 100
    .header-left
      padding-left 5%
      text-align left
    .header-center
      display flex
      flex 1
      text-align center
      align-items center
      padding-left 15%
      padding-right 15%
      color rgba(255,255,255,0.7)
      .header-center-item
        flex 1
        align-items center
        text-align center
        &.on
          color rgba(255,255,255,1)
        .icon-wangyiyunyinle
          font-size 25px
    .header-right
      padding-right 5%
      text-align right
</style>
