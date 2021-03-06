<template>
  <transition name="search">
    <div class="tbe-m-music-search">
      <div class="search-box-wrapper">
        <div class="back" @click="_back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="input-searchBox">
          <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
      </div>
      <scroll class="search-scroll-wrapper"
              :beforeScroll="beforeScroll"
              ref="scroll"
              :pullup="pullup"
              @scrollToEnd="searchMore">
        <div ref="search">
          <div class="search-hots" v-show="!query">
            <p class="title">热门搜索</p>
            <span class="search-hots-item"
                  v-for="(hotkey,index) in HotKey"
                  :key="index"
                  @click="addQuery(hotkey.first)">
              {{hotkey.first}}
            </span>
          </div>
          <div class="shortcut-wrapper" v-show="!query">
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                    <i class="iconfont icon-lajitong1"></i>
                  </span>
              </h1>
              <search-list
                :searches="searchHistory"
                @select="addQuery"
                @delete="deleteSearchHistory"
              ></search-list>
            </div>
          </div>
          <div class="search-result" v-show="query">
            <suggest
              :keyWorlds="query"
              @refresh="refresh"
              ref="suggest"
              @select="saveSearch"
            >
            </suggest>
          </div>
        </div>
      </scroll>
      <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空搜索历史？" confirmBtnText="清空"></confirm>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Suggest from 'mobile/music/suggest/suggest'
  import SearchBox from 'base/search-box/search-box'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import {ERR_OK} from "common/js/config";
  import {getHotKey} from 'api/search'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        beforeScroll: true,
        pullup: true,
        HotKey: [],
        query: ''
      }
    },
    created() {
      this._getHotKey()
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ]),
      showConfirm() {
        this.$refs.confirm.show()
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      refresh() {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      searchMore() {
        this.$refs.suggest.searchMore()
      },
      _back() {
        this.$router.back()
        this.$refs.searchBox.clear()
        this.query = ''
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.HotKey = res.result.hots
          }
        })
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query) {
        this.query = query
      },
    },
    components: {
      Confirm,
      SearchBox,
      SearchList,
      Scroll,
      Suggest
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search-enter-active, .search-leave-active
    transition: all 0.3s;

  .search-enter, .search-leave-to
    transform: translate3d(50%, 0, 0);
    opacity: 0;

  .tbe-m-music-search
    position fixed
    z-index 100
    width 100%
    top 0
    bottom 0
    background $color-background-global
    .search-box-wrapper
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 50px
      background-color $color-background-red
      .back
        flex 0 0 55px;
        text-align center
        color $color-text-white
        .icon-left
          font-size 22px
      .input-searchBox
        color $color-text-white
        font-weight bold
        flex 1
        height 100%
    .search-scroll-wrapper
      height 100%
      overflow hidden
      .search-hots
        margin 0 5%
        .title
          padding 5% 0 0 0
          height 30px;
          line-height 30px
          font-size $font-size-13px
          color $color-text-gray-d
        .search-hots-item
          display inline-block
          padding 5px 10px
          margin 4px 4px 4px 0
          border 1px solid $color-line-gray
          border-radius 100px
          line-height 20px
          color $color-text-black
          font-size $font-size-14px
      .shortcut-wrapper
        position relative
        margin 2% 5%
        .search-history
          position relative
          .title
            display flex
            align-items center
            height 30px
            line-height 30px
            font-size $font-size-13px
            color $color-text-gray-d
            .text
              flex 1
            .clear
              include extend-click()
              .icon-lajitong1
                font-size $font-size-17px
                color $color-text-gray-d
      .search-result
        position relative
        width 100%
        top 10px
        bottom 0
</style>
