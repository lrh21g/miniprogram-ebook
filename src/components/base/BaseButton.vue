<template>
  <van-button v-if="platform === 'wx'"
    :size="size"
    :type="type"
    :round="round"
    :custom-class="customClass"
    @click="onClick">{{text}}</van-button>
  <button v-else-if="platform === 'my'"
    :size="size"
    :type="type"
    :class="customClass"
    :style="{ borderRadius: round ? '50px' : '0' }"
    @click="onClick">{{text}}</button>
</template>

<script>
export default {
  props: {
    customClass: String,
    text: String,
    color: String,
    size: String,
    round: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      platform: mpvuePlatform
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped></style>
