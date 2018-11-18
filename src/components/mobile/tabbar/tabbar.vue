<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home" @click="goTo('/m/index')">发现</van-tabbar-item>
    <van-tabbar-item icon="play" @click="goTo('/m/music')">音乐</van-tabbar-item>
    <van-tabbar-item icon="contact" @click="goTo('/m/personal')">我的</van-tabbar-item>
    <van-tabbar-item icon="edit-data" @click="goTo('/m/about')">关于</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      }
    },
    methods: {
      goTo(path) {
        this.$router.push(path)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
