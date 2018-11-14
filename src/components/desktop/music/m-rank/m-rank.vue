<template>
  <div class="tbe-m-rank">
    <div class="title">登峰造极境 音乐排行榜</div>
    <div class="rank-list">
      <div class="rank-music">
        <ul class="items">
          <li class="item" v-for="item in rankList" :key="item.id" @click="selectItem(item)">
            <div class="icon">
              <img :src="item.coverImgUrl" width="100" height="100">
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song, index) in item.topfive" :key="index">
                <span class="index">{{index + 1}}.</span>
                <span class="name">{{song.name}}</span>
                <span class="singer">{{song.ar[0].name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
  import {getRankList} from 'api/rank'
  import {ERR_OK} from "common/js/config";
  import {mapMutations} from 'vuex'

  const TOP_CAT_ID = [0, 1, 2, 3, 4, 22]
  export default {
    data() {
      return {
        rankList: []
      }
    },
    created() {
      this._initRank()
    },
    methods: {
      ...mapMutations({
        setRankList: 'SET_RANK_LIST'
      }),
      _initRank() {
        let j = TOP_CAT_ID.length
        for (let i = 0; i < j; i++) {
          let id = TOP_CAT_ID[i]
          getRankList(id).then((res) => {
            if (res.code === ERR_OK) {
              let list = res.playlist
              list.topfive = res.playlist.tracks.slice(0, 5)
              this.rankList.push(list)
            }
          })
        }
      },
      selectItem(item) {
        this.setRankList(item)
        this.$router.push({
          path: `/d/music/rank/${item.id}`
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .tbe-m-rank
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
    .rank-list
      .rank-music
        width 100%
        .items
          .item
            padding 0 1%
            margin 20px 0
            display inline-block
            position relative
            box-sizing border-box
            width 33%
            .icon
              position relative
              display inline-block
              width 100%
              margin-bottom 5px
              img
                width 100%
                height 100%
            .songlist
              flex 1
              display flex
              flex-direction column
              justify-content center
              overflow hidden
              color $color-text-black
              font-size $font-size-small-x
              .song
                height 50px
                line-height 50px
                display flex
                .index
                  flex 0.5
                .name
                  flex 4
                  width 99%
                  no-wrap()
                .singer
                  flex 2
                  width 99%
                  no-wrap()
                  float right
</style>
