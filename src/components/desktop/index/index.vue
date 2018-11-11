<template>
  <div class="tbe-index">
    <div class="index-bing" v-show="bingFlag === true">
      <div class="index-bg">
        <div class="bg-img"></div>
        <div class="bg-mask"></div>
      </div>
      <div class="index-desc">
        <div class="desc-container">
          <h1 class="desc-title">标题标题标题标题标题标题</h1>
          <p class="desc-data">2018-10-30</p>
          <p class="desc-summary">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>
          <div class="desc-btn">
            <el-button plain class="button">点击查看</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="index-recommend" v-show="bingFlag === false">
      <div class="index-recommend-swapper">
        <el-carousel
          :interval="4000"
          trigger="click"
          :height="browserH">
          <el-carousel-item v-for="(item,index) in recommendList" :key="index">
            <div class="index-bg">
              <div class="bg-img" :style="bgImg(item.pictureUrl)"></div>
              <div class="bg-mask"></div>
            </div>
            <div class="index-desc">
              <div class="desc-container">
                <h1 class="desc-title">{{item.title}}</h1>
                <p class="desc-data">{{item.createBy}}</p>
                <p class="desc-summary">{{item.summary}}</p>
                <div class="desc-btn">
                  <el-button plain class="button" @click="selectRecommend(item)">点击查看</el-button>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="index-control" @click="changeBgImg(bingFlag)">
      <el-button class="source-switch iconfont" :class="iconMode" circle></el-button>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {getRecommend,getBingPic} from '@/api/background'
  import {ERR_OK} from "common/js/config";
  import {createArticleInfo} from "common/class/articleInfo";
  export default {
    data(){
      return{
        bingFlag:false,
        recommendList:[],
        bingPic:{},
        browserH:''
      }
    },
    created(){
      this.initRecommend();
      this.initBingPic();
      this.BrowserHeight();
    },
    computed:{
      iconMode(){
        if (this.bingFlag === false) {
          return 'icon-bing'
        }else {
          return 'icon-paperplane-fill'
        }
      }
    },
    methods:{
      ...mapMutations({
        setArticleInfo:'SET_ARTICLE_INFO'
      }),
      selectRecommend(article) {
        this.setArticleInfo(article)
        this.$router.push({
          path: `/d/p/${article.id}`
        })
      },
      //改变显示壁纸
      changeBgImg(flag){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(25, 25, 25, 0.7)'
        });
        let i = setTimeout(() => {
          loading.close();
          this.bingFlag = !flag
          clearTimeout(i);
        }, 1000);
      },
      //初始化首页
      initRecommend(){
        getRecommend().then((res)=>{
          if(res.code === ERR_OK){
            this.recommendList = res.data.articleInfoList.map((articleInfo)=>{
              return createArticleInfo(articleInfo)
            })
          }
        })
      },
      //初始化必应壁纸
      initBingPic(){
        getBingPic().then((res)=>{
          if(res.code === ERR_OK){
            this.bingPic = null;
          }
        })
      },
      //设置div背景图
      bgImg(url) {
        return `background-image:url(${url})`
      },
      //获取浏览器高度
      BrowserHeight: function () {
        let h = document.documentElement.clientHeight || document.body.clientHeight;
        this.browserH = h + 'px'
      }
    },
    components:{
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-index
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    max-height 100%
    z-index 99
    .index-bing
      .index-bg
        width 100%
        height 100%
        .bg-img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-image url(http://www.bing.com/az/hprichbg/rb/TheaterLostSouls_ZH-CN9247537981_1920x1080.jpg)
          background-size cover
          background-position center center
        .bg-mask
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 10%, rgb(57, 67, 77) 90%)
          opacity 0.7
      .index-desc
        position absolute
        top 35%
        width 100%
        height 40%
        color white
        .desc-container
          height 100%
          width 1000px
          margin 0 auto
          display flex
          flex-direction column
          .desc-title
            flex 1
            font-size $font-size-30px
          .desc-data
            flex 1
          .desc-summary
            flex 2
            margin-bottom 20px
            line-height 40px
            font-size $font-size-16px
          .desc-btn
            flex 1
            .button
              background rgba(255, 255, 255, 0)
              color rgba(255, 255, 255, 0.8)
              border-color rgba(255, 255, 255, 0.8)
              border-radius 0
    .index-recommend
      width 100%
      height 100%
      .index-recommend-swapper
        width 100%
        height 100%
        .index-bg
          width 100%
          height 100%
          .bg-img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background-size cover
            background-position center center
          .bg-mask
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 10%, rgb(57, 67, 77) 90%)
            opacity 0.7
        .index-desc
          position absolute
          top 35%
          width 100%
          height 40%
          color white
          .desc-container
            height 100%
            width 1000px
            margin 0 auto
            display flex
            flex-direction column
            .desc-title
              flex 1
              font-size $font-size-30px
            .desc-data
              flex 1
            .desc-summary
              flex 2
              margin-bottom 20px
              line-height 40px
              font-size $font-size-16px
            .desc-btn
              flex 1
              .button
                background rgba(255, 255, 255, 0)
                color rgba(255, 255, 255, 0.8)
                border-color rgba(255, 255, 255, 0.8)
                border-radius 0
    .index-control
      z-index 100
      position fixed
      bottom  40px
      right  50px
      cursor pointer
      .source-switch
        background rgba(21,35,51,.3)
        color rgba(255, 255, 255, 1)
        border 0
        &:hover
          background rgba(21,35,51,0.8)
        .icon-bing
          color rgba(255, 255, 255, 0.8)
        .icon-paperplane-fill
          color rgba(255, 255, 255, 0.8)
          font-size $font-size-20px
</style>
