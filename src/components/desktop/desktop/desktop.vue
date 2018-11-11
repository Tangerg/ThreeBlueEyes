<template>
  <div class="tbe-desktop">
    <div class="tbe-header">
      <Header></Header>
    </div>
    <div class="tbe-main">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
    <MPlayer></MPlayer>
  </div>
</template>

<script>
  import MPlayer from 'desktop/music/m-player/m-player'
  import Header from 'desktop/header/header'
  import Footer from 'desktop/footer/footer'
  export default {
    name: "desktop",
    components:{
      Header,
      Footer,
      MPlayer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tbe-desktop
    font-family $font-family-Microsoft-YaHei
    min-height 100%
    width 100%
    overflow-y auto
    overflow-x hidden
    .tbe-header
      padding 0
      background rgba(255,255,255,0.1)
      box-shadow 0 2px 10px 0 rgba(0,34,77,.08) !important
    .tbe-main
      padding 0
</style>
