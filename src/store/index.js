//让ie支持vuex
import BabelPolyfill from 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(BabelPolyfill)
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
})
