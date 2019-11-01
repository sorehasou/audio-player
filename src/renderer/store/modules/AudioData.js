const state = {
  playInfo: {},
  playList: []
}

const mutations = {
  addTrack (state, source) {
    source.index = state.playList.length;
    state.playList.push(source);
  },
  removeTrack (state, source) {
    state.playList.splice(source.index, 1);
  },
  nextTrack (state) {
    var currentIndex = state.playInfo.index++;
    if (currentIndex < state.playList.length) {
      state.playInfo = playList[currentIndex];
    } else if (0 < state.playList.length) {
      state.playInfo = playList[0];
    }
  },
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
