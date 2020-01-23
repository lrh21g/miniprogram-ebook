<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="home-card-userinfo">
        <div class="home-card-avatar">
          <ImageView :src="userInfo.avatarUrl"
            mode="scaleToFill"
            height="100%"
            round
            @click="gotoShelf"></ImageView>
        </div>
        <span class="home-card-name">{{userInfo.nickName}}</span>
        <div class="home-card-hint" v-if="platform === 'wx'">
          已连续<span class="sign-num">{{signDay}}</span>天签到
          <BaseButton v-if="!hasSign"
            size="min"
            type="info"
            text="立即签到"
            custom-class="btn-sign"
            round
            @click="sign"></BaseButton>
        </div>
      </div>
      <div class="home-card-book">
        <div class="home-card-img-wrapper">
          <div v-for="(item, index) in bookList" :key="index"
            class="home-card-img"
            @click="onBookClick(item)">
            <ImageView :scr="item.cover"></ImageView>
          </div>
        </div>
        <div class="home-card-shelf-wrapper" @click="gotoShelf">
          <div class="home-card-shelf">书架</div>
          <van-icon class="arrow" name="arrow" color="#ccc" size="12px"></van-icon>
        </div>
      </div>
    </div>
    <div class="home-card-feedback" v-if="platform === 'wx'" @click="showChapter">反馈</div>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import ImageView from './base/ImageView'
import BaseIcon from './base/BaseIcon'
import BaseButton from './base/BaseButton'
import Dialog from '@vant/weapp/dist/dialog/dialog'

export default {
  components: {
    ImageView, BaseIcon, BaseButton
  },
  props: {
    data: Object,
    num: Number,
    hasSign: Boolean,
    signDay: Number
  },
  computed: {
    userInfo () {
      return (this.data && this.data.userInfo) || {}
    },
    bookList () {
      return (this.data && this.data.bookList) || []
    }
  },
  data () {
    return {
      platform: mpvuePlatform
    }
  },
  methods: {
    gotoShelf () {
      this.$router.push('/page/shelf/main')
    },
    onBookClick (book) {
      this.$emit('onBookClick', book)
    },
    sign () {
      this.$emit('onSignClick')
    },
    showChapter () {
      Dialog.alert({
        title: '反馈',
        message: '该功能正在开发中...'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .homt-card-hint {
    .btn-sign {
      width: auto;
      padding: 0 10px;
      margin-left: 5px;
      font-size: 10px;
      color: #fff;
      background: #ff6388;
      border: none;
      border-radius: 50px;
    }
  }
</style>

<style lang="scss" scoped>
  .home-card {
    position: relative;
    width: 100%;
    padding: 27px 15px 10px 15px;
    box-sizing: border-box;
    .home-card-inner {
      padding: 20px 15px;
      background-image: linear-gradient(90deg, #54575f 0%, #595b60 100%);
      border-radius: 15px;
      color: white;
      .home-card-userinfo {
        display: flex;
        align-items: center;
        .home-card-avatar {
          width: 20px;
          height: 20px;
        }
        .home-card-name {
          margin-left: 10px;
          font-size: 12px;
          color: #f4f4f4;
        }
        .home-card-hint {
          display: flex;
          align-items: center;
          margin-left: 10px;
          font-size: 12px;
          color: #aaa;
          .sign-num {
            margin: 0 5px;
            font-size: 6px;
            font-weight: 500;
          }
        }
      }
      .home-card-book {
        display: flex;
        padding-top: 10px;
        .home-card-img-wrapper {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .home-card-img {
            width: 80px;
            height: 105px;
          }
        }
        .home-card-shelf-wrapper {
          flex: 0 0 auto;
          display: flex;
          padding-left: 15px;
          .home-card-shelf {
            display: flex;
            align-items: center;
            width: 12px;
            font-size: 12px;
            line-height: 14px;
            color: #f4f4f4;
            word-break: break-word;
          }
          .arrow {
            width: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .home-card-feedback {
      position: absolute;
      top: 47px;
      right: 15px;
      width: 40px;
      height: 20px;
      font-size: 10px;
      color: #f4f4f4;
      line-height: 20px;
      text-align: center;
      background: #707070;
      border-radius: 50px 0 0 50px;
      &:active {
        opacity: 0.7;
      }
    }
  }
</style>
