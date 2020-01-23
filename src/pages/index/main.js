import Vue from 'vue'
import App from './index'
import MpvueRouterPath from 'mpvue-router-patch'

Vue.use(MpvueRouterPath)
Vue.config.productionTip = false
// App.mpType = 'app'

const app = new Vue(App)
app.$mount()
