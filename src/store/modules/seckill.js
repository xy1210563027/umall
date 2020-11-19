import {reqSecksList} from "../../utils/http"
const state = {
  list: []
}
const mutations = {
  changeList(state, arr) {
    state.list = arr
    console.log(state.list)
  }
}

const actions = {
  reqList(context) {
    reqSecksList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}
const getters = {
  list(state) {
    return state.list
  }
}
export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}
