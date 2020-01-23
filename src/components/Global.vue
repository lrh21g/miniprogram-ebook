<template>
  <div class="global">
    <div class="error" v-if="error">
      <div class="error-msg-wrapper">
        <div class="error-image">
          <ImageView src="/static/images/crash.png"></ImageView>
        </div>
        <div class="error-msg">{{error.message || '程序猿紧急抢修中...'}}</div>
        <div class="error-retry-wrapper">
          <div class="error-retry" @click="retry">重启小程序</div>
        </div>
      </div>
    </div>
    <slot v-if="!error"></slot>
  </div>
</template>

<script>
import store from '../store'
import { setError } from '../utils/error'
import ImageView from './base/ImageView'

export default {
  components: { ImageView },
  computed: {
    error () {
      return store.state.error
    }
  },
  methods: {
    retry () {
      let path = getApp().globalData.appOptions.path
      if (!path.startsWith('/')) {
        path = `/${path}`
      }
      mpvue.reLaunch({ url: path })
      setError() // 重置异常信息
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/base';

  .error {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    @include center;
    .error-msg-wrapper {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      .error-image {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
      }
      .error-msg {
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #666;
        margin-top: 20px;
      }
      .error-retry-wrapper {
        width: 100%;
        @include center;
        .error-retry {
          border: 1px solid #3696EF;
          border-radius: 50px;
          text-align: center;
          font-size: 13px;
          color: #3696EF;
          padding: 8px 40px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
