<template>
  <transition name="van-fade">
    <div class="tbe-m-login-sign">
    <section class="login-container">
      <div class="login-inner">
        <div class="login-header">
          <h2 class="login-logo">三个蓝眼</h2>
          <div class="login-header-title">
            <a :class="{on: isLogin}" @click="switchLoginSign(1)">登陆</a>
            <a :class="{on: !isLogin}" @click="switchLoginSign(2)">注册</a>
          </div>
        </div>
        <div class="login-content">
          <form @submit.prevent="login">
            <div :class="{on: isLogin}">
              <section class="login-message">
                <input type="tel" placeholder="账号（123）" v-model="user.userName">
              </section>
              <section class="login-verification">
                <input type="password" placeholder="密码（321）" v-model="user.passWorld">
              </section>
            </div>
            <div :class="{on: !isLogin}">
              <section>
                <section class="login-message">
                  <input type="text" placeholder="手机/邮箱/用户名" v-model="user.userName">
                </section>
                <section class="login-verification">
                  <input type="password" placeholder="密码" v-model="user.passWorld">
                </section>
                <section class="login-hint">
                  注册即代表同意
                  <a>《三个蓝眼服务协议》</a>
                  <a>《隐私政策》</a>
                </section>
              </section>
            </div>
            <van-button
              :disabled="disabled"
              type="primary"
              class="login-sign"
              @click="userLoginOrSign(user)"
            >
              {{this.isLogin ? '登陆' : '注册'}}
            </van-button>
          </form>
          <a class="about-us">关于我们</a>
        </div>
        <a class="go-back" @click="$router.back()">
          <i class="iconfont icon-back"></i>
        </a>
      </div>
    </section>
  </div>
  </transition>
</template>

<script>
  import {mapMutations,mapActions} from 'vuex'
  import {sign} from "api/user";
  import {login} from "api/user";
  import {ERR_OK} from "common/js/config";
  import {strTrim} from "common/js/util";
  export default {
    data () {
      return {
        oldFlag:1,
        disabled:false,
        isLogin: true, // true代表登陆, false代表注册
        user:{
          userName:'',
          passWorld:''
        }
      }
    },
    methods:{
      ...mapActions([
        'saveUser'
      ]),
      //切换登陆注册框
      switchLoginSign(flag){
        if (flag === this.oldFlag) {
          return
        }else if(flag === 1){
          this.oldFlag = 1
          this.isLogin = true
          this.user.userName = ''
          this.user.passWorld = ''
        }else{
          this.oldFlag = 2
          this.isLogin = false
          this.user.userName = ''
          this.user.passWorld = ''
        }
      },
      userLoginOrSign(user) {
        //首先让按钮不能按
        this.disabled = true
        user.userName = strTrim(user.userName)
        user.passWorld = strTrim(user.passWorld)
        if (user.userName === '') {
          this.$dialog.alert({
            title: '提示',
            message: '用户名不能为空'
          }).then(() => {
            this.user.userName = ''
            this.disabled = false
          });
          return
        }
        if (user.passWorld === '') {
          this.$dialog.alert({
            title: '提示',
            message: '密码不能为空'
          }).then(() => {
            this.user.passWorld = ''
            this.disabled = false
          });
          return
        }
        if(this.isLogin){
          this.login(user)
        }else{
          this.sign(user)
        }
      },
      login(user){
        login(user).then((res) => {
          if (res.code === ERR_OK) {
            this.saveUser(res.data.userInfo)
            //返回登陆之前的页面
            this.$router.back()
            this.user.userName = ''
            this.user.passWorld = ''
            this.disabled = false
          } else {
            this.$dialog.alert({
              title: '提示',
              message: res.data.errMsg,
            }).then(() => {
              this.disabled = false
            });

          }
        })
      },
      sign(user){
        sign(user).then((res)=>{
          if(res.code === ERR_OK){
            this.saveUser(res.data.userInfo)
            //返回注册之前的页面
            this.$router.back()
            this.user.userName = ''
            this.user.passWorld = ''
            this.disabled = false
          }else{
            this.$dialog.alert({
              title: '提示',
              message: res.data.errMsg,
            }).then(() => {
              this.disabled = false
            });
          }
        })
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-m-login-sign
    position fixed
    top 0
    bottom 0
    height 100%
    width 100%
    z-index 200
    overflo hidden
    background-color $color-background-global
    .login-container
      width 100%
      height 100%
      .login-inner
        padding-top 60px
        width 80%
        margin 0 auto
        .login-header
          .login-logo
            font-size $font-size-40px
            font-weight bold
            color $color-text-blue
            text-align center
          .login-header-title
            padding-top 40px
            text-align center
            >a
              color $color-text-black-l
              font-size $font-size-14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color $color-text-blue
                font-weight 700
                border-bottom 2px solid $color-text-blue
        .login-content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid $color-line-gray
                border-radius 4px
                outline 0
                font 400 $font-size-14px Arial
                &:focus
                  border 1px solid $color-text-blue-l
              .login-message
                position relative
                margin-top 16px
                height 48px
                font-size $font-size-14px
                background $color-background-global
              .login-verification
                position relative
                margin-top 16px
                height 48px
                font-size $font-size-14px
                background #fff
              .login-hint
                margin-top 12px
                color $color-text-gray
                font-size $font-size-14px
                line-height 20px
                >a
                  color $color-button-blue
            .login-sign
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background $color-button-blue
              color #fff
              text-align center
              font-size $font-size-16px
              line-height 42px
              border 0
          .about-us
            display block
            font-size $font-size-12px
            margin-top 20px
            text-align center
            color $color-text-gray-d
        .go-back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size $font-size-20px
            color $color-text-gray
</style>
