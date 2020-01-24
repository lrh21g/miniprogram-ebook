<template>
  <div class="search-table">
    <div class="search-book" v-for="item in data" :key="item.id" @click="onClick(item)">
      <div class="search-img-wrapper">
        <div class="search-img">
          <ImageView :src="item.cover" />
        </div>
      </div>
      <div class="search-info">
        <div class="search-title">{{item.title}}</div>
        <div class="search-author">{{item.author}}</div>
        <div class="search-category">{{item.categoryText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageView from './base/ImageView'

  export default {
    components: {
      ImageView
    },
    props: {
      data: Array
    },
    methods: {
      onClick (book) {
        this.$router.push({ path: '/pages/detail/main', query: { fileName: book.fileName } })
      }
    }
  }
</script>

<style lang="scss">
  @import '../style/base';

  .search-table {
    padding: 0 15px;
    .search-book {
      display: flex;
      padding: 15px 0;
      .search-img-wrapper {
        flex: 0 0 45px;
        width: 45px;
        height: 60px;
        .search-img {
          width: 100%;
          height: 100%;
        }
      }

      .search-info {
        display: flex;
        overflow: hidden;
        flex-flow: column nowrap;
        margin-left: 15px;
        height: 60px;
        justify-content: space-between;
        .search-title {
          width: 100%;
          font-size: 14px;
          color: #333;
          @include ellipse;
        }

        .search-author {
          width: 100%;
          font-size: 12px;
          color: #666;
          @include ellipse;
        }

        .search-category {
          width: 100%;
          font-size: 11px;
          color: #999;
          @include ellipse;
        }
      }
    }
  }
</style>
