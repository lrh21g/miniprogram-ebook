<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="home-card-userinfo">
        <div class="home-card-avatar">
          <ImageView :src="userInfo.avatarUrl" @click="gotoShelf" mode="scaleToFill" height="100%" round></ImageView>
        </div>
        <span class="home-card-name">{{userInfo.nickName}}</span>
        <div class="home-card-hint" v-if="platform === 'wx'">
          已连续<span class="sign-num">{{signDay}}</span>天签到
          <BaseButton size="mini" type="info" text="立即签到" custom-class="btn-sign" round @click="sign" v-if="!hasSign" />
        </div>
      </div>
      <div class="home-card-book">
        <div class="home-card-img-wrapper">
          <div class="home-card-img" v-for="(item, index) in bookList" :key="index" @click="onBookClick(item)">
            <ImageView :src="item.cover"></ImageView>
          </div>
        </div>
        <div class="home-card-shelf-wrapper" @click="gotoShelf">
          <div class="home-card-shelf">书架</div>
          <van-icon class="arrow" name="arrow" color="#ccc" size="12px"></van-icon>
        </div>
      </div>
    </div>
    <div class="home-card-feedback" @click="showChapter" v-if="platform === 'wx'">反馈</div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
  import ImageView from './base/ImageView'
  import BaseIcon from './base/BaseIcon'
  import BaseButton from './base/BaseButton'
  import Dialog from '@vant/weapp/dist/dialog/dialog'

  export default {
    components: {
      BaseButton,
      BaseIcon,
      ImageView
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
        this.$router.push('/pages/shelf/main')
      },
      onBookClick (book) {
        this.$emit('onBookClick', book)
      },
      sign () {
        this.$emit('onSignClick')
      },
      showChapter () {
        // this.$router.push('/pages/chapter/main')
        Dialog.alert({
          title: '反馈',
          message: '该功能正在开发中...'
        })
      }
    }
  }
</script>

<style lang="scss">
  .home-card-hint {
    .btn-sign {
      width: auto;
      background: #ff6388;
      padding: 0 10px;
      border: none;
      border-radius: 50px;
      margin-left: 5px;
      color: #fff;
      font-size: 10px;
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
      color: white;
      background-image: linear-gradient(90deg, #54575F 0%, #595B60 100%);
      border-radius: 15px;
      padding: 20px 15px;

      .home-card-userinfo {
        display: flex;
        align-items: center;

        .home-card-avatar {
          width: 20px;
          height: 20px;
        }

        .home-card-name {
          font-size: 12px;
          color: #f4f4f4;
          margin-left: 10px;
        }

        .home-card-hint {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #aaa;
          margin-left: 10px;

          .sign-num {
            font-size: 16px;
            margin: 0 5px;
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
          padding-left: 15px;
          display: flex;

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
      right: 15px;
      top: 47px;
      font-size: 10px;
      // width: 60px;
      width: 40px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #707070;
      color: #f4f4f4;
      border-radius: 50px 0 0 50px;

      &:active {
        opacity: .7;
      }
    }
  }

</style>
