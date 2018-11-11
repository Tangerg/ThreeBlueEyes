<template>
  <div class="random-avatar">
    <canvas ref="myCanvas" width="100" height="100" style="border:1px solid #d3d3d3;">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>
</template>

<script>
  export default {
    name: "random-avatar",
    methods:{
      randomAvatar(){
        let c = this.$refs.myCanvas
        let ctx=c.getContext("2d");
        //把画笔定义成绿色，
        ctx.fillStyle="green";
        //在(40,0) 这个 地方 画下 长为10，宽也为10 的一个实心矩形
        ctx.fillRect(40,0,10,10);
      },
      getSymmetry(a, imgWidth, penSize){
        return imgWidth -a - penSize;
      },
      getRemodInt(alt) {

        return Math.floor(Math.random() * alt) + 1;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .random-avatar
    width 100%
    height 100%
</style>
