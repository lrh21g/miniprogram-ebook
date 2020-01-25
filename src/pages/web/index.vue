<template>
  <Global>
    <div class="read">
      <web-view :src="url"></web-view>
    </div>
  </Global>
</template>

<script>
  import Global from '@/components/Global'

  export default {
    components: {
      Global
    },
    data () {
      return {
        url: ''
      }
    },
    mounted () {
      this.url = this.$route.query.url || ''
      console.log(this.url)
    }
  }
</script>

<style lang="scss" scoped>
</style>
