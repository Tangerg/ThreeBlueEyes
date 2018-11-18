<template>
  <transition name="list-fade">
    <div class="tbe-m-music-singer-list">
      <div class="header">
        <div class="back" @click="_back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="text">
          <h1 class="title">{{title}}</h1>
        </div>
        <div class="filter">筛选</div>
      </div>
      <div class="container" ref="container">
          <singer-item :singers="singerDetail" @selectItem="selectSinger" ref="singer-item"></singer-item>
      </div>
      <div v-show="!singerDetail.length" class="loading-content">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
  import SingerItem from 'base/singer-item/singer-item'
  import {mapGetters,mapMutations} from 'vuex'
  import {getSinger} from 'api/singer'
  import {ERR_OK} from "common/js/config";
  import {creatSinger} from 'common/class/singer'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    data(){
      return {
        singerDetail:[]
      }
    },
    created (){
      this._initSingerList(this.singerCategory)
    },
    computed:{
      ...mapGetters([
        'singerCategory',
      ]),
      title(){
        switch (this.singerCategory) {
          case 1001:
            return '华语男歌手'
          case 1002:
            return '华语女歌手'
          case 1003:
            return '华语组合/乐队'
          case 2001:
            return '欧美男歌手'
          case 2002:
            return '欧美女歌手'
          case 2003:
            return '欧美组合/乐队'
          case 6001:
            return '日本男歌手'
          case 6002:
            return '日本女歌手'
          case 7001:
            return '韩国男歌手'
          case 7002:
            return '韩国女歌手'
          case 7003:
            return '韩国组合/乐队'
          case 4001:
            return '其他男歌手'
          case 4002:
            return '其他女歌手'
          case 4003:
            return '其他组合/乐队'
        }
      }
    },
    methods:{
      ...mapMutations({
        setSingerInfo:'SET_SINGER_INFO'
      }),
      _back(){
        this.$router.back()
      },
      _initSingerList(category){
        if (!category){
          this.$router.push('/m/music/home/singer')
          return
        }
        getSinger(category).then((res) => {
          if(res.code === ERR_OK){
            this.singerDetail = res.artists.map((singer)=>{
              return creatSinger(singer)
            })
          }
        })
      },
      selectSinger(item,index){
        this.setSingerInfo(item)
        this.$router.push({
          path: `/m/music/home/singer/${item.id}`
        })
      }
    },
    components:{
      SingerItem,
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  &.list-fade-enter-active, &.list-fade-leave-active
    transition: all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity: 0
  .tbe-m-music-singer-list
    position fixed
    z-index: 100
    top 0
    left 0
    bottom 0
    right 0
    background $color-background-global
    .header
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 8%
      z-index 100
      background-color $color-background-red
      .back
        flex 0 0 50px;
        text-align center
        color $color-text-white
        .icon-left
          font-size $font-size-22px
      .text
        color $color-text-white
        flex 1
        height 45px
        line-height 45px
        .title
          font-size $font-size-14px
      .filter
        flex 0 0 60px;
        text-align center
        font-size $font-size-13px
        color $color-text-white
    .container
      overflow hidden
      width 100%
      height 100%
    .loading-content
      position fixed
      width 100%
      top 50%
      transform: translateY(-50%)
</style>
