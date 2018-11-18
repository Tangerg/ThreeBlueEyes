<template>
  <div class="tbe-m-index">
    <div class="tbe-m-index-header">
      <van-tabs class="index-tabs" sticky>
        <van-tab title="全部话题">
        </van-tab>
        <van-tab v-for="(item,index) in menuArr"  :key="index" :title="item.name">
        </van-tab>
      </van-tabs>
      <van-tabs class="index-tabs" @click="selectTab" sticky>
        <van-tab title="推荐"></van-tab>
        <van-tab title="热门"></van-tab>
        <van-tab title="最近"></van-tab>
      </van-tabs>
    </div>
    <div class="van-hairline--bottom"></div>
    <scroll class="tbe-m-index-container" :data="articleList">
      <ul class="articles">
        <li class="article" v-for="(item,index) in articleList"
            :key="index">
          <div class="article-title">{{item.title}}</div>
          <div class="article-content">
            <div class="article-summary">
              {{item.summary}}
              </div>
            <div class="article-img">
              <img :src="item.pictureUrl" alt="cover">
            </div>
          </div>
          <div class="article-info">
           <!-- <div class="author">
              <i class="iconfont icon-article icon-contact"></i>
              {{item.author}}
            </div>
            <div class="time">
              <i class="iconfont icon-article icon-clock"></i>
              {{item.createBy}}
            </div>-->
            <div class="view">
              <i class="iconfont icon-article icon-visibility"></i>
              {{item.viewNum}}次浏览
            </div>
            <div class="comment">
              <i class="iconfont icon-article icon-message"></i>
              {{item.commentNum}}条评论
            </div>
            <div class="star">
              <i class="iconfont icon-article icon-thumbup"></i>
              {{item.starNum}}个赞
            </div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {
    getCategory,
    getRecArticleByCategoryId,
    getHotArticleByCategoryId,
    getLateArticleByCategoryId
  } from "api/article";
  import {ERR_OK} from "common/js/config";
  import {createArticleInfo} from "common/class/articleInfo";
  import Scroll from 'base/scroll/scroll'
  export default {
    name: "index",
    data() {
      return {
        menuArr: [],
        currentCategoryId: 0,
        articleList: [],
        isFixed: false,
        tabFlag: 1,
        isBottom: false,
        pageNum: 1,
        pageSize: 10
      }
    },
    created() {
      this.initMenu()
      this.getArticle()
    },
    activated() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.handleScroll)
      next()
    },
    watch: {
      currentCategoryId(newVal, oldVal) {
        //第一次进来
        if (!oldVal) {
          this.pageNum = 1
        }
        //如果新得分类id=旧的
        if (newVal === oldVal) {
          return
        } else {
          this.pageNum = 1
        }
      },
      isBottom(newVal, oldVal) {
        //若果isBottom为true且之前为false表明到底部了
        if (oldVal === false && newVal === true) {
          this.getMoreArticle()
        } else {
          return
        }
      }
    },
    methods: {
      ...mapMutations({
        setArticleInfo: 'SET_ARTICLE_INFO'
      }),
      cateClass(id) {
        if (this.currentCategoryId === id) {
          return 'active'
        }
      },
      tabClass(id){
        if (this.tabFlag === id) {
          return 'active'
        }
      },
      handleScroll() {

        console.log("可视区域高度"+document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
        console.log("滚动高度"+window.pageYOffset +'-----------'+ document.documentElement.scrollTop +'-----------'+ document.body.scrollTop); // 滚动高度
        console.log("文档高度"+document.body.offsetHeight); // 文档高度
        console.log(document.body.scrollTop + window.innerHeight)
        //监听右边是否距离底部10px了
        if (document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 10) {
          this.isBottom = true
        } else {
          this.isBottom = false
        }
      },
      selectTab(index) {
        this.articleList = []
        this.tabFlag = index+1
        this.getArticle()
      },
      //得到更多文章
      getMoreArticle() {
        this.pageNum = this.pageNum + 1
        this.getArticle()
      },
      //初始化分类
      initMenu() {
        getCategory().then((res) => {
          if (res.code = ERR_OK) {
            this.menuArr = res.data.categoryInfo
          }
        })
      },
      selectCategory(id) {
        console.log(id)
        this.gotoTop()
        this.articleList = []
        this.currentCategoryId = id
        this.getArticle()
      },
      selectArticle(article) {
        this.setArticleInfo(article)
        this.$router.push({
          path: `/d/p/${article.id}`
        })
      },
      //回到顶部
      gotoTop(distance) {
        distance = distance > 0 ? distance : 0;
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
      },
      //获取文章
      getArticle() {
        switch (this.tabFlag) {
          case 1:
            this.getRArticleByCategory(this.currentCategoryId, this.pageNum, this.pageSize);
            break;
          case 2:
            this.getHArticleByCategory(this.currentCategoryId, this.pageNum, this.pageSize);
            break;
          case 3:
            this.getLArticleByCategory(this.currentCategoryId, this.pageNum, this.pageSize);
            break;
          default:
            this.getRArticleByCategory(this.currentCategoryId, this.pageNum, this.pageSize);
        }
      },
      //由分类获取推荐文章
      getRArticleByCategory(id, pageNum, pageSize) {
        getRecArticleByCategoryId(id, pageNum, pageSize).then((res) => {
          if (res.code = ERR_OK) {
            this.addArticleArr(res)
          }
        })
      },
      //由分类获取热门文章
      getHArticleByCategory(id, pageNum, pageSize) {
        getHotArticleByCategoryId(id, pageNum, pageSize).then((res) => {
          if (res.code = ERR_OK) {
            this.addArticleArr(res)
          }
        })
      },
      //由分类获取最近文章
      getLArticleByCategory(id, pageNum, pageSize) {
        getLateArticleByCategoryId(id, pageNum, pageSize).then((res) => {
          if (res.code = ERR_OK) {
            this.addArticleArr(res)
          }
        })
      },
      addArticleArr(res) {
        let ret = []
        ret = res.data.articleInfoList.map((articleInfo) => {
          return createArticleInfo(articleInfo)
        })
        this.articleList = this.articleList.concat(ret)
      }
    },
    components:{
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-m-index
    width 100%
    height 100%
    .tbe-m-index-header
      position fixed
      top 0
      left 0
      right 0
      z-index 500
      box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
      .index-tabs
        .van-tab--active
          color $color-text-blue
        .van-tabs__line
          background-color $color-text-blue
    .tbe-m-index-container
      position fixed
      top 90px
      left 0
      right 0
      bottom 50px
      .articles
        background-color $color-background-gray
        .article
          background-color $color-background-global
          margin-top 10px
          display flex
          flex-direction column
          padding 10px
          .article-title
            color $color-text-black
            text-align left
            font-size $font-size-16px
            font-weight bold
          .article-content
            display flex
            margin 10px 0
            max-height 100px
            .article-summary
              width 60%
              margin-right 5px
              font-size $font-size-14px
              color $color-text-black-l
              max-height 100px
              line-height 20px
              overflow hidden
            .article-img
              border-radius 5px
              height 100px
              width 178px
              img
                width 100%
                height 100%
                border-radius 5px
          .article-info
            margin-top 20px
            font-size $font-size-14px
            color $color-text-gray-d
            display flex
            width 100%
            text-align center
            .icon-article
              font-size $font-size-16px
              color $color-text-gray
            .author
              flex 1
            .time
              flex 1
            .view
              flex 1
            .comment
              flex 1
            .star
              flex 1
</style>
