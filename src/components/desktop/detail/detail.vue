<template>
    <div class="tbe-article-detail">
      <el-button
        class="tbe-back"
        type="primary"
        icon="el-icon-back"
        circle
        @click="goBack()">
      </el-button>
      <div class="detail-container">
        <div class="container-header">
          <div class="article-info">
          <div class="article-info-title">
            {{articleInfo.title}}
          </div>
          <div class="article-info-author">
            {{articleInfo.author}} 发表于 {{articleInfo.createBy}}
          </div>
          <div class="article-info-other">
            <div class="view">
              浏览
              {{articleInfo.viewNum}}
            </div>
            <div class="comment">
              评论
              {{articleInfo.commentNum}}
            </div>
            <div class="star">
              赞同
              {{articleInfo.starNum}}
            </div>
          </div>
        </div>
        </div>
        <div class="container-body">
          <div class="detail-article-content">
            <article-content :article="articleContent"></article-content>
          </div>
          <div class="detail-star">
            <el-button round class="star-btn" :class="iconMode" @click="giveStar()">
              赞同 · {{articleInfo.starNum}}
            </el-button>
          </div>
          <div class="detail-comment">
            <div class="comment-title">评论</div>
            <div class="comment-submit">
              <div class="text-area">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8}"
                  v-model="comment.content"
                  placeholder="写下你的评论"
                >
                </el-input>
              </div>
              <div class="submit-btn">
                <el-button type="primary" @click="submitArticleComment(comment)">提交</el-button>
                <el-button @click="cancelSubmit()">取消</el-button>
              </div>
            </div>
            <div class="comment-exist" v-if="commentList.length>0">
              <div class="total-comment">{{commentList.length}}条评论</div>
              <div class="comment-box" v-for="(item,index) in commentList" :key="index">
                <div class="comment-info">
                  <div class="avatar">
                    <img src="./logo.png" alt="">
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
      </div>
      <back-top></back-top>
    </div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
  import {getArticleById} from 'api/article'
  import {submitComment,getComment} from "api/comment";
  import {starById,starForId} from "api/star";
  import {ERR_OK} from "common/js/config";
  import {strTrim} from "common/js/util";
  import ArticleContent from 'desktop/article-content/article-content'
  import BackTop from 'base/back-top/back-top'
  export default {
    data(){
      return{
        articleContent:'',
        comment:{
          content: "",
          userId: 0
        },
        commentList: [],
        //0:从未点赞，1：点赞，2：点赞过但取消了
        starInfo:0
      }
    },
    created(){
      this.initArticleContent()
      this.initArticleComment()
      this.userIdAssignment()
      this.getStar()
    },
    computed:{
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
    methods:{
      ...mapMutations({
        setArticleInfo:'SET_ARTICLE_INFO'
      }),

      goBack(){
        this.$router.back()
      },

      //获取点赞详情
      getStar(){
        starById(this.articleInfo.id,this.comment.userId).then((res)=>{
          if(res.code === ERR_OK){
            this.starInfo = res.data.starInfo
          }
        })
      },
      //点赞
      giveStar(){
        //先判断是否登陆
        if(this.comment.userId === 0){
          this.$confirm('登陆后才能点赞，是否登陆', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/d/login')
          }).catch(() => {
          })
          return
        }
        starForId(this.articleInfo.id,this.comment.userId,this.starInfo).then((res)=>{
          if (res.code === ERR_OK){
            this.starInfo = res.data.starInfo
            this.changeStarNum(this.starInfo)
          }
        })
      },
      changeStarNum(starInfo){
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
      cancelSubmit(){
        this.comment.content = ''
      },
      //提交评论
      submitArticleComment(comment){
        comment.content = strTrim(comment.content)
        //先判断是否登陆
        //如果没登陆
        if(comment.userId === 0){
          this.$confirm('登陆后才能发表评论，是否登陆', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/d/login')
          }).catch(() => {
          })
          return
        }
        //登陆了，但是评论内容为空
        if(comment.content === ''){
          this.$message({
            message: '评论内容不能为空',
            type: 'error'
          })
          this.comment.content = ''
          return
        }
        //符合要求
        submitComment(this.articleInfo.id,comment).then((res)=>{
          if(res.code === ERR_OK){
            this.commentList = this.commentList.concat(res.data.articleComment)
            this.comment.content = ''
          }
        })
      },
      //判断是否登陆
      userIdAssignment(){
        if (this.userInfo.id) {
          this.comment.userId = this.userInfo.id
        }else{
          this.comment.userId = 0
        }
      },

      //初始化评论
      initArticleComment(){
        getComment(this.articleInfo.id).then((res)=>{
          if(res.code === ERR_OK){
            if(res.data.articleCommentList === '' ){
              this.commentList = []
            }else{
              this.commentList = res.data.articleCommentList
            }
          }
        })
      },
      //初始化文章正文
      initArticleContent(){
        getArticleById(this.articleInfo.id).then((res)=>{
          if(res.code === ERR_OK){
            this.articleContent = res.data.articleContent.articleContent
          }
        })
      }
    },
    components:{
      ArticleContent,
      BackTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-article-detail
    position absolute
    top 0
    left 0
    width 100%
    min-height 100%
    z-index 200
    background-color white
    .tbe-back
      position fixed
      top 50px
      left 50px
      height 50px
      width 50px
      font-size 15px
      z-index 201
      background rgba(21,35,51,.2)
      color rgba(255, 255, 255, 1)
      border 0
      &:hover
        background rgba(21,35,51,0.4)
    .detail-container
      position absolute
      top 0
      left 0
      width 100%
      min-height 100%
      .container-header
        background-color white
        padding 100px 0
        .article-info
          width 1100px
          margin 0 auto
          display flex
          flex-direction column
          text-align center
          .article-info-title
            width 100%
            font-size $font-size-40px
            margin-bottom 30px
          .article-info-author
            width 100%
            font-size $font-size-17px
            margin-bottom 30px
          .article-info-other
            width 300px
            margin 0 auto
            display flex
            flex-direction row
            font-size $font-size-15px
            color $color-text-gray
            .view
              flex 1
            .comment
              flex 1
            .star
              flex 1
      .container-body
        background-color #f4f4f4;
        padding 100px 0
        display flex
        flex-direction column
        .detail-article-content
          flex 1
          width 1100px
          margin 0 auto
        .detail-star
          flex 1
          align-items center
          text-align center
          width 1100px
          margin 100px auto
          .star-btn
            height 50px
            border-radius 100px
            font-size 17px
          .star-btn-default
            background-color $color-background-global
            color $color-background-orange;
            border 1px solid $color-background-orange
          .star-btn-like
            background-color $color-background-orange
            color $color-text-white
            border 1px solid $color-background-orange
        .detail-comment
          flex 1
          width 1100px
          height 100%
          margin 0 auto
          display flex
          flex-direction column
          .comment-title
            flex 1
            height 100%
            margin-bottom 20px
            font-size $font-size-20px
          .comment-submit
            width 100%
            height 100%
            flex 1
            .submit-btn
              float right
              padding-top 20px
          .comment-exist
            height 100%
            flex 1
            width 100%
            margin-top 20px
            .total-comment
              padding 20px 0
            .comment-box
              width 100%
              padding 5px
              display flex
              flex-direction column
              border-top  0.5px solid $color-line-gray
              .comment-info
                flex 1
                display flex
                flex row
                margin-top 15px
                .avatar
                  margin-right 10px
                  img
                    width 50px
                    height 50px
                    border-radius 50%
                .other
                  height 50px
                  .name
                    height 30px
                    line-height 30px
                  .time
                    height 20px
                    line-height 20px
              .comment-content
                flex 1
                padding 20px 0
              .comment-operation
                flex 1
                display flex
                width 200px
                margin 10px 0
                font-size $font-size-15px
                color $color-text-gray
                .agree
                  flex 1
                .reply
                  flex 1
</style>
