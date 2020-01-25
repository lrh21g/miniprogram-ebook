import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import './style/base.scss'
import { errorHandler, onError } from './utils/error'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

// Vue异常捕获
Vue.config.errorHandler = errorHandler
console.log('mpvue', mpvue)
console.log('mpvuePlatform', mpvuePlatform)

if (mpvuePlatform === 'my') {
  // do something...
} else {
  // App全局异常捕获
  mpvue.onError((err) => onError(err, app))
}

const app = new Vue(App)
app.$mount()
