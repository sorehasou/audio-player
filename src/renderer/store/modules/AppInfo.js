const state = {
  isShowPlayList: false
}

const mutations = {
  togglePlayList (state) {
    state.isShowPlayList = !state.isShowPlayList;
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
