<template>
  <div class="m-header">
    <div class="header-logo">蓝眼音乐</div>
    <div class="header-route">
      <div class="header-route-item" @click="goTo('/d/music/recommend')">推荐</div>
      <div class="header-route-item" @click="goTo('/d/music/singer')">歌手</div>
      <div class="header-route-item" @click="goTo('/d/music/rank')">排行榜</div>
    </div>
    <div class="header-operation">
      <div class="icon">
        <span>
          <i class="iconfont icon-minimum" @click="miniPlay()"></i>
        </span>
        <span>
          <i class="iconfont icon-close" @click="closePlay()"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {

    methods: {
      ...mapMutations({
        setMiniMusic: 'SET_MINI_MUSIC',
        setPlayList: 'SET_PLAY_LIST',
        setActiveIndex: 'SET_ACTIVE_INDEX'
      }),
      miniPlay() {
        this.backToIndex()
      },
      closePlay() {
        this.setPlayList([])
        this.backToIndex()
      },
      backToIndex() {
        this.setActiveIndex('1')
        let i = setTimeout(() => {
          this.goTo('/d/index')
          clearTimeout(i);
        }, 200);
      },
      goTo(path) {
        this.$router.push(path)
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .m-header
    width 1200px
    height 79px
    border-bottom 1px solid red;
    margin 0 auto
    display flex
    text-align center
    .header-logo
      flex 1
      height 79px
      line-height 79px
      font-size $font-size-20px
      text-align left
    .header-route
      flex 1
      display flex
      .header-route-item
        flex 1
        height 79px
        line-height 79px
        font-size $font-size-20px
        font-weight bold
        &:hover
          background-color #5daf34
          color white
    .header-operation
      flex 1
      height 79px
      line-height 79px
      font-size $font-size-20px
      display flex
      .icon
        width 20%
        display flex
        margin 0 80%
        i
          margin 0 10px
          &:hover
            cursor pointer
</style>
