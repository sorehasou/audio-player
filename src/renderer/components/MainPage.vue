<template>
  <div id="wrapper" :class="{'play-list-open': appInfo.isShowPlayList}">
    <div id="search-input">
      <template v-if="appInfo.isShowPlayList">
        <button id="play-list-start-button" :class="{disable: !isPlayable()}" @click="playListStart(0)">プレイリストを再生</button>
      </template>
      <template v-else>
        <input id="search-input-area" ref="searchInputArea" @keydown.enter="initSearch">
        <button id="search-button" @click="initSearch">検索</button>
      </template>
      <button id="play-list-button" @click="togglePlayList">…</button>
    </div>
    <div id="main-content">
      <message-box ref="messageBox"></message-box>
      <div id="play-list">
        <play-list ref="playList"></play-list>
      </div>
      <div id="search-result" v-if="existsResult()">
        <div v-for="item in displayQueue.items" class="music-list">
          <img class="music-img" :src="item.coverURL">
          <div class="music-detail">
            <div class="music-title">
              {{item.title}}
            </div>
            <div class="music-artist">
              {{item.artist}}
            </div>
            <div class="music-select">
              <span class="music-play" @click="play(item.url)">再生</span>
              <span class="music-add-list" @click="addPlayList(item)">プレイリストに追加</span>
            </div>
          </div>
        </div>
        <div class="music-list" v-if="displayQueue.hasMore">
          <button id="load-more" @click="nextSearch">
            もっと読み込む
          </button>
        </div>
      </div>
      <div v-else>
        <div class="no-data">
          検索結果なし
        </div>
      </div>
    </div>
    <div id="audio-controller">
      <audio-controller ref="audioController"></audio-controller>
    </div>
  </div>
</template>

<script>
  import product from '@/product';
  import $ from 'jquery';
  import { mapMutations } from 'vuex';

  import messageBox from './MessageBox';
  import audioController from './MainPage/AudioController';
  import playList from './MainPage/PlayList';

  export default {
    name: 'main-page',
    components: {
      messageBox,
      audioController,
      playList,
    },
    data () {
      return {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        appInfo: this.$store.state.AppInfo,
        displayQueue: {
          hashMore: false,
          searchIndex: 0,
          searchText: '',
          items: [],
        },
      }
    },
    methods: {
      ...mapMutations([
        'addTrack',
        'removeTrack',
        'togglePlayList',
      ]),
      existsResult () {
        var result = this.displayQueue;
        return Array.isArray(result.items) &&
          result.items.length > 0;
      },
      initSearch () {
        var inputArea = this.$refs.searchInputArea;
        this.displayQueue.items = [];
        this.displayQueue.searchIndex = 0;
        this.displayQueue.searchText = inputArea.value;
        this.search();
      },
      nextSearch() {
        this.displayQueue.searchIndex++;
        this.search();
      },
      search () {
        var index = this.displayQueue.searchIndex;
        var searchText = this.displayQueue.searchText;
        var searchUrl = product.createSearchUrl(index, searchText);
        this.$http.get(searchUrl).then(response => {
          if (response.status != 200) return;
          if (response.data.status == 1) {
            var queue = this.displayQueue.items;
            var items = response.data.data.items;
            this.displayQueue.hasMore = items.length > 0;
            Array.prototype.push.apply(queue, items);
            this.$forceUpdate();
          }
        });
      },
      isPlayable () {
        return this.$store.state.AudioData.playList.length > 0;
      },
      play (src) {
        var controller = this.$refs.audioController;
        controller.play(src);
      },
      addPlayList (src) {
        this.addTrack(src);
        this.$refs.messageBox.show('プレイリストに追加しました');
      },
      playListStart (index) {
        var controller = this.$refs.audioController;
        controller.playListStart(index);
      }
    }
  }
</script>

<style>
button {
  cursor: pointer;
}
#wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
}
#main-content {
  flex-grow: 1;
  overflow: hidden;
  border-top: 1px solid #696969;
  position: relative;
}
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 33px;
  font-weight: bold;
  color: #a7a7a7;
  width: 100%;
  text-align: center;
}
#load-more {
  border: 1px solid #808080;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  background-color: #464646;
  outline: none;
  color: white;
}
#search-input {
  padding: 10px;
  display: flex;
  flex-shrink: 0;
  background-color: #e4e4e4;
}
#search-input-area {
  flex-grow: 1;
  margin-right: 10px;
  outline: none;
  font-size: 14px;
  padding: 0 7px;
  border-radius: 10px;
  border: none;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #737373;
}
#search-button {
  padding: 7px 25px;
  background-color: #ffffff;
  color: #292929;
  outline: none;
  border-radius: 10px;
  border: 1px solid #737373;
}
#play-list-button {
  padding: 7px 10px;
  background-color: #ffffff;
  color: black;
  outline: none;
  border-radius: 10px;
  border: 1px solid #737373;
  margin-left: 10px;
  font-weight: bold;
}
#play-list-start-button {
  background-color: #ff0052;
  padding: 7px 10px;
  color: white;
  outline: none;
  border-radius: 10px;
  border: 1px solid #737373;
  flex-grow: 1;
}
#audio-controller {
  box-shadow: 0px 0px 8px #656565;
  position: relative;
  z-index: 200;
}
#search-result {
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}
#play-list {
  position: absolute;
  bottom: -100%;
  right: 0;
  left: 0;
  height: 100%;
  z-index: 110;
  background-color: #ffffff;
  overflow-y: scroll;
  transition: .5s;
}
#wrapper.play-list-open #play-list {
  bottom: 0px;
}
.disable {
  pointer-events: none;
  opacity: .5;
}
.music-list {
  overflow: hidden;
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #c5c5c5;
  display: flex;
}
.music-img {
  width: 70px;
  height: 70px;
}
.music-detail {
  margin-left: 10px;
  flex-grow: 1;
  flex-basis: 0;
  overflow: hidden;
  position: relative;
}
.music-title {
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music-artist {
  color: #797979;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music-list:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.music-select {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  font-size: 11px;
}
.music-play, .music-add-list, .music-remove-list {
  cursor: pointer;
  flex: 1;
  text-align: center;
  color: white;
  padding: 3px 0;
  border-radius: 5px;
}
.music-play {
  margin-right: 5px;
  background-color: #3e83b5;
}
.music-add-list {
  margin-left: 5px;
  background-color: #ff2360;
}
.music-remove-list {
  margin-left: 5px;
  background-color: #1d1d1d;
}
</style>
