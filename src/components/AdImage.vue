<template>
  <div class="ad-image">
    <div class="img" :style="{ backgroundImage: 'url(' + data.img + ')' }">
      <div class="title">{{data.title}}</div>
      <div class="sub-title" @click="onClick">{{data.subTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  methods: {
    onClick () {
      this.$router.push({
        path: '/pages/web/main',
        query: {
          url: this.data.url
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ad-image {
    padding: 10px 15px;
    .img {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 125px;
      background-size: 100% 100%;
      background-color: #808080;
      background-repeat: no-repeat;
    }
    .title {
      font-size: 18px;
      color: #fff;
    }
    .sub-title {
      padding: 5px 15px;
      margin-top: 10px;
      font-size: 14px;
      color: #fff;
      background: #4585ff;
      border: 1px solid #ccc;
      border-radius: 50px;
    }
  }
</style>
