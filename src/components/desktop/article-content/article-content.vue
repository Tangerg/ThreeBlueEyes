<template>
  <div class="article-content" v-html="article">
  </div>
</template>

<script>
  export default {
    props: {
      article: {
        type: String,
        default: ''
      }
    },
    name: "article-content"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-content
    width 100%
</style>
