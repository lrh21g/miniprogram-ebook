<template>
  <div class="tag-group-wrapper" v-if="value && value.length > 0">
    <div class="tag-group-header">
      <div class="header-text">{{headerText}}</div>
      <div class="header-btn" @click="onBtnClick">{{btnText}}</div>
    </div>
    <div class="tag-group">
      <div v-for="(item, index) in value" :key="index" class="tag-group-inner">
        <Tag :text="item" @onClick="() => onTagClick(item)" />
      </div>
    </div>
  </div>
</template>

<script>
  import Tag from './Tag'

  export default {
    components: {
      Tag
    },
    props: {
      headerText: String,
      btnText: String,
      value: Array
    },
    methods: {
      onTagClick (item) {
        this.$emit('onClick', item)
      },
      onBtnClick () {
        console.log('on btn click...')
        this.$emit('onBtnClick')
      }
    }
  }
</script>

<style lang="scss">
  .tag-group-wrapper {
    padding: 15px 0 0;

    .tag-group-header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 0 15px;

      .header-text {
        color: #333;
      }

      .header-btn {
        color: #3696EF;
      }
    }

    .tag-group {
      display: flex;
      flex-flow: row wrap;
      padding: 7.5px;
      .tag-group-inner {
        padding: 7.5px;
        max-width: 100%;
        box-sizing: border-box;
      }
    }
  }
</style>
