const state = {
  playList: []
}

const mutations = {
  addTrack (state, source) {
    source.index = state.playList.length;
    state.playList.push(source);
  },
  removeTrack (state, index) {
    state.playList.splice(index, 1);
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
