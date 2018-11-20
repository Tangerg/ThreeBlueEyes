<template>
  <div class="tbe-m-index">
    <div class="tbe-m-index-header">
      <van-tabs class="index-tabs" @click="selectCategory">
        <van-tab title="全部话题">
        </van-tab>
        <van-tab v-for="(item,index) in menuArr" :key="index" :title="item.name">
        </van-tab>
      </van-tabs>
      <van-tabs class="index-tabs" @click="selectTab">
        <van-tab title="推荐"></van-tab>
        <van-tab title="热门"></van-tab>
        <van-tab title="最近"></van-tab>
      </van-tabs>
    </div>
    <div class="van-hairline--bottom"></div>
    <scroll
      class="tbe-m-index-container"
      :data="articleList"
      :beforeScroll="beforeScroll"
      ref="scroll"
      :pullup="pullup"
      @scrollToEnd="getMoreArticle"
    >
      <ul class="articles">
        <li
          class="article"
          v-for="(item,index) in articleList"
          :key="index"
          @click="selectArticle(item)"
        >
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
            <!--<div class="author">
              <i class="iconfont icon-article icon-contact"></i>
              {{item.author}}
            </div>-->
            <div class="time">
              <i class="iconfont icon-article icon-clock"></i>
              {{item.createBy}}
            </div>
            <div class="view">
              <i class="iconfont icon-article icon-visibility"></i>
              {{item.viewNum}}
            </div>
            <div class="comment">
              <i class="iconfont icon-article icon-message"></i>
              {{item.commentNum}}
            </div>
            <div class="star">
              <i class="iconfont icon-article icon-thumbup"></i>
              {{item.starNum}}
            </div>
          </div>
        </li>
        <loading v-show="haveMore"></loading>
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
  import Loading from 'base/loading/loading'

  export default {
    name: "index",
    data() {
      return {
        beforeScroll: true,
        pullup: true,
        menuArr: [],
        currentCategoryId: 0,
        articleList: [],
        isFixed: false,
        tabFlag: 1,
        pageNum: 1,
        oldPageNum: 1,
        pageSize: 10,
        haveMore: false,
        oldCategory: 0,
        oldTab: 1,
      }
    },
    created() {
      this.initMenu()
      this.getArticle()
    },
    activated() {
      window.addEventListener('scroll', this.handleScroll)
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
      tabClass(id) {
        if (this.tabFlag === id) {
          return 'active'
        }
      },

      //得到更多文章
      getMoreArticle() {
        this.haveMore = true
        let i = setTimeout(() => {
          this.pageNum = this.pageNum + 1
          this.getArticle()
          this.haveMore = false
          clearTimeout(i);
        }, 500)


      },
      //初始化分类
      initMenu() {
        getCategory().then((res) => {
          if (res.code = ERR_OK) {
            this.menuArr = res.data.categoryInfo
          }
        })
      },

      //选择推荐/热门/最近
      selectTab(index) {
        this.tabFlag = index + 1
        if (this.oldTab === this.tabFlag) {
          return
        }
        if (this.oldTab !== this.tabFlag) {
          this.pageNum = 1
          this.oldTab = this.tabFlag
          this.gotoTop()
          this.articleList = []
          this.getArticle()
        }
      },
      //选择分类
      selectCategory(index) {
        //如果新点击的分类=旧的
        if (this.oldCategory === index) {
          return
        }
        //如果新点击的分类!=旧的
        if (this.oldCategory !== index) {
          //先将页数值设为1
          this.pageNum = 1
          //再将旧的分类设置为新点击的
          this.oldCategory = index
          //回到顶部
          this.gotoTop()
          this.articleList = []
          this.currentCategoryId = index
          this.getArticle()
        }
      },
      selectArticle(article) {
        this.setArticleInfo(article)
        this.$router.push({
          path: `/m/p/${article.id}`
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
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
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
            font-size $font-size-17px
            font-weight bold
          .article-content
            display flex
            margin 10px 0
            max-height 100px
            .article-summary
              width 60%
              margin-right 5px
              font-size $font-size-13px
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
            display flex
            font-size $font-size-13px
            color $color-text-gray
            div
              margin 0 5px
            .icon-article
              font-size $font-size-13px
</style>
