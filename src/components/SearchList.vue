<template>
  <div class="search-list">
    <SearchItem v-if="category"
      :data="category.categoryText"
      label="Category"
      icon="apps-o"
      @onClick="showList({ category: category.categoryText })"
    ></SearchItem>
    <SearchItem v-if="author"
      :data="author.author"
      label="Author"
      icon="user-o"
      @onClick="showList({ author: author.author })"
    ></SearchItem>
    <SearchItem v-if="publisher"
      :data="publisher.publisher"
      label="Publisher"
      icon="newspaper-o"
      @onClick="showList({ publisher: publisher.publisher })"
    ></SearchItem>
    <SearchTable :data="book"/>
  </div>
</template>

<script>
  import SearchItem from '@/components/SearchItem'
  import SearchTable from '@/components/SearchTable'

  export default {
    components: {
      SearchItem,
      SearchTable
    },
    props: {
      data: Object
    },
    computed: {
      category () {
        return this.data &&
          this.data.category &&
          this.data.category.length > 0 &&
          this.data.category[0]
      },
      author () {
        return this.data &&
          this.data.author &&
          this.data.author.length > 0 &&
          this.data.author[0]
      },
      book () {
        return this.data &&
          this.data.book &&
          this.data.book.length > 0 &&
          this.data.book
      },
      publisher () {
        return this.data &&
          this.data.publisher &&
          this.data.publisher.length > 0 &&
          this.data.publisher[0]
      }
    },
    methods: {
      showList (params) {
        const query = {}
        if (params.category) {
          query.category = params.category
        }
        if (params.author) {
          query.author = params.author
        }
        if (params.publisher) {
          query.publisher = params.publisher
        }
        this.$router.push({ path: '/pages/list/main', query })
      }
    }
  }
</script>

<style lang="scss">
  .search-list {
    padding: 15px 0;
  }
</style>
