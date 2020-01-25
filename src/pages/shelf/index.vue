<template>
  <Global>
    <div class="shelf">
      <ShelfUserInfo :user-info="userInfo"
        :num="shelfList.length > 0 ? shelfList.length - 1 : 0"
        :read-day="readDay"
      />
      <ShelfList :shelf-list="shelfList" />
    </div>
  </Global>
</template>

<script>
  import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
  import ShelfList from '../../components/shelf/ShelfList'
  import Global from '@/components/Global'
  import { getShelf, day } from '@/api'
  import { handleError } from '../../utils'
  import { getStorageSync } from '../../api/wechat'

  export default {
    components: {
      ShelfList,
      ShelfUserInfo,
      Global
    },
    data () {
      return {
        userInfo: {},
        shelfList: [],
        readDay: 1
      }
    },
    mounted () {
      this.userInfo = getStorageSync('userInfo')
      console.log('shelf', this.userInfo)
      const openId = getStorageSync('openId')
      if (openId) {
        getShelf(openId).then(response => {
          if (handleError(response)) {
            this.shelfList = response.data.data
            this.shelfList.push({})
          }
        })
        day(openId).then(response => {
          if (handleError(response)) {
            this.readDay = response.data.data.day
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
