<template>
  <div class="tbe-m-rank-detail">
    <div class="list-info">
      <div class="list-img">
        <img :src=this.rankList.coverImgUrl >
      </div>
      <div class="list-other">
        <div class="list-title">{{listName}}</div>
        <div class="alia-name">{{this.rankList.description}}</div>
        <div class="play-btn">
          <el-button type="primary" @click="playAll()">
            播放全部
          </el-button>
        </div>
      </div>
    </div>
    <div class="song-list">
      <ul class="song-list-header">
        <div class="null-box"></div>
        <li class="songlist-header-name">歌曲</li>
        <li class="songlist-header-singer">歌手</li>
        <li class="songlist-header-album">专辑</li>
      </ul>
      <ul class="song-list-body">
        <li class="songs" v-for="(item,index) in ListDetail" :key="index" @click="selectItem(item,index)">
          <div class="song-index">{{index+1}}</div>
          <div class="song-name">
            <div class="no-wrap">
              {{item.name}}
            </div>
          </div>
          <div class="song-singer">
            <div class="no-wrap">
              {{item.singer}}
            </div>
          </div>
          <div class="song-album">
            <div class="no-wrap">
              {{item.album}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {creatSongList} from "common/class/song";
  export default {
    data() {
      return {
        ListDetail: [],
      }
    },
    created(){
      this._initRankList(this.rankList.tracks)
    },
    computed:{
      ...mapGetters([
        'rankList',
      ]),
      playCount(){
        if (!this.rankList.playCount) {
          return
        }
        if (this.rankList.playCount < 1e4) {
          return Math.floor(this.rankList.playCount)
        } else if(this.rankList.playCount < 1e8) {
          return Math.floor(this.rankList.playCount / 10000) + '万'
        } else {
          return Math.floor(this.rankList.playCount / 100000000) + '亿'
        }
      },
      listName(){
        if (!this.rankList.name) {
          return
        }
        return this.rankList.name
      },
    },
    methods:{
      ...mapActions([
        'selectPlay'
      ]),

      _initRankList(list){
        if (!this.rankList.id) {
          this.$router.push('/home/rank')
          return
        }
        this.ListDetail = list.map((music)=>{
          return creatSongList(music)
        })
      },
      _back(){
        this.$router.back()
      },
      selectItem(item,index){
        this.selectPlay({
          list: this.ListDetail,
          index: index
        })
      },
      playAll(){
        this.selectPlay({
          list: this.ListDetail,
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .tbe-m-rank-detail
    position absolute
    top 0
    width 1200px
    margin 10px auto
    margin-bottom 50px
    min-height 100%
    display flex
    flex-direction column
    z-index 400
    background-color $color-background-gray
    .list-info
      display flex
      .list-img
        width 250px
        height 250px
        img
          width 250px
          height 250px
      .list-other
        display flex
        flex-direction column
        margin auto 20px
        height 200px
        .list-title
          flex 1
          font-size $font-size-25px
          font-weight bold
        .alia-name
          flex 1
          font-size $font-size-17px
        .play-btn
          flex 1
    .song-list
      width 100%
      margin 20px 0
      .song-list-header
        color $color-text-gray
        width 100%
        height 40px
        line-height 40px
        display flex
        flex-direction row
        .null-box
          width 50px
        .songlist-header-name
          width 384px
        .songlist-header-singer
          width 384px
        .songlist-header-album
          width 384px
      .song-list-body
        width 100%
        .songs
          width 100%
          height 50px
          line-height 50px
          display flex
          flex-direction row
          &:hover
            color $color-text-blue
            cursor pointer
          .song-index
            width 50px
            text-align center
            color $color-text-gray
          .song-name
            width 384px
            .no-wrap
              no-wrap()
              width: 90%;
          .song-singer
            width 384px
            .no-wrap
              no-wrap()
              width: 90%;
          .song-album
            width 384px
            .no-wrap
              no-wrap()
              width: 90%;
</style>
