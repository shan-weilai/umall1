import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state,mutations,getters} from "./mutations"
import {actions } from "./actions"
import cate from "./modules/cate"
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    cate,
  }
})
