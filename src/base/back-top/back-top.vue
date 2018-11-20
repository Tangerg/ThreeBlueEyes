<template>
  <div class="scrollTop" v-show="showTop" @click="toTop">
    <el-button
      class="btn"
      type="primary"
      circle
    >
      <i class="iconfont icon-top"></i>
    </el-button>
  </div>
</template>
<script>
  export default {
    name: 'scroll-top',
    data() {
      return {
        scrollTop: 0,
        time: 0,
        dParams: 20,
        scrollState: 0
      }
    },
    computed: {
      showTop: function () {
        return this.scrollTop > 400 ? true : false;
      },
    },
    mounted() {
      window.addEventListener('scroll', this.getScrollTop);
    },
    methods: {
      toTop(e) {
        if (!!this.scrollState) {
          return;
        }
        this.scrollState = 1;
        e.preventDefault();
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let _this = this;
        this.time = setInterval(function () {
          _this.gotoTop(_this.scrollTop - _this.dParams)
        }, 10);
      },
      gotoTop(distance) {
        this.dParams += 20;
        distance = distance > 0 ? distance : 0;
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
        if (this.scrollTop < 10) {
          clearInterval(this.time);
          this.dParams = 20;
          this.scrollState = 0;
        }
      },
      getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
    },

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .scrollTop
    position fixed
    bottom 50px
    right 50px
    z-index 900
    .btn
      width 50px
      height 50px
      border-radius 50%
      background-color #005792
      border 0
      color white
      text-align center
</style>
