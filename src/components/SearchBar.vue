<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <div class="search">
        <BaseIcon name="search" color="#858c96" size="16px" />
      </div>
      <input class="search-bar-input"
        :placeholder="hotSearch || ''"
        placeholder-style="color: #adb4be"
        :disabled="disabled"
        :focus="focus"
        confirm-type="search"
        v-model="searchWord"
        @input="onChange"
        @confirm="onConfirm">
      <div v-if="searchWord.length > 0" class="clear" @click="onClearClick">
        <BaseIcon name="clear" color="#ccc" size="16px"></BaseIcon>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from './base/BaseIcon'

export default {
  components: { BaseIcon },
  props: {
    disabled: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    limit: { type: Number, default: 50 },
    hotSearch: { type: String, default: '' }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick () {
      this.$emit('onClick')
    },
    onClearClick () {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange (v) {
      let value = v.mp.detail.value
      if (value.length > this.limit) {
        value = value.slice(0, this.limit)
        this.searchWord = this.searchWord.slice(0, this.limit)
      }
      this.$emit('onChange', value)
    },
    onConfirm (v) {
      this.$emit('onConfirm', v.mp.detail.value)
    },
    setValue (v) {
      console.log('search setValue v', v)
      this.searchWord = v
    },
    getValue () {
      return this.searchWord
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    padding: 10px 15px;
    height: 40px;
    .search-bar-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 2px 15px;
      box-sizing: border-box;
      background: #f5f7f9;
      border-radius: 20px;
      .search {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .search-bar-input {
        flex: 1;
        height: 100%;
        margin-left: 5px;
        font-size: 14px;
        color: #333;
        background: transparent;
      }
      .clear {
        display: flex;
        align-items: center;
        height: 100%;
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
</style>
