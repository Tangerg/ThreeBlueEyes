<template>
  <div class="song-list">
    <div class="sequence-play" @click.stop="playAll">
      <i class="iconfont icon-play2"></i>
      <span class="text">播放全部</span>
      <span class="count">(共{{totalNumber}}首)</span>
    </div>
    <ul>
      <li class="list-item" v-for="(song, index) in songs" :key="song.id" @click.stop="selectItem(song, index)">
        <p class="rank">{{index + 1}}</p>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{describe(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    computed: {
      totalNumber() {
        return this.songs.length
      }
    },
    methods: {
      playAll() {
        this.$emit('selectAll')
      },
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      describe(song) {
        if (song.album) {
          return `${song.singer} - ${song.album}`
        } else {
          return `${song.singer}`
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list
    background-color $color-background-global
    width 100%
    border-radius 10px 10px 0 0
    .sequence-play
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 50px
      border-bottom 1px solid $color-line-gray
      .iconfont
        flex 0 0 55px;
        text-align center
        color $color-text-black
      .text
        font-size $font-size-14px
        color $color-text-black
        font-weight bold
      .count
        font-size $font-size-13px
        color $color-text-gray-d
    .list-item
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 60px
      border-bottom 1px solid $color-line-gray
      .rank
        flex 0 0 55px;
        text-align center
        color $color-text-black
      .content
        flex 1
        height 60px
        overflow hidden
        .name
          no-wrap()
          width: 90%;
          height 40px
          line-height 40px
          font-size $font-size-14px
          color $color-text-black
        .desc
          no-wrap()
          width: 90%;
          height 20px
          font-size $font-size-12px
          color $color-text-gray-d
</style>
