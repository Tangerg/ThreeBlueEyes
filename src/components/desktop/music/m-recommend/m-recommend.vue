<template>
  <div class="tbe-m-recommend">
    <div class="title">精彩推荐</div>
    <div class="rec-banner">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <img :src="banner.picUrl">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="title">推荐歌单</div>
    <div class="rec-music">
      <ul class="items">
        <li v-for="songList in recommendlistSix" :key="songList.id" class="item" @click="_chickList(songList)">
          <div class="icon">
            <div class="gradients"></div>
            <img v-lazy="songList.picUrl">
          </div>
          <p class="play-count">
            <i class="iconfont icon-customer"></i>
            <span>{{Math.floor(songList.playCount / 10000)}}万</span>
          </p>
          <div class="text">
            {{songList.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="title">推荐歌曲</div>
    <div class="rec-music">
      <ul  class="items">
        <li v-for="song in recommendsong" :key="song.id" class="item" >
          <div class="icon">
            <img :src="song.song.album.picUrl" alt="">
          </div>
          <div class="song-singer">
            <span class="song">{{song.name}}</span>
            <span class="singer">{{song.song.artists[0].name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {getBanner,getRecommendList,getRecommendSong} from "api/recommend";
  import {createMusicList} from 'common/class/musicList'
  import {ERR_OK} from "common/js/config";

  export default {
    data(){
      return{
        banners:[],
        recommendlist: [],
        recommendlistSix: [],
        recommendsong: []
      }
    },
    created (){
      this._initBanner()
      this._initRecommendList()
      this._initRecommendSong()
    },
    methods:{
      ...mapMutations({
        setMusicList: 'SET_MUSIC_LIST',
        setRecommendList:'SET_RECOMMEND_LIST'
      }),
      //初始化轮播图
      _initBanner(){
        getBanner().then((res) => {
          if(res.code === ERR_OK){
            this.banners = res.banners
          }
        })
      },
      //初始化推荐歌单
      _initRecommendList(){
        getRecommendList().then((res) => {
          if(res.code === ERR_OK){
            this.recommendlist = res.result.map((musiclist)=>{
              return createMusicList(musiclist)
            })
            this.recommendlistSix = this.recommendlist.slice(0,20)
          }
        })
      },
      //初始化推荐歌曲
      _initRecommendSong(){
        getRecommendSong().then((res) => {
          if(res.code === ERR_OK){
            this.recommendsong = res.result.slice(0,10)
          }
        })
      },
      //点击歌单跳转
      _chickList(songList){
        this.setMusicList(songList)
        this.$router.push({
          path: `/d/music/recommend/${songList.id}`
        })

      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .tbe-m-recommend
    position relative
    width 1200px
    margin 10px auto
    margin-bottom 50px
    min-height 100%
    display flex
    flex-direction column
    background-color $color-background-gray
    .title
      margin 40px auto
      font-size $font-size-35px
      font-weight bold
    .rec-banner
      width 100%
      height 100%
    .rec-music
      width 100%
      .items
        .item
          padding 0 1%
          margin 20px 0
          display inline-block
          position relative
          box-sizing border-box
          width 20%
          .icon
            position relative
            display inline-block
            width 100%
            margin-bottom 5px
            .gradients
              position absolute
              top 0
              width 100%
              height 35px
              background linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0))
            img
              width 100%
              height 100%
          .play-count
            position absolute
            top 5px
            right 20px
            font-size $font-size-small-s
            color $color-text-white
            .iconfont
              font-size $font-size-small-s
          .text
            margin 5px
            float left
            line-height 16px
            text-align left
            height 40px
            overflow hidden
            font-size $font-size-15px
            color $color-text-black
            padding-bottom 15px
          .song-singer
            display flex
            flex-direction column
            .song
              text-align left
              text-overflow ellipsis
              overflow hidden
              white-space nowrap
              font-size $font-size-small
              font-weight bold
              color $color-text-black
            .singer
              text-align left
              text-overflow ellipsis
              overflow hidden
              white-space nowrap
              font-size $font-size-small-s
              color $color-text-black
              padding-bottom 5px
</style>
