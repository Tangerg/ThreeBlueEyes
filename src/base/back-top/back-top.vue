<template>
  <div class="back-top">
    <el-button
      class="btn"
      type="primary"
      circle
      @click="toTop()">
      <i class="iconfont icon-top"></i>
    </el-button>

  </div>
</template>

<script>
  export default {
    name: 'scroll-top',
    props: {
      toBottom: {
        type: Number,
        default: 0
      }
    },
    methods: {
      toTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    },
    /*mounted() {
      document.querySelector('.scrollTop').style.bottom = this.toBottom;
    }*/
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .back-top
    position fixed
    bottom 50px
    right 50px
    z-index 201
    .btn
      width 50px
      height 50px
      border-radius 50%
      background-color wheat
      border 0
      color red
      text-align center
</style>
