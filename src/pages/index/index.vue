<template>
  <Global>
    <div class="home" v-if="prepare && authorized && !loading">
      <SearchBar disabled
        :hotSearch="hotSearch && hotSearch.keyword"
        @onClick="onSearchBarClick"
      />
      <HomeCard :data="homeCardData"
        :num="shelfCount"
        :hasSign="hasSign"
        :signDay="continueSignDay"
        @onBookClick="gotoBookDetail"
        @onSignClick="onSignClick"
      />
      <!-- <AdImage :data="adImage" v-if="adImage"></AdImage> -->
      <HomeBook
        :data="recommend"
        :row="1"
        :col="3"
        title="为你推荐"
        btnText="换一批"
        linearBg
        @onBookClick="gotoBookDetail"
        @onMoreClick="() => onSuggestChange('recommend')"
      />
      <HomeBook
        :data="freeRead"
        :row="2"
        :col="2"
        :mode="modeRow"
        title="免费阅读"
        btnText="换一批"
        @onBookClick="gotoBookDetail"
        @onMoreClick="() => onSuggestChange('freeRead')"
      />
      <HomeBook
        :data="hotBook"
        :row="1"
        :col="4"
        title="当前最热"
        btnText="换一批"
        linearBg
        @onBookClick="gotoBookDetail"
        @onMoreClick="() => onSuggestChange('hotBook')"
      />
      <HomeBook
        :data="category"
        :row="3"
        :col="2"
        :mode="modeCategory"
        title="分类"
        btnText="查看全部"
        @onBookClick="gotoCategoryList"
        @onMoreClick="showCategoryList"
      />
      <van-dialog id="van-dialog"/>
    </div>
    <HomePreload v-if="prepare && authorized && loading"/>
    <Auth v-if="prepare && !authorized" @getUserInfo="handleGetUserInfo"/>
  </Global>
</template>

<script>
import Global from '@/components/Global'
import SearchBar from '@/components/SearchBar'
import HomeCard from '@/components/HomeCard'
import AdImage from '@/components/AdImage'
import HomeBook from '@/components/HomeBook'
import Auth from '@/components/auth/Auth'
import HomePreload from '@/components/preload/HomePreload'
import {
  getHomeData,
  getHomeSectionData,
  register,
  hasSignToday,
  sign
} from '@/api'
import {
  getUserOpenId as getOpenId,
  showLoading,
  hideLoading,
  getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  showToast
} from '@/api/wechat'
import { HOMEBOOK_MODE, CATEGORY } from '@/utils/const'
import { handleError } from '@/utils'
import Dialog from '@vant/weapp/dist/dialog/dialog'

