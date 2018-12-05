<template>
  <div class="tbe-m-article-detail">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="goBack()"
    />
    <Scroll class="tbe-m-detail-container" ref="scroll">
      <div>
        <div class="container-header">
          <div class="title">
            {{articleInfo.title}}
          </div>
          <div class="author">
            <div class="avatar">
              <img src="../../../common/image/logo.png" alt="avatar">
            </div>
            <div class="name">{{articleInfo.author}}</div>
          </div>
          <div class="other-info">
            <div class="time">
              <i class="iconfont icon-article icon-clock"></i>
              {{articleInfo.createBy}}
            </div>
            <div class="view">
              <i class="iconfont icon-article icon-visibility"></i>
              {{articleInfo.viewNum}}
            </div>
            <div class="comment">
              <i class="iconfont icon-article icon-message"></i>
              {{articleInfo.commentNum}}
            </div>
            <div class="star">
              <i class="iconfont icon-article icon-thumbup"></i>
              {{articleInfo.starNum}}
            </div>
          </div>
        </div>
        <div class="detail-article-content">
          <article-content :article="articleContent"></article-content>
        </div>
        <div class="detail-star" v-show="ready">
          <van-button round type="default" class="star-btn" :class="iconMode" @click="giveStar()">
            赞同 · {{articleInfo.starNum}}
          </van-button>
        </div>
        <div class="detail-comment" v-show="ready">
          <div class="comment-title">评论</div>
          <div class="comment-submit">
            <div class="text-area">
              <van-cell-group>
                <van-field
                  v-model="comment.content"
                  type="textarea"
                  placeholder="写下你的评论"
                  rows="5"
                />
              </van-cell-group>
            </div>
            <div class="submit-btn">
              <van-button type="primary" @click="submitArticleComment(comment)">提交</van-button>
              <van-button @click="cancelSubmit()">取消</van-button>
            </div>
          </div>
          <div class="comment-exist" v-if="commentList.length>0">
            <div class="total-comment">{{commentList.length}}条评论</div>
            <div class="comment-box" v-for="(item,index) in commentList" :key="index">
              <div class="comment-info">
                <div class="avatar">
                  <img @load="loadImage" src="../../../common/image/logo.png" alt="avatar">
                </div>
                <div class="other">
                  <div class="name">{{item.userName}}</div>
                  <div class="time">{{index +1 }}楼·{{item.createBy}}</div>
                </div>
              </div>
              <div class="comment-content">
                {{item.content}}
              </div>
              <div class="comment-operation">
                <div class="agree">
                  <i class="iconfont icon-thumbup"></i>
                  赞
                </div>
                <div class="reply">
                  <i class="iconfont icon-message"></i>
                  回复
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import {getArticleById} from 'api/article'
  import {submitComment, getComment} from "api/comment";
  import {starById, starForId} from "api/star";
  import {ERR_OK} from "common/js/config";
  import {strTrim} from "common/js/util";
  import Scroll from 'base/scroll/scroll'
  import ArticleContent from 'base/article-content/article-content'

  export default {
    data() {
      return {
        articleContent: '',
        comment: {
          content: "",
          userId: 0
        },
        commentList: [],
        //0:从未点赞，1：点赞，2：点赞过但取消了
        starInfo: 0,
        ready: false
      }
    },
    created() {
      this.initArticleContent()
      this.initArticleComment()
      this.userIdAssignment()
      this.getStar()
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    watch: {
      '$route'(to, from) {
        this.initArticleContent()
        this.initArticleComment()
        this.userIdAssignment()
        this.getStar()
      }
    },
    computed: {
      ...mapGetters([
        'articleInfo',
        'userInfo',
      ]),
      iconMode() {
        if (this.starInfo === 1) {
          return 'star-btn-like'
        } else {
          return 'star-btn-default'
        }
      }
    },
    methods: {
      ...mapMutations({
        setArticleInfo: 'SET_ARTICLE_INFO'
      }),
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      goBack() {
        this.$router.back()
      },

      //获取点赞详情
      getStar() {
        starById(this.articleInfo.id, this.comment.userId).then((res) => {
          if (res.code === ERR_OK) {
            this.starInfo = res.data.starInfo
          }
        })
      },
      //点赞
      giveStar() {
        //先判断是否登陆
        if (this.comment.userId === 0) {
          this.$dialog.confirm({
            title: '提示',
            message: '登陆后才能点赞，是否登陆',
            confirmButtonText: '去登陆'
          }).then(() => {
            this.$router.push('/m/login')
          }).catch(() => {

          });
          return
        }
        starForId(this.articleInfo.id, this.comment.userId, this.starInfo).then((res) => {
          if (res.code === ERR_OK) {
            this.starInfo = res.data.starInfo
            this.changeStarNum(this.starInfo)
          }
        })
      },
      changeStarNum(starInfo) {
        switch (starInfo) {
          case 1:
            this.articleInfo.starNum = this.articleInfo.starNum + 1
            break
          case 2:
            this.articleInfo.starNum = this.articleInfo.starNum - 1
            break
          default:
            break
        }
        this.setArticleInfo(this.articleInfo)
      },
      //取消评论
      cancelSubmit() {
        this.comment.content = ''
      },
      //提交评论
      submitArticleComment(comment) {
        comment.content = strTrim(comment.content)
        //先判断是否登陆
        //如果没登陆
        if (comment.userId === 0) {
          this.$dialog.confirm({
            title: '提示',
            message: '登陆后才能发表评论，是否登陆',
            confirmButtonText: '去登陆'
          }).then(() => {
            this.$router.push('/m/login')
          }).catch(() => {

          });
          return
        }
        //登陆了，但是评论内容为空
        if (comment.content === '') {
          this.$dialog.alert({
            title: '提示',
            message: '评论内容不能为空'
          }).then(() => {
            // on close
          });
          this.comment.content = ''
          return
        }
        //符合要求
        submitComment(this.articleInfo.id, comment).then((res) => {
          if (res.code === ERR_OK) {
            this.commentList = this.commentList.concat(res.data.articleComment)
            this.comment.content = ''
          }
        })
      },
      //判断是否登陆
      userIdAssignment() {
        if (this.userInfo.id) {
          this.comment.userId = this.userInfo.id
        } else {
          this.comment.userId = 0
        }
      },

      //初始化评论
      initArticleComment() {
        this.commentList = []
        getComment(this.articleInfo.id).then((res) => {
          if (res.code === ERR_OK) {
            if (res.data.articleCommentList === '') {
              return
            } else {
              this.commentList = res.data.articleCommentList
            }
          }
        })
      },
      //初始化文章正文
      initArticleContent() {
        this.ready = false
        this.articleContent = ''
        getArticleById(this.articleInfo.id).then((res) => {
          if (res.code === ERR_OK) {
            this.articleContent = res.data.articleContent.articleContent
            this.ready = true
          }
        })
      }
    },
    components: {
      Scroll,
      ArticleContent,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-m-article-detail
    position fixed
    top 0
    bottom 0
    height 100%
    width 100%
    z-index 400
    overflo hidden
    background-color $color-background-global
    .tbe-m-detail-container
      position fixed
      top 50px
      bottom 0
      left 0
      right 0
      .container-header
        padding 10px
        display flex
        flex-direction column
        border-bottom 0.5px solid $color-line-white
        .title
          width 100%
          font-size $font-size-23px
          font-weight bold
          line-height 30px
        .author
          width 100%
          margin 15px 0
          display flex
          .avatar
            width 35px
            height 35px
            border-radius 50%
            padding 2.5px
            box-shadow: 0 0 20px 1px $color-text-gray-l
            img
              border-radius 50%
              width 100%
          .name
            max-width 70%
            margin-left 10px
            height 40px
            line-height 40px
            color $color-text-black-l
            no-wrap()
        .other-info
          display flex
          font-size $font-size-13px
          color $color-text-gray
          div
            margin 0 5px
          .icon-article
            font-size $font-size-13px
      .detail-article-content
        padding 10px
      .detail-star
        align-items center
        text-align center
        width 100%
        margin 20px auto
        .star-btn-default
          background-color $color-background-global
          color $color-background-orange;
          border 1px solid $color-background-orange
        .star-btn-like
          background-color $color-background-orange
          color $color-text-white
          border 1px solid $color-background-orange
      .detail-comment
        display flex
        flex-direction column
        padding-bottom 10px
        .comment-title
          flex 1
          height 100%
          margin-bottom 20px
          font-size $font-size-17px
          font-weight bold
          color $color-text-black-l
          padding-left 10px
        .comment-submit
          width 100%
          height 100%
          flex 1
          .submit-btn
            float right
            padding-top 10px
            .van-button
              border-radius 5px
            .van-button--primary
              background-color $color-button-blue
              border $color-button-blue
        .comment-exist
          height 100%
          flex 1
          margin 10px 0
          background-color $color-background-gray
          .total-comment
            height 60px
            line-height 60px
            font-size $font-size-15px
            padding-left 10px
            background-color $color-background-global
            color $color-text-black-l
          .comment-box
            padding 10px
            display flex
            flex-direction column
            margin-top 10px
            background-color $color-background-global
            .comment-info
              flex 1
              display flex
              flex row
              padding 15px 0
              color $color-text-black-l
              border-bottom 0.5px solid $color-line-white
              .avatar
                margin-right 10px
                border-radius 50%
                padding 2px
                box-shadow: 0 0 20px 1px $color-text-gray-l
                img
                  width 40px
                  height 40px
                  border-radius 50%
              .other
                height 40px
                .name
                  font-size $font-size-14px
                  height 25px
                  line-height 25px
                .time
                  font-size $font-size-12px
                  height 15px
                  line-height 15px
            .comment-content
              flex 1
              font-size $font-size-15px
              padding 20px 0
            .comment-operation
              flex 1
              display flex
              max-width 250px
              margin 10px 0
              font-size $font-size-12px
              color $color-text-gray-d
              .iconfont
                font-size $font-size-14px
                color $color-text-gray-d
              .agree
                flex 1
              .reply
                flex 1
</style>
