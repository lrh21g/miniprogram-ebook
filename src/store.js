import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError: (state, message) => {
      if (message) {
        state.error = { message }
      } else {
        state.error = null
      }
    }
  }
})

export default store
