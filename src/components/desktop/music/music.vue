<template>
  <div class="tbe-music">
    <div class="tbe-m-header" >
      <m-header></m-header>
    </div>
    <div class="tbe-m-body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import MHeader from './m-header/m-header'
  export default {
    computed:{
      ...mapGetters([
        'miniMusic',
      ]),
    },
    methods:{
      ...mapMutations({
        setMiniMusic: 'SET_MINI_MUSIC',
      }),
    },
    components:{
      MHeader,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-music
    position absolute
    top 0
    left 0
    width 100%
    min-height 100%
    background-color $color-background-gray
    z-index 300
</style>
