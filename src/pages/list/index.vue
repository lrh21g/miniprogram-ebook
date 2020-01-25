<template>
  <Global>
    <div class="list">
      <SearchTable :data="data"/>
    </div>
  </Global>
</template>

<script>
  import Global from '@/components/Global'
  import SearchTable from '@/components/SearchTable'
  import { searchBook } from '@/api'
  import { setNavigationBar, showToast } from '../../api/wechat'

  export default {
    components: {
      SearchTable,
      Global
    },
    data () {
      return {
        page: 1,
        data: null
      }
    },
    methods: {
      searchBook (params) {
        params.page = this.page
        searchBook(params).then(response => {
          if (response && response.data && response.data.error_code === 0) {
            this.data = response.data.data
            this.page++
          }
        })
      }
    },
    mounted () {
      console.log('query...', this.$route.query)
      this.page = 1
      const query = this.$route.query
      if (query) {
        const keys = Object.keys(query)
        let title = query.title
        if (!title) {
          title = keys.length > 0 ? query[keys[0]] : ''
        }
        setNavigationBar({ title })
        delete query.title
        this.searchBook(query)
      }
    },
    onReachBottom () {
      const query = this.$route.query
      if (query && this.data) {
        query.page = this.page
        searchBook(query).then(response => {
          if (response && response.data && response.data.error_code === 0) {
            const book = response.data.data
            if (book && book.length > 0) {
              this.data.push(...book)
              this.page++
            } else {
              showToast('没有更多数据了')
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
