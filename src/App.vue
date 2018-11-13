<template>
  <div id="app">
    <Desktop v-if="deviceFlag === 'desktop'">
    </Desktop>
    <Mobile v-if="deviceFlag === 'mobile'">
    </Mobile>
  </div>
</template>

<script>
  import Desktop from 'desktop/desktop'
  import Mobile from 'mobile/mobile'
export default {
  name: 'App',
  data() {
    return {
      deviceFlag:'desktop'
    }
  },
  created(){
    this.distinguishDevice()
  },
  methods: {
    //设备识别
    //如果是移动端则访问移动端否则桌面端
    distinguishDevice() {
      let userAgent = navigator.userAgent
      if(/Android/i.test(userAgent)){
        this.deviceFlag = 'mobile'
        this.$router.replace("/m")
      }else if(/iPhone/i.test(userAgent)){
        this.deviceFlag = 'mobile'
        this.$router.replace("/m")
      }else if(/iPod/i.test(userAgent)){
        this.deviceFlag = 'mobile'
        this.$router.replace("/m")
      }else if(/BlackBerry/i.test(userAgent)){
        this.deviceFlag = 'mobile'
        this.$router.replace("/m")
      }else if(/iPad/i.test(userAgent)){
        this.deviceFlag = 'mobile'
        this.$router.replace("/m")
      }else if(/iOS/i.test(userAgent)){
        this.deviceFlag = 'mobile'
        this.$router.replace("/m")
      }else{
        //https://browser.360.cn/se/
        //判断是否为ie，如果是则推荐下载360安全浏览器（chromium内核）
        if(!!window.ActiveXObject || "ActiveXObject" in window){
          this.$confirm('系统检测到您的上网环境不安全，请使用360安全浏览器来保障您的安全', '警告', {
            confirmButtonText: '前往下载',
            cancelButtonText: '不用了',
            type: 'error',
          }).then(() => {
            window.open('https://browser.360.cn/se/')
            window.opener=null;
            window.open('','_self');
            window.close();
          }).catch(() => {
            window.opener=null;
            window.open('','_self');
            window.close();
          })
        }else{
          this.deviceFlag = 'desktop'
          this.$router.replace("/d")
        }
      }
    }
  },
  components:{
    Desktop,
    Mobile
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/index.styl'
  @import "./common/stylus/variable.styl"
  body,html
    margin 0
    padding 0
    box-sizing border-box
    background $color-background-global
    user-select none
  #app
    width 100%
    min-height 100%
    display flex
    flex-direction row
</style>
