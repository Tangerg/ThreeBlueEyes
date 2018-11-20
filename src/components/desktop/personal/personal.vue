<template>
  <div class="tbe-d-personal">
    <div class="personal-container">
      <div class="container-left">
        <div class="user-basic-info">
          <div class="user-basic-l">
            <div class="user-info">
              <div class="avatar">
                <img src="../../../common/image/logo.png" alt="avatar">
              </div>
              <div class="other">
                <div class="name">{{userInfo.userName}}</div>
                <div class="info">个人简介个人简介</div>
              </div>
            </div>
          </div>
          <div class="user-basic-r">
            <div class="login-out" @click="loginOut()">
              <i class="iconfont icon-loginout"></i>
              <span class="out">退出登录</span>
            </div>
          </div>
        </div>
        <el-tabs type="card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-document"></i> 文章</span>
            暂无文章
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-bell"></i> 动态</span>
            暂无动态
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-star-off"></i> 收藏</span>
            暂无收藏
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-edit-outline"></i> 最新评论</span>
            暂无评论
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="container-right">
        <ul class="items">
          <li class="item">
            <div class="content">
              <span class="title">我喜欢的</span>
            </div>
          </li>
          <li class="item">
            <div class="content">
              <span class="title">我的关注</span>
            </div>
          </li>
          <li class="item">
            <div class="content">
              <span class="title">我的专题</span>
            </div>
          </li>
          <li class="item">
            <div class="content">
              <span class="title">访问历史</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },
    methods: {
      ...mapActions([
        'deleteUser'
      ]),
      ...mapMutations({
        setActiveIndex: 'SET_ACTIVE_INDEX'
      }),
      loginOut() {

        this.$confirm('是否退出登陆?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setActiveIndex('1')
          let i = setTimeout(() => {
            this.deleteUser()
            this.$message({
              type: 'success',
              message: '退出成功!',
              duration: 500
            });
            this.$router.push('/d/index')
            clearTimeout(i);
          }, 500);
        }).catch(() => {
        });
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-d-personal
    position relative
    width 100%
    height 100%
    display flex
    background-color $color-background-global
    .personal-container
      margin 20px auto
      width 1200px
      height 100%
      .container-left
        display inline-block
        width 800px
        min-height 100%
        box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
        .user-basic-info
          width 800px
          display flex
          .user-basic-l
            width 650px
            display flex
            .user-info
              flex 1
              display flex
              padding 20px
              .avatar
                border-radius 50%
                padding 2px
                box-shadow: 0 0 20px 1px $color-text-gray-l
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
                .info
                  height 20px
                  line-height 20px
          .user-basic-r
            width 150px
            .login-out
              margin 20px
              text-align center
              height 50px
              line-height 50px
              &:hover
                background-color $color-background-gray
                cursor pointer
              .iconfont
                font-size $font-size-20px
      .container-right
        display inline-block
        width 380px
        float right
        margin-left 20px
        box-shadow 0 15px 50px 0 rgba(0, 34, 77, .08)
        background-color $color-text-white
        .items
          display flex
          flex-direction column
          .item
            margin-top 20px
            background-color $color-text-white-d
            border-left 10px solid $color-text-blue
            .content
              height 50px
              line-height 50px
              margin-left 10px

</style>
