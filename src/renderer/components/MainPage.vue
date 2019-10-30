<template>
  <div id="wrapper">
    <div id="search-input">
      <input id="search-input-area" ref="searchInputArea" @keydown.enter="initSearch">
      <button id="search-button" @click="initSearch">検索</button>
    </div>
    <div id="search-result">
      <div v-if="existsResult()">
        <div v-for="item in displayQueue.items" class="music-list">
          <img class="music-img" :src="item.coverURL">
          <div class="music-detail">
            <div class="music-title" @click="play(item.url)">
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
        <div id="no-data">
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

  import audioController from './MainPage/AudioController'

  export default {
    name: 'main-page',
    components: { audioController },
    data () {
      return {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        displayQueue: {
          hashMore: false,
          searchIndex: 0,
          searchText: '',
          items: [],
        },
      }
    },
    methods: {
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
      play (src) {
        var controller = this.$refs.audioController;
        controller.play(src);
      },
      addPlayList (src) {
        alert("準備中");
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
#search-result {
  flex-grow: 1;
  overflow-y: scroll;
  border-top: 1px solid #696969;
}
#no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 33px;
  font-weight: bold;
  color: #a7a7a7;
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
  background-color: #5a5a5a;
}
#search-input-area {
  flex-grow: 1;
  margin-right: 10px;
  outline: none;
  font-size: 14px;
  padding: 0 7px;
  border-radius: 10px;
  border: none;
  background-color: #444444;
  color: white;
}
#search-button {
  border: none;
  padding: 7px 25px;
  background-color: #464646;
  color: white;
  outline: none;
  border-radius: 10px;
  border: 1px solid #737373;
}
#audio-controller {
  box-shadow: 0px 0px 8px #656565;
  position: relative;
  z-index: 1;
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
.music-play, .music-add-list {
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
</style>
