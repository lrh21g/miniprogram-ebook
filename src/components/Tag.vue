<template>
  <div class="tag-wrapper" @click="onClick">
    <div class="tag">{{text}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss">
  .tag-wrapper {
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background: #F7F7F9;
    color: #272E37;
    padding: 4px 15px;
    font-size: 14px;
    .tag {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
