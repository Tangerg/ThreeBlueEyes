<template>
  <div class="tbe-explore">
    <div class="explore-container">
      <div class="container-left" :class="isFixed === true ? 'fixed' :''">
        <p class="all-topic" @click="selectCategory(0)">全部话题</p>
        <span
          class="topic-category"
          v-for="(item,index) in menuArr"
          :key="index"
          @click="selectCategory(item.id)">
            {{item.name}}
          </span>
      </div>
      <div class="container-right">
        <div class="topic-nav">
          <ul class="nav-tabs">
            <li class="tab-item" @click="selectTab(1)">
              推荐
            </li>
            <li class="tab-item" @click="selectTab(2)">
              热门
            </li>
            <li class="tab-item" @click="selectTab(3)">
              最近
            </li>
          </ul>
        </div>
        <div class="article-content">
          <div class="content-container">
            <ul class="articles">
              <li
                class="article"
                v-for="(item,index) in articleList"
                :key="index"
                @click="selectArticle(item)">
                <div class="article-box">
                  <div class="article-img">
                    <div class="img-cover">
                      <img :src="item.pictureUrl" alt="cover">
                    </div>
                  </div>
                  <div class="article-text">
                    <h2 class="article-title">
                      {{item.title}}
                    </h2>
                    <div class="article-summary">
                        <span class="article-summary-text">
                          {{item.summary}}
                        </span>
                    </div>
                  </div>
                </div>
                <div class="article-info">
                  <div class="author">
                    <i class="iconfont icon-article icon-contact"></i>
                    {{item.author}}
                  </div>
                  <div class="time">
                    <i class="iconfont icon-article icon-clock"></i>
                    {{item.createBy}}
                  </div>
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
          </div>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import BackTop from 'base/back-top/back-top'
  import {
    getCategory,
    getRecArticleByCategoryId,
    getHotArticleByCategoryId,
    getLateArticleByCategoryId
  } from "api/article";
  import {ERR_OK} from "common/js/config";
  import {createArticleInfo} from "common/class/articleInfo";

  export default {
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
      handleScroll() {
        //监听左边的高度
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 20) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
        /*console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
        console.log(window.pageYOffset +'-----------'+ document.documentElement.scrollTop +'-----------'+ document.body.scrollTop); // 滚动高度
        console.log(document.body.offsetHeight); // 文档高度
        console.log(document.body.scrollTop + window.innerHeight)*/
        //监听右边是否距离底部10px了
        if (document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 10) {
          this.isBottom = true
        } else {
          this.isBottom = false
        }
      },
      selectTab(tab) {
        this.articleList = []
        this.tabFlag = tab
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
    components: {
      BackTop
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-explore
    position relative
    width 100%
    height 100%
    background-color $color-background-gray
    display flex
    .explore-container
      margin 20px auto
      width 1200px
      height 100%
      .container-left
        display inline-block
        width 380px
        box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
        &.fixed
          position fixed
          top 60px
        .all-topic
          padding-left 15px
          background-color #ffa944
          height 50px
          line-height 50px
          font-size $font-size-17px
          color $color-text-white
          font-weight bold
        .topic-category
          padding 10px
          display inline-block
          margin 5px
          font-size $font-size-17px
          color $color-text-black-l
          &:hover
            color red
      .container-right
        display inline-block
        float right
        width 800px
        box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
        .topic-nav
          box-shadow none
          border-bottom 1px solid $color-line-white
          width 100%
          z-index 101
          .nav-tabs
            border-bottom none
            .tab-item
              display inline-block
              padding 18px 20px
              font-size $font-size-16px
              line-height 22px
              &:hover
                color $color-href-green
                background-color rgba(0, 0, 0, 0.05)
        .article-content
          min-height 100vh
          .content-container
            .articles
              display flex
              flex-direction column
              .article
                position relative
                overflow hidden
                padding 20px
                border-radius 2px
                border-bottom 1px solid $color-line-white
                cursor pointer
                .article-box
                  display flex
                  flex-direction row
                  max-height 150px
                  .article-img
                    position relative
                    float left
                    overflow hidden
                    background-size cover
                    border-radius 5px
                    margin-right 15px
                    .img-cover
                      position relative
                      width 240px
                      height 135px
                      overflow hidden
                      img
                        position relative
                        width 240px
                        height 135px
                  .article-text
                    flex 1
                    padding 5px
                    display flex
                    flex-direction column
                    line-height 1.67
                    .article-title
                      flex 0.5
                      max-height 67px
                      font-size $font-size-18px
                      font-weight 600
                      line-height 1.6
                      color $color-text-black-l
                    .article-summary
                      flex 0.5
                      max-height 67px
                      overflow hidden
                      .article-summary-text
                        font-size $font-size-15px
                        white-space normal
                        pointer-events none
                        word-break break-word
                        line-height 34px
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
