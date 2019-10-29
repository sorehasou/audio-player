<template>
  <div id="wrapper">
    <div id="app-title">
      <span id="app-name">Audio Player</span>
      <span id="app-version">{{version}}</span>
    </div>
    <div id="search-box">
      <div id="search-input">
        <input ref="searchInputArea">
        <button @click="initSearch">検索</button>
      </div>
      <div id="search-result">
        <div v-if="existsResult()">
          <div v-for="item in displayQueue.items">
            <!--<img class="music-title" :src="item.coverURL">-->
            <span class="music-title" @click="play(item.url)">
              {{item.title}}
            </span>
          </div>
          <button v-if="displayQueue.hasMore" @click="nextSearch">
            もっと読み込む
          </button>
        </div>
        <div v-else>
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
    }
  }
</script>

<style>
div#wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
}
div#search-box {
  flex-grow: 1;
  overflow-y: scroll;
}

</style>
