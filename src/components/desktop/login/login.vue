<template>
  <div class="tbe-d-login">
    <div class="login-container">
      <div class="login-container-content">
        <div class="login-header">
          <div class="login-logo" @click="goToWithIndex('/d/index','1')">TBE</div>
          <div class="login-header-slogen">三个蓝眼，分享你的生活
          </div>
        </div>
        <div class="login-container-inner">
          <div class="login-content">
            <div class="login-box">
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
                  class="login-button"
                  type="primary"
                  @click="userLogin(user)"
                  :disabled="disabled">
                  登陆
                </el-button>
              </div>
              <p class="agreement-tip">
                没有帐号？
                <span class="login-toSign" @click="goTo('/d/sign')">注册</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  import {login} from "api/user";
  import {ERR_OK} from "common/js/config";
  import {strTrim} from "common/js/util";

  export default {
    data() {
      return {
        disabled: false,
        user: {
          userName: '123',
          passWorld: '321'
        }
      }
    },
    methods: {
      ...mapMutations({
        setActiveIndex: 'SET_ACTIVE_INDEX'
      }),
      ...mapActions([
        'saveUser'
      ]),
      goToWithIndex(path, index) {
        this.goTo(path)
        this.setActiveIndex(index)
      },
      goTo(path) {
        let i = setTimeout(() => {
          this.$router.replace(path)
          clearTimeout(i);
        }, 200);
      },
      userLogin(user) {
        //首先让按钮不能按
        this.disabled = true
        user.userName = strTrim(user.userName)
        user.passWorld = strTrim(user.passWorld)
        if (user.userName === '') {
          this.$message({
            message: '用户名不能为空',
            type: 'error'
          })
          this.user.userName = ''
          this.disabled = false
          return
        }
        if (user.passWorld === '') {
          this.$message({
            message: '密码不能为空',
            type: 'error'
          })
          this.user.passWorld = ''
          this.disabled = false
          return
        }
        login(user).then((res) => {
          if (res.code === ERR_OK) {
            this.saveUser(res.data.userInfo)
            //返回登陆之前的页面
            this.$router.back()
            this.disabled = false
          } else {
            this.$message({
              message: res.data.errMsg,
              type: 'error'
            })
            this.disabled = false
          }
        })
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-d-login
    z-index 200
    position absolute
    top 0
    left 0
    bottom 0
    width 100%
    .login-container
      background-repeat no-repeat
      background-color $color-background-global
      background-size cover
      width 100%
      overflow hidden
      display flex
      flex-direction column
      align-items center
      justify-content center
      border-radius 2px
      min-height 688px
      box-sizing border-box
      .login-container-content
        margin 100px 0
        width 420px
        align-items center
        justify-content center
        border-radius 2px
        box-sizing border-box
        background $color-background-global
        box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
        .login-header
          padding-bottom 15px
          text-align center
          .login-logo
            margin 40px
            font-size $font-size-45px
            font-weight bold
            cursor pointer
          .login-header-slogen
            margin-top 15px
            color $color-text-blue
            font-size $font-size-23px
        .login-container-inner
          position relative
          .login-content
            .login-box
              display flex
              align-self flex-start
              flex-direction column
              border-radius 2px
              width 100%
              .group-inputs
                border 0
                padding 0 25px
                border-radius 3px
                .input-wrapper
                  position relative
                  border 0
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
                    background $color-background-global
                    &:focus
                      border-bottom 1px solid $color-text-blue-l
              .button-wrapper
                margin 50px 25px
                height 36px
                .login-button
                  width 100%
                  font-size $font-size-15px
              .agreement-tip
                margin 0
                text-align center
                border-radius 2px
                width 100%
                line-height 60px
                font-size $font-size-15px
                color $color-text-gray
                background $color-background-gray
                white-space nowrap
                .login-toSign
                  color $color-text-blue
                  cursor pointer
</style>
