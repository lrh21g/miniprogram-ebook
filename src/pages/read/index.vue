<template>
  <Global>
    <div class="read">
      <web-view :src="readUrl"></web-view>
    </div>
  </Global>
</template>

<script>
  import Global from '@/components/Global'

  export default {
    components: {
      Global
    },
    computed: {
      readUrl () {
        if (this.fileName && this.opf) {
          let base = `https://www.youbaobao.xyz/book/#/ebook/${this.fileName}?opf=${this.opf}`
          if (this.navigation) {
            base = `${base}&navigation=${this.navigation}`
          }
          base = `${base}&isMp=true`
          console.log('url', base)
          return base
        } else {
          return ''
        }
      }
    },
    data () {
      return {
        fileName: null,
        opf: null,
        navigation: null
      }
    },
    mounted () {
      this.fileName = this.$route.query.fileName || ''
      this.opf = this.$route.query.opf || ''
      this.navigation = this.$route.query.navigation
    }
  }
</script>

<style lang="scss" scoped>
</style>
