<template>
    <div class="tbe-m-singer">
      <div class="title">万千歌手 尽在眼前</div>
      <div class="singer-category">
        <div class="base-category languages">
          <div class="category-label">语种：</div>
          <ul class="label-content">
            <li
              class="label-content-item"
              v-for="(item,index) in languages"
              :key="index"
              @click="selectLanguage(item.id)"
              :class="languageClass(item.id)"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="base-category category">
          <div class="category-label">分类：</div>
          <ul class="label-content">
            <li
              class="label-content-item"
              v-for="(item,index) in category"
              :key="index"
              @click="selectCategory(item.id)"
              :class="categoryClass(item.id)"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="base-category screen">
          <div class="category-label">筛选：</div>
          <ul class="label-content">
            <li
              class="label-content-item"
              @click="selectInitial('#')"
              :class="initialClass('#')"
            >
              热门
            </li>
            <li
              class="label-content-item"
              v-for="(item,index) in screen"
              :key="index"
              @click="selectInitial(item.name)"
              :class="initialClass(item.name)"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="singer-list">
        <ul  class="items">
          <li v-for="singer in singerDetail" :key="singer.id" class="item" @click="selectSinger(singer)">
            <div class="icon">
              <img :src="singer.avatar">
            </div>
            <div class="singer">
              <span class="singer-name">{{singer.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import {getSingerByName} from 'api/singer'
  import {ERR_OK} from "common/js/config";
  import {creatSinger} from 'common/class/singer'
  export default {
    data() {
      return {
        languages:[
          {
            id:1,
            name:'华语'
          },
          {
            id:2,
            name:'欧美'
          },
          {
            id:6,
            name:'日本'
          },
          {
            id:7,
            name:'韩国'
          },
          {
            id:4,
            name:'其他'
          },
        ],
        category:[
          {
            id:1,
            name:'男歌手'
          },
          {
            id:2,
            name:'女歌手'
          },
          {
            id:3,
            name:'乐队组合'
          },
        ],
        screen:[
          {
            name:'A'
          },
          {
            name:'B'
          },
          {
            name:'C'
          },
          {
            name:'D'
          },
          {
            name:'E'
          },
          {
            name:'F'
          },
          {
            name:'G'
          },
          {
            name:'H'
          },
          {
            name:'I'
          },
          {
            name:'J'
          },
          {
            name:'K'
          },
          {
            name:'L'
          },
          {
            name:'M'
          },
          {
            name:'N'
          },
          {
            name:'O'
          },
          {
            name:'P'
          },
          {
            name:'Q'
          },
          {
            name:'R'
          },
          {
            name:'S'
          },
          {
            name:'T'
          },
          {
            name:'U'
          },
          {
            name:'V'
          },
          {
            name:'W'
          },
          {
            name:'X'
          },
          {
            name:'Y'
          },
          {
            name:'Z'
          }
        ],
        languageCode:1000,
        typeCode:1,
        initial:'#',
        singerDetail:[]
      }
    },
    created (){
      this.getSingerList(this.computeNumber(),this.initial)
    },
    computed:{

    },
    methods:{
      ...mapMutations({
        setSingerInfo:'SET_SINGER_INFO'
      }),
      selectSinger(item){
        this.setSingerInfo(item)
        this.$router.push({
          path: `/d/music/singer/${item.id}`
        })
      },
      //给语种加样式
      languageClass(id){
        if(this.languageCode === id*1000){
          return 'active'
        }
      },
      //给分类加样式
      categoryClass(id){
        if(this.typeCode===id){
          return 'active'
        }
      },
      //给首字母加样式
      initialClass(initial){
        if(this.initial===initial){
          return 'active'
        }
      },
      //选择语种
      selectLanguage(id){
        this.computeLanguagesCode(id)
        this.getSingerList(this.computeNumber(),this.initial)
      },
      //选择分类
      selectCategory(id){
        this.computeCategoryCode(id)
        this.getSingerList(this.computeNumber(),this.initial)
      },
      //选择筛选
      selectInitial(initial){
        this.computeInitial(initial)
        this.getSingerList(this.computeNumber(),this.initial)
      },
      //语种+分类
      computeNumber(){
        return this.languageCode + this.typeCode

      },
      //计算分类
      computeCategoryCode(id){
        this.typeCode = 1 * id
      },
      //计算语种
      computeLanguagesCode(id){
        this.languageCode = 1000 * id
      },
      //计算歌手姓名首字母
      computeInitial(initial){
        this.initial = initial
      },
      //后台获取数据
      getSingerList(category,initial){
        if (!category){
          this.$router.push('/d/music')
          return
        }
        getSingerByName(category,initial).then((res) => {
          if(res.code === ERR_OK){
            this.singerDetail = res.artists.map((singer)=>{
              return creatSinger(singer)
            })
          }
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  @import "../../../../common/stylus/mixin"
  .tbe-m-singer
    position relative
    width 1200px
    margin 10px auto
    margin-bottom 50px
    min-height 100%
    display flex
    flex-direction column
    background-color $color-background-gray
    .title
      margin 40px auto
      font-size $font-size-35px
      font-weight bold
    .singer-category
      width 1200px
      font-size $font-size-20px
      display flex
      flex-direction column
      .base-category
        width 1200px
        margin 5px 0
        display flex
        .category-label
          margin 10px
          font-size $font-size-17px
        .label-content
          .label-content-item
            padding 10px
            display inline-block
            font-size $font-size-17px
            color $color-text-black-l
          .active
            background-color #30ff5a
            color white
    .singer-list
      width 100%
      .items
        .item
          padding 0 1%
          margin 20px 0
          display inline-block
          position relative
          box-sizing border-box
          width 20%
          .icon
            position relative
            display inline-block
            width 100%
            margin-bottom 5px
            img
              width 100%
              height 100%
          .singer
            display flex
            flex-direction column
            .singer-name
              text-align left
              text-overflow ellipsis
              overflow hidden
              white-space nowrap
              font-size $font-size-small
              font-weight bold
              color $color-text-black
</style>
