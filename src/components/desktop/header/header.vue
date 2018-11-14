<template>
  <div class="tbe-header" :class="{white: '/d/index'===$route.path}">
    <div class="tbe-nav">
      <el-row :gutter="50">
        <el-col :span="5" class="nav-org">
          <div class="org-logo">
            三个蓝眼
          </div>
        </el-col>
        <el-col :span="15">
          <el-menu
            :default-active="this.activeIndex"
            class="nav-menu"
            mode="horizontal"
            text-color="#000000"
            :class="{white: '/d/index'===$route.path}"
            background-color="transparent"
          >
            <el-menu-item class="nav-menu-item" index="1" @click="goToWithIndex('/d/index','1')">
              首页
            </el-menu-item>
            <el-menu-item class="nav-menu-item" index="2" @click="goToWithIndex('/d/explore','2')">
              发现
            </el-menu-item>
            <el-menu-item class="nav-menu-item" index="3" @click="goToWithIndex('/d/music','3')">
              音乐
            </el-menu-item>
            <el-menu-item class="nav-menu-item" index="4" @click="personal()">
              我的
            </el-menu-item>
            <el-menu-item class="nav-menu-item" index="5" @click="goToWithIndex('/d/about','5')">
              关于
            </el-menu-item>

          </el-menu>

        </el-col>
        <el-col :span="4" class="nav-login">
          <div class="user-info" v-if="this.userInfo.userName">
            <div class="user-name">{{this.userInfo.userName}}</div>
          </div>
          <div class="login-sign" v-if="!this.userInfo.userName">
            <span class="login" @click="goTo('/d/login')">登陆</span>
            <div>|</div>
            <span class="sign" @click="goTo('/d/sign')">注册</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'activeIndex',
        'userInfo',
      ]),
    },
    methods: {
      ...mapMutations({
        setActiveIndex: 'SET_ACTIVE_INDEX'
      }),
      personal() {
        if (!this.userInfo.userName) {
          this.$confirm('您暂时还未登陆！', '提示', {
            confirmButtonText: '去登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.goTo('/d/login')
          }).catch(() => {
          });
        } else {
          this.setActiveIndex('4')
          this.goTo('/d/personal')
        }
      },
      goToWithIndex(path, index) {
        this.goTo(path)
        this.setActiveIndex(index)
      },
      goTo(path) {
        this.$router.push(path)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-header
    position fixed
    top 0
    left 0
    right 0
    z-index 100
    background-color $color-background-global
    box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
    &.white
      color $color-text-white
      background-color transparent
    .tbe-nav
      margin 0 auto
      width 1500px
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
