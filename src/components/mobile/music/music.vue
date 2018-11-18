<template>
  <transition name="van-fade">
    <div class="tbe-m-music" id="tbe-m-music">
      <Mheader></Mheader>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <Mplayer></Mplayer>
    </div>
  </transition>
</template>

<script>
  import Mheader from 'mobile/music/m-header/m-header'
  import Mplayer from 'mobile/music/m-player/m-player'
  export default {
    data () {
      return {
        stop: false
      }
    },
    mounted () {
      let m = document.querySelector('#tbe-m-music')
      m.addEventListener('touchend', this.firstPlay)
    },
    methods: {
      firstPlay () {
        let music = document.querySelector('#music-audio')
        music.play()
        if (music.src !== '') {
          this.stop = true
        }
      }
    },
    watch: {
      stop () {
        let m = document.querySelector('#tbe-m-music')
        m.removeEventListener('touchend', this.firstPlay)
      }
    },
    components:{
      Mplayer,
      Mheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-m-music
    position fixed
    top 0
    bottom 0
    height 100%
    width 100%
    z-index 200
    overflo hidden
    background-color $color-background-global
</style>
