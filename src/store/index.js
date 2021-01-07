import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  //mutations唯一的目的就是修改state中的状态，每个方法完成的事情尽可能单一
  mutations,
  getters,
  actions
})
