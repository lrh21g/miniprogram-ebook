<template>
  <Global>
    <div class="detail" v-if="!loading">
      <DetailBook :book="book" />
      <DetailStat
        :readers="readers"
        :readerNum="readerNum"
        :rankNum="rankNum"
        :rankAvg="rankAvg"
      />
      <DetailRate
        :rate-value="rateValue"
        @onRateChange="onRateChange"
        v-if="platform === 'wx'"
      />
      <DetailContents
        :contents="contents"
        @readBook="readBook"
      />
      <DetailBottom
        :is-in-shelf="isInShelf"
        @handleShelf="handleShelf"
        @readBook="readBook"
      />
    </div>
    <DetailPreload v-if="loading"/>
  </Global>
</template>

<script>
  import {
    getDetailData,
    getDetailContents,
    getShelf,
    saveShelf,
    removeShelf,
    rank
  } from '@/api'
  import Global from '@/components/Global'
  import ImageView from '@/components/base/ImageView'
  import DetailPreload from '@/components/preload/DetailPreload'
  import { handleError } from '@/utils'
  import { getStorageSync, showToast, showModal } from '@/api/wechat'
  import BaseButton from '@/components/base/BaseButton'
  import DetailBook from '@/components/detail/DetailBook'
  import DetailStat from '@/components/detail/DetailStat'
  import DetailRate from '@/components/detail/DetailRate'
  import DetailContents from '@/components/detail/DetailContents'
  import DetailBottom from '@/components/detail/DetailBottom'

  export default {
    components: {
      DetailBottom,
      DetailContents,
      DetailRate,
      DetailStat,
      DetailBook,
      BaseButton,
      Global,
      ImageView,
      DetailPreload
    },
    data () {
      return {
        book: null,
        contents: null,
        rateValue: 0,
        isInShelf: false,
        loading: true,
        readers: [],
        readerNum: 0,
        rankAvg: 0,
        rankNum: 0,
        platform: mpvuePlatform
      }
    },
    methods: {
      onRateChange (rankValue) {
        this.rateValue = rankValue
        const fileName = this.book.fileName
        const openId = getStorageSync('openId')
        rank({ openId, fileName, rank: this.rateValue })
          .then(response => {
            if (handleError(response)) {
              showToast(response.data.msg, true)
              this.init()
            }
          })
      },
      readBook (nav) {
        const params = {
          fileName: this.book.fileName,
          opf: this.book.opf
        }
        if (nav) {
          if (nav.indexOf('/') >= 0) {
            nav = nav.slice(nav.indexOf('/') + 1, nav.length)
          }
          params.navigation = nav
        }
        console.log(params)
        this.$router.push({
          path: '/pages/read/main',
          query: params
        })
      },
      handleShelf () {
        if (this.isInShelf) {
          const vue = this
          showModal({
            title: '移出书架',
            content: `是否将《${this.book.title}》移出书架`,
            callback () {
              vue.removeFromShelf()
            }
          })
        } else {
          this.saveToShelf()
        }
      },
      removeFromShelf () {
        const openId = getStorageSync('openId')
        if (!openId) {
          showToast('获取用户信息失败，请登录后重试')
        } else {
          removeShelf({
            fileName: this.book.fileName,
            openId
          }).then(response => {
            if (response.data.error_code === 0) {
              showToast(response.data.msg, true)
              this.isInShelf = false
            } else {
              showToast(response.data.msg)
            }
          })
        }
      },
      saveToShelf () {
        const openId = getStorageSync('openId')
        if (!openId) {
          showToast('获取用户信息失败，请登录后重试')
        } else {
          saveShelf({
            fileName: this.book.fileName,
            openId
          }).then(response => {
            if (response.data.error_code === 0) {
              showToast(response.data.msg, true)
              this.isInShelf = true
            } else {
              showToast(response.data.msg)
            }
          })
        }
      },
      init () {
        console.log('detail init')
        const fileName = this.$route.query.fileName || ''
        const openId = getStorageSync('openId')
        const vue = this
        getDetailData(openId, fileName).then(response => {
          this.book = response.data.data
          this.readerNum = this.book.readerNum
          this.readers = this.book.readers
          this.rankAvg = this.book.rankAvg
          this.rankNum = this.book.rankNum
          this.rateValue = this.book.rank
          if (openId) {
            getShelf(openId, this.book.fileName).then(response => {
              const data = response.data.data
              if (data.length === 0) {
                this.isInShelf = false
              } else {
                this.isInShelf = true
              }
            })
          }
          vue.$nextTick(() => {
            vue.loading = false
          })
        })
        getDetailContents(fileName).then(response => {
          this.contents = response.data.data
        })
      }
    },
    mounted () {
      this.loading = true
      this.init()
    }
  }
</script>

<style lang="scss">
  .detail {
    .detail-bottom {
      .detail-btn-read {
        width: 100%;
        margin-left: 7.5px;
      }
      .detail-btn-remove, .detail-btn-shelf {
        width: 100%;
        margin-right: 7.5px;
      }
    }
  }
</style>
