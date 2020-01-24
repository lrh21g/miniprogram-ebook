<template>
  <div class="image-view" @click="onClick">
    <img v-show="!isLoading && !error"
      :class="round ? ' round image' : 'image'"
      :style="{ height }"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @error="onError"
      @load="onLoad">
    <img v-show="isLoading || error"
      :class="round ? ' round image' : 'image'"
      :style="{ height }"
      src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
      :mode="mode"
      @error="onPreloadError"
      @load="onPreload">
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: '' },
    mode: { type: String, default: 'widthFix' },
    lazyLoad: { type: Boolean, default: true },
    round: { type: Boolean, default: false },
    height: { type: String, default: 'auto' }
  },
  watch: {
    src (newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.$nextTick(() => {
          this.isLoading = true
        })
      }
    }
  },
  data () {
    return {
      isLoading: true, // 实际图片读取状态
      error: false // 图片是否加载失败
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    onError () {
      this.error = true
    },
    onLoad () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-view {
    width: 100%;
    height: 100%;
    .round {
      border-radius: 50%;
    }
    .image {
      width: 100%;
    }
  }
</style>
