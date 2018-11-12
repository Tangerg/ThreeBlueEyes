<template>
  <div class="tbe-about">
    <div class="about-container">
      <div class="base-container">
        <h1 class="title">关于团队</h1>
        <p class="introduce">
          {{introduce}}
        </p>
        <div class="team">
          <div class="member" v-for="(item,index) in member" :key="index">
            <div class="avatar">
              <img :src="item.avatar" alt="头像">
            </div>
            <div class="text">
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div>
              <div class="creed">{{item.creed}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="base-container">
        <div class="title">联系我们</div>
        <div class="map">
          <img src="./map.png" alt="地图">
        </div>
        <div class="address">
          <p>三个蓝眼(四川理工学院)&nbsp;</p>
          <p>地址:四川省自贡市汇兴路学苑街180号&nbsp;</p>
          <p>电话:888 8888 8888&nbsp;</p>
          <p>传真:888 8888 8888&nbsp;</p>
          <p>邮箱:Tangerg@gmail.com</p>
        </div>
      </div>
      <div class="base-container">
        <div class="title">
          在线留言
          <div class="subtitle">告诉我们您的建议或遇到的问题</div>
        </div>
        <div class="form">
          <div class="input-box">
            <el-input
              class="input-info"
              placeholder="请输入您的称呼"
              v-model="feedBack.name"
              clearable>
            </el-input>
            <el-input
              class="input-info"
              placeholder="请输入您的邮箱"
              v-model="feedBack.email"
              clearable>
            </el-input>
          </div>
          <div class="text-area">
            <el-input
              type="textarea"
              rows="11"
              v-model="feedBack.content"
              placeholder="请输入您的留言内容"
              >
            </el-input>
          </div>
          <div class="submit-btn">
            <el-button type="primary" class="submit" @click="submitFeedBack(feedBack)">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {feedBack} from "@/api/comment";
  import {ERR_OK} from "common/js/config";
  import {strTrim} from "common/js/util";

  export default {
    data(){
      return{
        introduce:'三个蓝眼团队成员不光在技术上处于行业前端，我们更注重将客户的产品表达的清楚与准确，我们大多是理科出身，在机械、游戏、电子、物理等各学科我们都有研究，能轻松理解客户的构思，所以我们能更好的将客户的意图表现出来。我们拥有自己的专业三维动画、建筑动画、虚拟现实和影视拍摄制作团队。我们不断创新与提高三维动画、建筑动画、虚拟现实的制作水准，运用尖端的三维动画技术、虚拟现实技术，不断满足客户对数字体验服务的需求。',
        member:[
          {
            'avatar':'http://img.zcool.cn/zcool-diy/ib96bd9e17ba0100b2d4d72aff0adf2072.jpg',
            'name':'Tangerg',
            'position':'三个蓝眼 站长',
            'creed':'当人们的空间被各种物质挤压的时候，也就失去了本质，我们要去掉一切虚假的、表面的、无用的东西，而剩下真实的、本质的、必不可少的东西，因而得到更多的空间、更多的舒适、更多的效率、更多的美……'
          },
          {
            'avatar':'http://img.zcool.cn/zcool-diy/ibf35ac522fe227768e095ce990d7ffae6.jpg',
            'name':'Hao·Zhang',
            'position':'三个蓝眼 副站长',
            'creed':'眼高手低主要是由于见识太少，声名显赫主要是由于厚积薄发,切忌浮躁'
          },
          {
            'avatar':'http://img.zcool.cn/zcool-diy/ib9898d396db9cd4587c0f2c53ba2ee20c.jpg',
            'name':'Yun·Chuan',
            'position':'三个蓝眼 副站长',
            'creed':'不要趟在以前的成绩上沾沾自喜，要不断学习和进步，要谦虚，因为硬盘是会坏的，网络是会断的'
          }
        ],
        feedBack:{
          name:'',
          email:'',
          content:''
        }
      }
    },
    methods:{
      submitFeedBack(feedback){
        //首先去掉输入内容首尾的空格
        feedback.name = strTrim(feedback.name)
        feedback.email = strTrim(feedback.email)
        feedback.content = strTrim(feedback.content)
        //检查输入内容是否为空
        if(feedback.name === ''){
          this.$message({
            message: '姓名不能为空',
            type: 'error'
          })
          this.feedBack.name = ''
          return
        }
        if(feedback.email === ''){
          this.$message({
            message: '邮箱不能为空',
            type: 'error'
          })
          this.feedBack.email = ''
          return
        }
        if(feedback.content === ''){
          this.$message({
            message: '留言不能为空',
            type: 'error'
          })
          return
        }
        //检查邮箱格式是否正确
        let emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        if(!emailReg.test(feedback.email)){
          this.$message({
            message: '邮箱格式不正确,请重新输入',
            type: 'error'
          })
          this.feedBack.email = ''
          return
        }
        //若上述条件都不能满足则可以提交留言到后台
       feedBack(feedback).then( (res) => {
           if(res.code === ERR_OK){
             this.$message({
               message: '提交成功',
               type: 'success'
             })
             this.feedBack.name = ''
             this.feedBack.email = ''
             this.feedBack.content = ''
           }else {
             this.$message({
               message: '发生未知错误，请稍后重试',
               type: 'error'
             })
         }
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .tbe-about
    position absolute
    width 100%
    min-height 100%
    background-color $color-background-gray
    .about-container
      width 1000px
      margin 0 auto
      display flex
      flex-direction column
      align-items center
      box-shadow 0 15px 50px 0 rgba(0,34,77,.08)
      background-color $color-background-global
      .base-container
        flex 1
        width 800px
        padding-bottom 70px
        text-align center
        border-bottom  0.5px solid $color-line-gray
        .title
          margin 70px auto
          font-size $font-size-27px
          .subtitle
            margin-top 15px
            font-size $font-size-14px
            color $color-text-black-l
        .introduce
          width 100%
          text-align left
          line-height 25px
          font-size $font-size-14px
          color $color-text-black-l
        .team
          margin-top 40px
          width 100%
          text-align left
          display flex
          flex-direction column
          .member
            margin 10px auto
            display flex
            flex-direction row
            .avatar
              position relative
              width 165px
              height 220px
              overflow hidden
              border-radius 1px
              img
                position relative
                width 100%
                height 100%
            .text
              display flex
              flex-direction column
              width 500px
              margin-left 20px
              padding 20px
              font-family $font-family-Microsoft-YaHei
              .name
                font-size $font-size-22px
                color $color-text-black
                margin 5px 0
              .position
                font-size $font-size-14px
                color $color-text-black-l
                margin 5px 0
              .creed
                font-size $font-size-14px
                color $color-text-black
                line-height 25px
                margin-top 30px
        .map
          width 100%
          img
            position relative
            width 100%
        .address
          margin-top 50px
          width 100%
          position relative
          display flex
          flex-direction column
          align-items center
          p
            line-height 25px
            font-size $font-size-14px
            color $color-text-black-l
            width 100%
            text-align left
        .form
          width 100%
          display flex
          flex-direction column
          .input-box
            display flex
            flex-direction row
            .input-info
              margin 0 10px
          .text-area
            margin 30px 10px
        .submit-btn
          margin-top 10px
          .submit
            width 20%
</style>
