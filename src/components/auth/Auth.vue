<template>
  <div class="authorized">
    <div class="auth-wrapper">
      <div class="auth-info-wrapper">
        <div class="auth-img">
          <ImageView src="/static/images/princekin.jpg"
            height="100%" mode="scaleToFill" round></ImageView>
        </div>
        <div class="auth-text">登陆读书</div>
        <div class="auth-strong-text">全球好书免费读</div>
      </div>
      <button v-if="platform === 'wx'"
        open-type="getUserInfo"
        plain="true"
        class="auth-btn"
        @getuserinfo="getUserInfo">授权登陆</button>
      <button v-else
        open-type="getAuthorize"
        plain="true"
        scope="userInfo"
        class="auth-btn">授权登陆</button>
    </div>
  </div>
</template>

<script>
import ImageView from '../base/ImageView'

export default {
  components: { ImageView },
  data () {
    return {
      platform: mpvuePlatform
    }
  },
  methods: {
    getUserInfo (res) {
      this.$emit('getUserInfo', res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .authorized {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #999999;

    .auth-wrapper {
      position: relative;
      width: 270px;
      height: 248px;
      background: #f5f5f5;
      border-radius: 18px;

      .auth-info-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 22.5px;

        .auth-img {
          width: 74px;
          height: 74px;
        }

        .auth-text {
          font-size: 13px;
          color: #999;
          margin-top: 18px;
        }

        .auth-strong-text {
          font-size: 16px;
          color: #333;
          margin-top: 3.5px;
          font-weight: 500;
        }
      }

      .auth-btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 49px;
        line-height: 49px;
        font-size: 15px;
        font-weight: 500;
        background-image: linear-gradient(270deg, #1EA3F5 0%, #0F87FC 100%);
        color: #fff;
        border: none;
        border-radius: 0 0 18px 18px;
      }
    }
  }
</style>
