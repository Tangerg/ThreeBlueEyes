<template>
  <div class="tbe-m-music-music-details">
    <div class="music-details-up">
      <div class="up-items" @click="goToPush('/m/music/info/history')">
        <span class="item-icon">
            <i class="iconfont icon-play"></i>
        </span>
        <span class="item-text">最近播放&nbsp;&nbsp;<span class="item-text-num">({{playHistory.length}})</span>
        </span>
      </div>
      <div class="up-items">
        <span class="item-icon">
            <i class="iconfont icon-music"></i>
        </span>
        <span class="item-text">我的电台&nbsp;&nbsp;<span class="item-text-num">(假的)</span></span>
      </div>
      <div class="up-items" @click="goToPush('/m/music/info/favourate')">
        <span class="item-icon">
            <i class="iconfont icon-folder"></i>
        </span>
        <span class="item-text">我的收藏&nbsp;&nbsp;<span class="item-text-num">({{favourateList.length}})</span></span>
      </div>
    </div>
    <div class="music-details-down">
        <span class="down-item">
          <span class="down-item-icon">
            <i class="iconfont icon-iconfontqianjin-copy"></i>
          </span>
          <span class="down-item-text">创建的歌单&nbsp;&nbsp;<span class="down-item-text-num">(假的)</span></span>
          <span class="iconfont icon-setting down-item-icon2"></span>
        </span>
      <span class="down-item">
          <span class="down-item-icon">
            <i class="iconfont icon-iconfontqianjin-copy"></i>
          </span>
          <span class="down-item-text">收藏的歌单&nbsp;&nbsp;<span class="down-item-text-num">(假的)</span></span>
          <span class="iconfont icon-setting down-item-icon2"></span>
        </span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'playHistory',
        'favourateList'
      ]),
    },
    methods: {
      goToPush(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-m-music-music-details
    position relative
    display flex
    flex-direction column
    color $color-background-global
    .up-items
      line-height 45px
      display flex
      align-items center
      text-align center
      .item-icon
        width 15%
        color red
      .item-text
        border-bottom 1px solid $color-line-gray
        width 85%
        color $color-text-black
        text-align left
        font-size $font-size-14px
        font-weight 500
      .item-text-num
        color $color-text-gray

  .music-details-down
    width 100%
    display flex
    flex-direction column
    .down-item
      line-height 30px
      display flex
      text-align center
      align-items center
      background-color $color-background-gray
      .iconfont
        font-size 12px
    .down-item-icon
      width 15%
      color $color-text-gray-d
    .down-item-text
      width 90%
      color $color-text-gray-d
      text-align left
      font-size $font-size-12px
      font-weight 400
    .down-item-icon2
      width 15%
      color $color-text-gray-d

</style>
