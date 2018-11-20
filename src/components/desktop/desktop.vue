<template>
  <div class="tbe-desktop">
    <Header v-show="onlyMusic === false"></Header>
    <div class="tbe-body" v-show="onlyMusic === false">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
    <MPlayer></MPlayer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MPlayer from 'desktop/music/m-player/m-player'
  import Header from 'desktop/header/header'

  export default {
    name: "desktop",
    computed: {
      ...mapGetters([
        'onlyMusic',
      ]),
    },
    components: {
      Header,
      MPlayer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tbe-desktop
    position relative
    width 100%
    min-height 100%
    .tbe-body
      font-family $font-family-Microsoft-YaHei
      margin-top 60px
      height 100%
</style>
