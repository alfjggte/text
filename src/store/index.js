import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    activePath: sessionStorage.getItem("activePath") ? sessionStorage.getItem("activePath") : "/home"
  },
  mutations: {
    OPEN(state) {
      state.isCollapse = !state.isCollapse
    },
    SetActive(state, val) {
      sessionStorage.setItem("activePath", val)
      state.activePath = sessionStorage.getItem("activePath")
    },
    ClearActive(state) {
      state.activePath = '/home'
      sessionStorage.removeItem("activePath")
    },
    ClearIsCollapse(state) {
      state.isCollapse = false
    }
  },
  actions: {

  },
  modules: {
  }
})
