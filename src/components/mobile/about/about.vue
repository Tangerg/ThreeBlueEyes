<template>
  <div class="tbe-m-about">
    <van-nav-bar
      title="关于我们"
    />
    <div class="about-container">
      <div class="org-logo">
        <div class="logo">TBE</div>
      </div>
      <van-collapse v-model="activeNames" class="collapse">
        <van-collapse-item title="简介" name="1" class="summary">
          {{this.introduce}}
        </van-collapse-item>
        <van-collapse-item title="关于团队" name="2" class="summary">
          {{this.team}}
        </van-collapse-item>
        <van-collapse-item title="联系我们" name="3" class="summary">
          <p>三个蓝眼(四川理工学院)&nbsp;</p>
          <p>地址:四川省自贡市汇兴路学苑街180号&nbsp;</p>
          <p>电话:888 8888 8888&nbsp;</p>
          <p>传真:888 8888 8888&nbsp;</p>
          <p>邮箱:Tangerg@gmail.com</p>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        introduce: '三个蓝眼是一个优质的，开放的，友好的音乐资讯社区，并励志为中国音乐发展打造最优质的学习交流环境。在这里，你可以找到许许多多和你一样兴趣爱好的人，每个人都可以自由的发现或者是分享作品。爱音乐，爱蓝眼！',
        team: ' 强大的团队并不是空有虚名，社区的今天缺少不了每一位核心成员的努力与贡献，是他们给我们带来了一个这么完美的平台！',
        activeNames: ['4']
      };
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tbe-m-about
    position relative
    .about-container
      width 100%
      height 100%
      .org-logo
        height 100px
        .logo
          color $color-text-blue
          margin 10px auto
          height 80px
          line-height 80px
          width 80px
          text-align center
          border-radius 5px
          box-shadow: 0 0 20px 1px $color-text-gray-l
      .collapse
        .summary
          font-size $font-size-13px
          color $color-text-black-l
</style>
