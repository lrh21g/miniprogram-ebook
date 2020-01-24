<template>
  <div class="search-item" @click="onClick">
    <div class="search-item-icon">
      <div class="icon">
        <BaseIcon :name="iconName" color="#999" size="20px" />
      </div>
    </div>
    <div class="search-item-info">
      <div class="search-item-text">{{data}}</div>
      <div class="search-item-label">{{label}}</div>
    </div>
  </div>
</template>

<script>
  import BaseIcon from './base/BaseIcon'
  export default {
    components: { BaseIcon },
    props: {
      data: String,
      label: String,
      icon: String
    },
    computed: {
      iconName () {
        if (mpvuePlatform === 'wx') {
          return this.icon
        } else if (mpvuePlatform === 'my') {
          return 'info'
        }
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
  @import '../style/base';

  .search-item {
    display: flex;
    padding: 15px;

    .search-item-icon {
      flex: 0 0 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: #eee;
      box-sizing: border-box;
      .icon {
        width: 100%;
        height: 100%;
        @include center;
      }
    }

    .search-item-info {
      margin-left: 15px;
      overflow: hidden;
      .search-item-text {
        font-size: 14px;
        color: #333;
        @include ellipse;
      }

      .search-item-label {
        font-size: 11px;
        color: #999;
        @include ellipse;
      }
    }
  }
</style>
