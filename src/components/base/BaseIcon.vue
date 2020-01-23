<template>
  <van-icon v-if="platform === 'wx'"
    :class="customClass"
    :style="customStyle"
    :name="name"
    :color="color"
    :size="size"></van-icon>
  <icon v-else-if="platform === 'my'"
    :class="customClass"
    :style="customStyle"
    :type="name"
    :color="color" ></icon>
</template>

<script>
export default {
  props: {
    customStyle: Object,
    customClass: String,
    name: String,
    color: String,
    size: String
  },
  data () {
    return {
      platform: mpvuePlatform
    }
  }
}
</script>