export default {
  name: 'index',
  components: {
    Global, SearchBar, HomeCard, AdImage, HomeBook, Auth, HomePreload
  },
  data () {
    return {
      cardList: [], // 卡片书籍
      userInfo: null, // 用户信息
      adImage: null, // 广告图片
      recommend: [], // 推荐书籍
      freeRead: [], // 免费书籍
      hotBook: [], // 热门书籍
      category: [], // 分类
      hotSearch: null, // 热门搜索
      authorized: true,
      loading: true,
      prepare: false,
      shelfCount: 0, // 书架数量
      hasSign: false, // 是否已签到
      continueSignDay: 0 // 连续签到天数
    }
  },
  computed: {
    // 首页card数据信息
    homeCardData () {
      return {
        bookList: this.cardList,
        userInfo: this.userInfo
      }
    },
    modeRow () {
      return HOMEBOOK_MODE.ROW // row
    },
    modeCategory () {
      return HOMEBOOK_MODE.CATEGORY // category
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 点击签到
    onSignClick () {
      Dialog.confirm({
        title: '立即签到',
        message: '连续签到30天，将有机会获得神秘礼物，敬请期待！',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        this.sign()
      }).catch(() => {})
    },
    // 签到
    sign () {
      sign(this.openId).then(response => {
        if (handleError(response)) {
          showToast('签到成功', true)
          this.hasSign = true
          this.continueSignDay++
          this.getSignState(this.openId)
        }
      })
    },
    // 判断用户今天是否已签到
    getSignState (openId) {
      const vue = this
      hasSignToday(openId).then(response => {
        if (handleError(response)) {
          vue.hasSign = response.data.data.hasSignToday
          vue.continueSignDay = response.data.data.continueSignDay
        }
      })
    },
    showCategoryList () {
      this.$router.push('/pages/categoryList/main')
    },
    onSearchBarClick () {
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: (this.hotSearch && this.hotSearch.keyword) || ''
        }
      })
    },
    // 换一批事件 key - recommend:为你推荐， freeRead: 免费阅读， hotBook: 当前最热
    async onSuggestChange (key) {
      const response = await getHomeSectionData(key)
      if (handleError(response)) {
        this[key] = response.data.data
      }
    },
    // 跳转到书籍详情
    gotoBookDetail (book) {
      this.$router.push({
        path: '/pages/detail/mian',
        query: { fileName: book.fileName }
      })
    },
    // 跳转到分类列表
    gotoCategoryList (data) {
      const { category, text } = data
      const query = { categoryId: category, title: text }
      this.$router.push({
        path: '/pages/list/main',
        query
      })
    },
    // 获取首页相关数据
    async getHomeData (openId, onComplete) {
      const vue = this
      const response = await getHomeData(openId)
      if (handleError(response)) {
        const data = response.data.data || {}
        const { banner, shelf, recommend, category, freeRead, hotBook, hotSearch, shelfCount } = data
        this.adImage = banner // 广告banner
        this.cardList = shelf // 卡片列表
        this.recommend = recommend // 推荐书籍
        this.category = category // 分类类目信息
        this.freeRead = freeRead // 免费阅读书籍
        this.hotBook = hotBook // 热门书籍
        this.hotSearch = hotSearch // 热门搜索
        this.category.forEach(c => {
          c.text = CATEGORY[c.categoryText.toLowerCase()]
        })
        this.shelfCount = shelfCount // 书架数量
        onComplete && onComplete()
        vue.$nextTick(() => {
          vue.loading = false
        })
      }
    },
    // 获取用户信息
    getUserInfo () {
      const vue = this
      const onOpenIdComplete = (vue, openId, userInfo) => {
        vue.openId = openId
        vue.getHomeData(openId, hideLoading) // 获取首页数据
        register(openId, userInfo) // 注册账号
        vue.getSignState(openId) // 判断用户今天是否已签到
      }
      console.log('获取用户信息...')
      getUserInfo((userInfo) => {
        vue.userInfo = userInfo
        setStorageSync('userInfo', userInfo)
        const openId = getStorageSync('openId')
        console.log('openId', openId)
        if (!openId || openId.length === 0) {
          getOpenId((openId) => {
            onOpenIdComplete(vue, openId, userInfo)
          })
        } else {
          onOpenIdComplete(vue, openId, userInfo)
        }
      }, (err) => {
        console.log('获取用户信息失败：', err)
      })
    },
    // 判读小程序是否获取权限
    getSetting () {
      this.prepare = false
      this.loading = true
      const vue = this
      // 判断当前小程序是否具备userInfo权限
      getSetting('userInfo', (res) => {
        console.log('验证成功...', res)
        vue.authorized = true
        vue.prepare = true
        vue.getUserInfo() // 获取用户信息
      }, (res) => {
        console.log('验证失败...', res)
        vue.authorized = false
        vue.prepare = true
        hideLoading()
      })
    },
    handleGetUserInfo (res) {
      if (mpvuePlatform === 'wx') {
        const { mp: { detail: { errMsg } } } = res
        if (errMsg === 'getUserInfo:ok') {
          this.init()
        } else {
          showToast('授权失败，请重试！')
        }
      } else if (mpvuePlatform === 'my') {
        mpvue.getAuthCode({
          scopes: 'auth_user',
          success: (res) => {
            console.log('auth_user', res)
            if (res.authCode) {
              this.init()
            } else {
              showToast('授权失败，请重试！')
            }
          },
          fail: () => {
            showToast('授权失败，请重试！')
          }
        })
      }
    },
    init () {
      showLoading({ title: '正在加载' })
      this.getSetting() // 判断是否已经具备获取用户信息权限
    }
  }
}
</script>

<style scoped>
</style>
