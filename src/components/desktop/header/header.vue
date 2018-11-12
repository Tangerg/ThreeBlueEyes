<template>
  <div class="tbe-nav" :class="{white: '/d/index'===$route.path}">
    <el-row :gutter="50" >
      <el-col :span="5" class="nav-org">
        <div class="org-logo">
          三个蓝眼
        </div>
      </el-col>
      <el-col :span="15">
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          text-color="#000000"
          :class="{white: '/d/index'===$route.path}"
          background-color="transparent"
          >
          <el-menu-item class="nav-menu-item" index="1" @click="goTo('/d/index')">
              首页
          </el-menu-item>
          <el-menu-item class="nav-menu-item" index="2" @click="goTo('/d/explore')">
            发现
          </el-menu-item>
          <el-menu-item class="nav-menu-item" index="3" @click="goTo('/d/music')">
            音乐
          </el-menu-item>
          <el-menu-item class="nav-menu-item" index="4" @click="goTo('/d/personal')">
            我的
          </el-menu-item>
          <el-menu-item class="nav-menu-item" index="5" @click="goTo('/d/about')">
            关于
          </el-menu-item>

        </el-menu>

      </el-col>
      <el-col :span="4" class="nav-login">
        <div class="user-info" v-if="this.userInfo.userName">
          <div class="user-name" @click="loginOut()">{{this.userInfo.userName}}</div>
        </div>
        <div class="login-sign" v-if="!this.userInfo.userName">
          <span class="login" @click="goTo('/d/login')">登陆</span>
          <div>|</div>
          <span class="sign" @click="goTo('/d/sign')">注册</span>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    computed:{
      ...mapGetters([
        'userInfo',
      ]),
    },
    methods: {
      ...mapActions([
        'deleteUser'
      ]),
      loginOut(){
        this.deleteUser()
      },
      goTo (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-nav
    position relative
    margin 0 auto
    width 1500px
    z-index 100
    &.white
      color $color-text-white
    .nav-org
      .org-logo
        float right
        height 60px
        line-height 60px
        background-size contain
        font-size $font-size-25px
        font-weight bold
        text-shadow none
        border 0
        cursor pointer
    .nav-menu
      border 0 !important
      .nav-menu-item
        padding 0 25px
        font-size $font-size-15px
      &.white
        .nav-menu-item
          color $color-text-white !important
    .nav-login
      .user-info
        width auto
        height 60px
        line-height 60px
        font-size $font-size-15px
        display flex
        align-items center
        .user-name
          padding 0 20px
      .login-sign
        width 100px
        height 60px
        line-height 60px
        font-size $font-size-15px
        display flex
        justify-content space-between
        span
          cursor pointer
        .login
          &:hover
            color $color-href-green
        .sign
          &:hover
            color $color-href-green
</style>
