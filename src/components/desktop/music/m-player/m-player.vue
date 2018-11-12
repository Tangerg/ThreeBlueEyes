<template>
  <div class="tbe-m-player" v-if="playList.length>0">
    <div class="max-player" v-show="fullScreen===true">
      <div class="background">
        <div class="filter"></div>
        <img :src="currentSong.image" width="100%" height="100%">
      </div>
      <div class="player-top">
        <div class="player-top-left">
          <div class="middle-front">
            <div class="cd-wrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image" >
              </div>
            </div>
          </div>
          <div class="player-top-left-btn">
            <el-button class="btn" size="small" icon="el-icon-star-off">喜欢</el-button>
            <el-button class="btn" size="small" icon="el-icon-news">收藏</el-button>
            <el-button class="btn" size="small" icon="el-icon-download">下载</el-button>
            <el-button class="btn" size="small" icon="el-icon-share">分享</el-button>
          </div>
        </div>
        <div class="player-top-right">
          <div class="player-top-right-head">
            <div class="song-title">
              <div class="song-name">{{currentSong.name}}</div>
              <div class="mini-btn" @click.stop="back()">
                <el-button size="small" icon="el-icon-close">
                </el-button>
              </div>
            </div>
            <div class="song-source-info">
              <div class="song-album">专辑：{{currentSong.album}}</div>
              <div class="song-singer">歌手：{{currentSong.singer}}</div>
            </div>
          </div>
          <div class="player-top-right-body">
            <div class="no-lyric" v-show="!currentLyric">
              暂无歌词
            </div>
            <scroll class="middle-behind" ref="lyricList" :data="currentLyric && currentLyric.lines" v-show="currentLyric && currentLyric.lines">
              <div class="lyric-wrapper">
                <div class="currentLyric" v-if="currentLyric">
                  <p ref="lyricLine" class="text" :class="{'highLight':currentLineNum === index}"  v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                  <p class="no-lyric"></p>
                </div>
              </div>
            </scroll>
          </div>
        </div>
      </div>
      <div class="player-bottom">
        <div class="player-bottom-container">
          <div class="bottom-control">
            <div class="control-btn">
              <i class="iconfont icon-shangyiqu" @click="prevSong"></i>
            </div>
            <div class="control-btn control-btn-play">
              <i class="iconfont" :class="playIcon" @click="handlePlay"></i>
            </div>
            <div class="control-btn">
              <i class="iconfont icon-xiayiqu-copy" @click="nextSong"></i>
            </div>
          </div>
          <div class="bottom-progress-bar">
            <span class="time time-l">{{format(currentTime)}}</span>
            <el-slider
              class="progress-bar"
              v-model="currentProgress"
              :show-tooltip="false"
            ></el-slider>
            <span class="time time-r">{{format(this.duration)}}</span>
          </div>
          <div class="bottom-mode">
            <div class="mode-list change-mode">
              <i class="iconfont" :class="iconMode" @click="changeMode" ></i>
            </div>
            <div class="mode-list music-list">
              <i class="iconfont icon-weibiao45127" @click="showList()"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="play-list" v-show="showListFlag">
        <el-table
          :data="playList"
          height="250"
          border
          style="width: 600px">
          <el-table-column
            prop="name"
            label="歌曲"
            width="200">
          </el-table-column>
          <el-table-column
            prop="singer"
            label="歌手"
            width="200">
          </el-table-column>
          <el-table-column
            prop="album"
            label="专辑">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="mini-player" v-show="fullScreen===false" :style="bgImg(currentSong.image)">
      <div class="mask"></div>
      <div class="mini-player-container">
        <div class="control">
          <div class="control-btn">
            <i class="iconfont icon-shangyiqu" @click="prevSong"></i>
          </div>
          <div class="control-btn control-btn-play">
            <i class="iconfont" :class="playIcon" @click="handlePlay"></i>
          </div>
          <div class="control-btn">
            <i class="iconfont icon-xiayiqu-copy" @click="nextSong"></i>
          </div>
        </div>
        <div class="song-info"  @click="open()">
          <div class="song-name">{{currentSong.name}}</div>
          <div class="song-singer">{{currentSong.singer}}</div>
        </div>
      </div>
    </div>
    <audio id="music-audio" ref="audio" @canplay="ready" @error="error" @timeupdate="updataTime" @ended="end" autoplay></audio>
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {ERR_OK} from 'common/js/config'
  import {getPlaySong,getSongLyric} from 'api/song'
  import {Mode} from 'common/js/config'
  import {shuffle} from 'common/js/util'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  export default {
    data(){
      return{
        Song:{},
        musicUrl:'',
        currentLyric:null,
        currentLineNum:0,
        songReady: false,
        currentTime:0,
        currentProgress:0,
        duration: 0,
        currentShow:'cd',
        showListFlag:false
      }
    },
    created() {
      this.touch = {}
    },
    computed:{
      ...mapGetters([
        'playList',
        'fullScreen',
        'sequenceList',
        'isPlaying',
        'currentIndex',
        'currentSong',
        'playMode',
        'favourateList'
      ]),
      percent(){
        return this.currentTime/this.duration
      },
      cdCls() {
        return this.isPlaying ? 'play' : 'play pause'
      },
      iconMode(){
        if (this.playMode === Mode.sequence) {
          return 'icon-liebiaoxunhuan'
        } else if (this.playMode === Mode.loop) {
          return 'icon-shuaxin'
        } else {
          return 'icon-suiji'
        }
      },
      playIcon(){
        return this.isPlaying ? 'icon-pause' : 'icon-sanjiaoxing'
      },
    },
    watch:{
      currentTime(){
        this.currentProgress = (this.currentTime/this.duration)*100
      },
      currentSong (newVal, oldVal) {
        if (!newVal.id) {
          return
        }
        if (newVal.id === oldVal.id) {
          return
        }
        if(oldVal.id){
          this.$refs.audio.pause()
          this.$refs.audio.currentTime = 0
        }

        this._getPlaySong(newVal.id)
        if(this.currentLyric){
          this.currentLyric.stop()
        }
        this._getSongLyric(newVal.id)
      },

      musicUrl(url){
        this.$refs.audio.src = url
        let stop = setInterval(() => {
          this.duration = this.$refs.audio.duration
          if (this.duration) {
            clearInterval(stop)
          }
        }, 150)

        this.setPlayingState(true)
      },
      isPlaying(Playing){
        const audio = this.$refs.audio
        Playing ?  audio.play() : audio.pause()
      },
    },
    methods:{
      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex:'SET_CURRENT_INDEX',
        setPlayingMode:'SET_PLAYING_MODE',
        setPlayList:'SET_PLAY_LIST'
      }),
      ...mapActions([
        'savePlayHistory',
        'saveFavoriteSong',
        'deleteFavoriteSong'
      ]),
      showList(){
        this.showListFlag = !this.showListFlag
      },
      getFavIcon(song){
        if(this.isFavSong(song)){
          return 'icon-iconfontxihuan2'
        }
        return 'icon-iconfontxihuan'
      },
      handleFav(song){
        if(this.isFavSong(song)){
          this.deleteFavoriteSong(song)
        }else{
          this.saveFavoriteSong(song)
        }

      },
      isFavSong(song){
        const index = this.favourateList.findIndex((item) => {
          return item.id === song.id
        })
        return index > -1
      },
      showPlayList(){
        this.$refs.playlist.show()
      },
      changeMode(){
        const playMode = (this.playMode+1) % 3
        this.setPlayingMode(playMode)
        let list = null
        if(playMode === Mode.random){
          list = shuffle(this.sequenceList)
        }else{
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      },
      resetCurrentIndex(list){
        let index = list.findIndex((item)=>{
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      onProgressBarChange(percent){
        const currentTime = this.duration * percent / 100
        this.$refs.audio.currentTime = this.duration * percent / 100
        if(!this.isPlaying){
          this.handlePlay()
        }
        if(this.currentLyric){
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      back(){
        this.setFullScreen(false)
      },
      open(){
        this.setFullScreen(true)
        if(this.currentLyric){
          this.currentLyric.seek(this.currentTime * 1000)
        }
      },
      bgImg(url) {
        return `background-image:url(${url})`
      },
      handlePlay(){
        if(!this.songReady){
          return
        }
        this.setPlayingState(!this.isPlaying)
        if(this.currentLyric){
          this.currentLyric.togglePlay()
        }
      },
      updataTime(e){
        this.currentTime = e.target.currentTime
      },
      end(){
        if(this.playMode === Mode.loop){
          this.loop()
        }else{
          this.nextSong()
        }
      },
      loop(){
        this.$refs.audio.currentTime =
          this.$refs.audio.play()
        if(this.currentLyric){
          this.currentLyric.seek(0)
        }
      },
      format(interval){
        interval = interval | 0
        let minute = interval / 60 | 0
        let second = interval % 60
        if (second < 10) {
          second = '0' + second
        }
        return minute + ':' + second
      },
      _getPlaySong(id){
        getPlaySong(id).then((res) => {
          if(res.code === ERR_OK){
            this.musicUrl = res.data[0].url
          }
        })
      },
      _getSongLyric(id){
        getSongLyric(id).then((res) => {
          if(res.code === ERR_OK){
            this.currentLyric = new Lyric(res.lrc.lyric,this.handleLyric)
            if(this.isPlaying){
              this.currentLyric.play()
            }
          }
        })
      },
      handleLyric({lineNum,txt}){
        this.currentLineNum = lineNum
        if(lineNum>4){
          let lineEl = this.$refs.lyricLine[lineNum - 4]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        }else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
      },

      ready (){
        this.songReady = true
        this.savePlayHistory(this.currentSong)
      },
      error(){
        this.songReady = true
      },
      nextSong(){
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if(index === this.playList.length){
          index = 0
        }
        this.setCurrentIndex(index)
        if(!this.isPlaying){
          this.handlePlay()
        }
        this.songReady = false
      },
      prevSong(){
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if(index === -1){
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if(!this.isPlaying){
          this.handlePlay()
        }
        this.songReady = false
      },
      changeMiddle () {
        if (this.currentShow === 'cd') {
          this.currentShow = 'lyric'
          this.currentLyric.seek(currentTime * 1000)
        } else {
          this.currentShow = 'cd'
        }
      },

    },
    components:{
      Scroll,
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .tbe-m-player
    .max-player
      z-index 400
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      min-width 1200px
      min-height 700px
      background $color-background-gray
      .background
        position absolute
        left -50%
        top -50%
        width 300%
        height 300%
        z-index -1
        opacity 0.8
        filter blur(30px)
        .filter
          position absolute
          width 100%
          height 100%
          background $color-background-black
          opacity 0.6
      .player-top
        position absolute
        top 0
        left 0
        right 0
        height 80%
        width 100%
        display flex
        flex-direction row
        .player-top-left
          flex 1
          .middle-front
            display inline-block
            position relative
            width 100%
            height 400px
            margin-top 50px
            .cd-wrapper
              position absolute
              left 0
              top 0
              width 100%
              height 400px
              .cd
                width 400px
                height 400px
                margin auto
                box-sizing border-box
                border 30px solid rgba(255, 255, 255, 0.1)
                border-radius 50%
                &.play
                  animation: rotate 35s linear infinite
                &.pause
                  animation-play-state: paused
                .image
                  position: relative;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
          .player-top-left-btn
            width 400px
            margin 0 auto
            margin-top 50px
            display flex
            flex-direction row
            .btn
              flex 1
        .player-top-right
          flex 1
          display flex
          flex-direction column
          .player-top-right-head
            height 25%
            width 100%
            .song-title
              margin 25px
              width 100%
              display flex
              .song-name
                font-size $font-size-30px
                width 90%
                no-wrap()
              .mini-btn
                position absolute
                right 20px
            .song-source-info
              margin 10px 25px
              display flex
              flex-direction row
              .song-album
                flex 1
              .song-singer
                flex 1
          .player-top-right-body
            height 75%
            width 90%
            .no-lyric
              height 400px
              line-height 400px
              text-align center
              color $color-text-black
              font-size $font-size-20px
            .middle-behind
              width 100%
              height 100%
              overflow hidden
              &.middleR-enter-active, &.middleR-leave-active
                transition all 0.2s
              &.middleR-enter, &.middleR-leave-to
                opacity 0
              .lyric-wrapper
                width 80%
                margin 0 auto
                overflow hidden
                text-align center
                .text
                  line-height 40px
                  color $color-text-white
                  font-size $font-size-medium
                  &.highLight
                    color $color-text-blue-l
      .player-bottom
        position absolute
        left 0
        bottom 0
        right 0
        height 70px
        width 100%
        .player-bottom-container
          width 100%
          height 100%
          display flex
          flex-direction row
          .bottom-control
            flex 1
            min-width 300px
            display flex
            flex-direction row
            .control-btn
              width 35px
              height 35px
              line-height 35px
              border-radius 50%
              margin auto
              background: rgba(7, 17, 27, 0.3);
              text-align center
              cursor pointer
              .iconfont
                color rgba(244, 244, 244, 0.56)
                display block
                font-size 17px
            .control-btn-play
              width 45px
              height 45px
              line-height 45px
          .bottom-progress-bar
            flex 4
            height 100%
            min-width 600px
            display flex
            align-items center
            margin 0 auto
            .progress-bar
              flex 7
            .time
              color $color-text-white
              font-size $font-size-17px
              flex 1
              line-height 30px
              width 30px
              &.time-l
                text-align center
                color $color-text-white
              &.time-r
                text-align center
                color $color-text-gray-l
          .bottom-mode
            flex 1
            min-width 300px
            display flex
            flex-direction row
            .mode-list
              width 45px
              height 45px
              line-height 45px
              border-radius 50%
              margin auto
              background: rgba(7, 17, 27, 0.3);
              text-align center
              cursor pointer
              .iconfont
                color rgba(244, 244, 244, 0.56)
                display block
                font-size 22px
      .play-list
        position absolute
        bottom 71px
        right 0
    .mini-player
      z-index 999
      position fixed
      right 50px
      top 100px
      width 240px
      height 60px
      border-radius 5px
      background-size cover
      background-position center center
      .mask
        z-index -1
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        border-radius 5px
        background-color $color-background-black
        opacity 0.6
      .mini-player-container
        width 100%
        height 100%
        border-radius 5px
        display flex
        .control
          width 140px
          height 60px
          line-height 60px
          display flex
          text-align center
          .control-btn
            width 35px
            height 35px
            line-height 35px
            border-radius 50%
            margin auto
            background: rgba(7, 17, 27, 0.3);
            text-align center
            cursor pointer
            .iconfont
              color rgba(244, 244, 244, 0.56)
              display block
              font-size 17px
          .control-btn-play
            width 40px
            height 40px
            line-height 40px
        .song-info
          width 100px
          height 60px
          display flex
          flex-direction column
          text-align center
          .song-name
            width 98%
            no-wrap()
            height 35px
            line-height 35px
            font-size $font-size-16px
            color $color-text-white
          .song-singer
            width 98%
            no-wrap()
            height 25px
            font-size $font-size-14px
            color $color-text-white
</style>
