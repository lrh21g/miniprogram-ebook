
<template>
  <div class="detail-bottom">
    <div class="detail-btn-wrapper">
      <BaseButton
        :custom-class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
        round
        :text="isInShelf ? '移出书架' : '加入书架'"
        @click="handleShelf"
      />
    </div>
    <div class="detail-btn-wrapper">
      <BaseButton
        custom-class="detail-btn-read"
        round
        text="阅读"
        @click="() => readBook()"
      />
    </div>
  </div>
</template>

<script>
  import BaseButton from '../base/BaseButton'
  export default {
    components: { BaseButton },
    props: {
      isInShelf: Boolean
    },
    methods: {
      handleShelf () {
        this.$emit('handleShelf')
      },
      readBook () {
        this.$emit('readBook')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 0 rgba(250, 250, 250, .9);
    .detail-btn-wrapper {
      flex: 1;
    }
  }
</style>

<style lang="scss">
  .detail-bottom {
    .detail-btn-read {
      width: 100%;
      border: none;
      color: #fff;
      background: #1EA3F5;
      margin-left: 7.5px;
    }

    .detail-btn-shelf {
      width: 100%;
      color: #1EA3F5;
      background: #fff;
      border: 1px solid #1EA3F5;
      margin-right: 7.5px;
    }

    .detail-btn-remove {
      width: 100%;
      color: #F96128;
      background: rgba(255, 175, 155, .3);
      border: 1px solid #FFAF9B;
      margin-right: 7.5px;
    }
  }
</style>
