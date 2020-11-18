import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import actions from "./actions"
import {
  state,
  mutations,
  getters
} from "./mutations"
import cate from "./modules/cate"
import specs from "./modules/specs"
import goods from "./modules/goods.js"
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    cate,
    specs,
    goods
  }
})
