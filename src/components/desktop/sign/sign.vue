<template>
    <div class="tbe-sign">
      <div class="sign-container">
        <div class="sign-wrapper">
          <div class="sign-header">
            <div class="org-logo" @click="goToWithIndex('/d/index','1')">Three Blue Eyes</div>
            <div class="sign-header-right">
              <span class="sign-hasAcc"></span>
              已有帐号？
              <span class="sign-toLogin" @click="goTo('/d/login')">登录</span>
            </div>
          </div>
          <div class="sign-body">
            <div class="sign-body-container">
              <div class="sign-intro">
                <span class="sign-intro-title">TBE</span>
                <span class="sign-intro-slogan">三个蓝眼,分享你的生活</span>
                <p class="sign-intro-desc">
                  {{this.introduce}}
                </p>
              </div>
              <div class="sign-box">
                <span class="sign-title">注册</span>
                <div class="group-inputs">
                  <div class="input-wrapper">
                    <input type="text" placeholder="用户名" v-model="user.userName">
                  </div>
                  <div class="input-wrapper">
                    <input type="password" placeholder="密码" v-model="user.passWorld">
                  </div>
                </div>
                <div class="button-wrapper">
                  <el-button
                    class="sign-button"
                    plain
                    @click="userSign(user)"
                    :disabled="disabled">
                    注册
                  </el-button>
                </div>
                <p class="agreement-tip">
                  注册即代表同意
                  <span>《三个蓝眼服务协议》</span>
                  <span>《隐私政策》</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapMutations,mapActions} from 'vuex'
  import {sign} from "api/user";
  import {ERR_OK} from "common/js/config";
  import {strTrim} from "common/js/util";
  export default {
    data(){
      return{
        introduce: '三个蓝眼是一个优质的，开放的，友好的音乐资讯社区，并励志为中国音乐发展打造最优质的学习交流环境。在这里，你可以找到许许多多和你一样兴趣爱好的人，每个人都可以自由的发现或者是分享作品。爱音乐，爱蓝眼！',
        disabled:false,
        user:{
          userName:'',
          passWorld:''
        }
      }
    },
    methods:{
      ...mapMutations({
        setActiveIndex:'SET_ACTIVE_INDEX'
      }),
      ...mapActions([
        'saveUser'
      ]),
      goToWithIndex(path,index){
        this.goTo(path)
        this.setActiveIndex(index)
      },
      goTo (path) {
        let i = setTimeout(() => {
          this.$router.replace(path)
          clearTimeout(i);
        }, 200);
      },
      userSign(user){
        //首先让按钮不能按
        this.disabled = true
        user.userName = strTrim(user.userName)
        user.passWorld = strTrim(user.passWorld)
        if(user.userName === ''){
          this.$message({
            message: '用户名不能为空',
            type: 'error'
          })
          this.user.userName =''
          this.disabled = false
          return
        }
        if(user.passWorld === ''){
          this.$message({
            message: '密码不能为空',
            type: 'error'
          })
          this.user.passWorld = ''
          this.disabled = false
          return
        }
        sign(user).then((res)=>{
          if(res.code === ERR_OK){
            this.saveUser(res.data.userInfo)
            //返回注册之前的页面
            this.$router.back()
            this.disabled = false
          }else{
            this.$message({
              message: res.data.errMsg,
              type: 'error'
            })
            this.disabled = false
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-sign
    z-index 200
    position absolute
    top 0
    left 0
    bottom 0
    width 100%
    background-color $color-background-global
    .sign-container
      position relative
      background-repeat no-repeat
      background-color $color-background-global
      background-size cover
      width 100%
      height 100%
      overflow hidden
      display flex
      flex-direction column
      align-items center
      border-radius 2px
      min-height 688px
      box-sizing border-box
      .sign-wrapper
        background-color $color-background-global
        margin 20px 30px
        display block
        .sign-header
          display flex
          flex-direction row
          justify-content space-between
          margin-top 20px
          width 100%
          .org-logo
            width 100px
            height 30px
            background-size contain
            font-size $font-size-30px
            color $color-text-blue
            text-shadow none
            border 0
            cursor pointer
          .sign-header-right
            line-height 30px
            color $color-text-gray
            .sign-hasAcc
              margin 0 16px
            .sign-toLogin
              line-height 30px
              color $color-text-blue
              cursor pointer
        .sign-body
          background-color white
          margin-top 120px
          text-align center
          .sign-body-container
            background-color $color-background-global
            display flex
            flex-direction row
            width 100%
            text-align left
            margin auto
            .sign-intro
              display flex
              flex-direction column
              margin-left 65px
              margin-top 35px
              width 390px
              text-align left
              .sign-intro-title
                line-height 50px
                font-size $font-size-42px
                font-weight bold
                color $color-text-black
                text-align left
              .sign-intro-slogan
                margin-top 10px
                line-height 25px
                font-size $font-size-22px
                font-weight 600
                color $color-text-black-l
                text-align left
              .sign-intro-desc
                margin-top 40px
                line-height 27px
                font-size $font-size-16px
                color $color-text-black-l
            .sign-box
              display flex
              align-self flex-start
              flex-direction column
              margin-left 90px
              border-radius 2px
              width 400px
              background $color-background-global
              box-shadow 0 15px 50px 0 rgba(0,34,77,.08)
              .sign-title
                margin 40px auto
                width 100%
                text-align center
                font-size $font-size-26px
                color $color-text-black-l
                font-weight 600
                line-height 37px
              .group-inputs
                border 0
                padding 0 23px
                border-radius 3px
                .input-wrapper
                  position relative
                  border 0
                  margin 0
                  overflow hidden
                  input
                    outline none
                    letter-spacing normal
                    word-spacing normal
                    text-transform none
                    text-indent 0
                    text-shadow none
                    display inline-block
                    text-align start
                    margin-top 12px
                    border 0
                    border-bottom 1px solid $color-line-white
                    padding 14px 0
                    width 100%
                    line-height 20px
                    font-size $font-size-14px
                    border-radius 0
                    box-shadow none
                    background #fff
                    &:focus
                      border-bottom 1px solid $color-text-blue-l
              .button-wrapper
                margin 32px 24px 28px
                height 36px
                button
                  margin 0
                .sign-button
                  width 100%
                  font-size $font-size-15px
              .agreement-tip
                margin 0
                text-align center
                border-radius 2px
                width 100%
                line-height 60px
                font-size $font-size-14px
                color $color-text-gray
                background $color-background-gray
                white-space nowrap
                span
                  color $color-text-blue
</style>
