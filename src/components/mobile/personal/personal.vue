<template>
  <div class="tbe-m-personal">
    <div class="personal-top">
      <div class="personal-top-user">
        <div class="user-avatar">
          <i class="iconfont icon-contact"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="userInfo.userName">{{userInfo.userName}}</p>
          <p class="user-info-top" v-else @click="login()">登录/注册</p>
        </div>
      </div>
    </div>
    <div class="personal-info-data">
      <ul class="info-data-list">
        <li class="info-data">
        <span class="info-data-top">
          <span>
            0
          </span>
        </span>
          <span class="info-data-bottom">
          我的文章
        </span>
        </li>
        <li class="info-data">
        <span class="info-data-top">
          <span>
            0
          </span>
        </span>
          <span class="info-data-bottom">
         我的关注
        </span>
        </li>
        <li class="info-data">
        <span class="info-data-top">
          <span>
          0
          </span>
        </span>
          <span class="info-data-bottom">
          我的粉丝
        </span>
        </li>
      </ul>
    </div>
    <ul class="personal-other">
      <li class="other-info">
        <span>
          <i class="iconfont icon-like">
          </i>
        </span>
        <div class="other-info-div">
          <span>
           我喜欢的
          </span>
          <span class="other-info-icon">
            <i class="iconfont icon-iconfontqianjin-copy">
            </i>
          </span>
        </div>
      </li>
      <li class="other-info">
        <span>
          <i class="iconfont icon-folder">
          </i>
        </span>
        <div class="other-info-div">
          <span>
            我的收藏
          </span>
          <span class="other-info-icon">
            <i class="iconfont icon-iconfontqianjin-copy">
            </i>
          </span>
        </div>
      </li>
      <li class="other-info">
        <span>
          <i class="iconfont icon-weibiao45127">
          </i>
        </span>
        <div class="other-info-div">
          <span>
            我的专题
          </span>
          <span class="other-info-icon">
            <i class="iconfont icon-iconfontqianjin-copy">
            </i>
          </span>
        </div>
      </li>
      <li class="other-info">
        <span>
          <i class="iconfont icon-fingerprint">
          </i>
        </span>
        <div class="other-info-div">
          <span>
            服务中心
          </span>
          <span class="other-info-icon">
            <i class="iconfont icon-iconfontqianjin-copy">
            </i>
          </span>
        </div>
      </li>
    </ul>
    <van-button
      type="danger"
      class="login-out"
      v-if="userInfo.userName"
      @click="loginOut()"
    >退出登陆
    </van-button>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions([
        'deleteUser'
      ]),
      login() {
        this.$router.push('/m/login')
      },
      loginOut() {
        this.$dialog.confirm({
          title: '提示',
          message: '是否退出登陆'
        }).then(() => {
          this.deleteUser()
        }).catch(() => {

        });
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-m-personal
    width 100%
    height 100%
    overflow hidden
    .personal-top
      display flex
      .personal-top-user
        width 100%
        position relative
        display block
        background $color-text-blue
        padding 20px 10px
        .user-avatar
          float left
          width 60px
          height 60px
          border-radius 50%
          overflow hidden
          vertical-align top
          .icon-contact
            background $color-text-blue-3
            font-size 60px
        .user-info
          float left
          margin-left 15px
          height 60px
          line-height 60px
          p
            font-weight 700
            font-size $font-size-18px
            color $color-text-white
    .personal-info-data
      width 100%
      background #fff
      overflow hidden
      .info-data-list
        height 100%
        width 100%
        display flex
        border-bottom 0.5px solid $color-line-white
        .info-data
          flex 1
          text-align center
          border-right 0.5px solid $color-line-white
          .info-data-top
            display block
            width 100%
            padding 15px 5px 10px
            span
              display inline-block
              font-size $font-size-30px
              color $color-text-blue-l
              font-weight 700
              line-height 30px
          .info-data-bottom
            display inline-block
            font-size $font-size-14px
            color $color-text-black
            font-weight 400
            padding-bottom 10px
    .personal-other
      border-top 0.5px solid $color-line-white
      margin-top 10px
      background #fff
      .other-info
        display flex
        align-items center
        padding-left 15px
        > span
          display flex
          align-items center
          width 20px
          height 20px
          > .iconfont
            margin-left -10px
            font-size $font-size-20px
        .other-info-div
          width 100%
          border-bottom 0.5px solid $color-line-white
          padding 18px 10px 18px 0
          font-size $font-size-16px
          color $color-text-black
          display flex
          justify-content space-between
          span
            display block
          .other-info-icon
            width 10px
            height 10px
            .icon-iconfontqianjin-copy
              color $color-text-gray
              font-size $font-size-12px
    .login-out
      width 90%
      margin 20px 5%
      background-color $color-button-blue
      border 0
</style>
