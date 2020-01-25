<template>
  <Global>
    <div class="category-list">
      <HomeBook
        :data="category"
        :row="(category && category.length / 2) || 0"
        :col="2"
        :mode="modeCategory"
        @onBookClick="gotoCategoryList"
        :showTitle="false"
        :showBtn="false"
      />
    </div>
  </Global>
</template>

<script>
  import { getCategoryList } from '@/api'
  import { HOMEBOOK_MODE, CATEGORY } from '@/utils/const'
  import { handleError } from '@/utils'
  import HomeBook from '@/components/HomeBook'
  import Global from '@/components/Global'

  export default {
    components: {
      HomeBook,
      Global
    },
    computed: {
      modeCategory () {
        return HOMEBOOK_MODE.CATEGORY
      }
    },
    data () {
      return {
        category: null
      }
    },
    methods: {
      gotoCategoryList (data) {
        const { category, text } = data
        const query = { categoryId: category, title: text }
        this.$router.push({ path: '/pages/list/main', query })
      }
    },
    mounted () {
      getCategoryList().then(response => {
        if (handleError(response)) {
          this.category = response.data.data
          this.category.forEach(c => {
            c.text = CATEGORY[c.categoryText.toLowerCase()]
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped></style>
