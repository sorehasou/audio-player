<template>
  <div id="wrapper">
    <div id="app-title">
      <span id="app-name">Audio Player</span>
      <span id="app-version">{{version}}</span>
    </div>
    <div id="search-box">
      <div id="search-input">
        <input v-model="searchText">
        <button @click="e=>search(true)">検索</button>
      </div>
      <div id="search-result">
        <div v-if="existsResult()">
          <div v-for="item in this.result.items">
            {{item.title}}
          </div>
          <button v-if="result.has_more" @click="e=>search(false)">
            次のページへ
          </button>
        </div>
        <div v-else>
          検索結果なし
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import product from '@/product';
  import $ from 'jquery';

  export default {
    name: 'main-page',
    data () {
      return {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        searchText: '',
        searchIndex: 0,
        result: {},
      }
    },
    methods: {
      existsResult () {
        return Array.isArray(this.result.items) &&
          this.result.items.length > 0;
      },
      search (init) {
        var index = this.searchIndex = init ? 0 : this.searchIndex + 1;
        var searchText = this.searchText;
        var searchUrl = product.createSearchUrl(index, searchText);
        console.log(searchUrl);
        this.$http.get(searchUrl).then(response => {
          if (response.status != 200) return;
          if (response.data.status == 1) {
            console.dir(response.data.data);
            $.extend(this.result, response.data.data);
              this.$forceUpdate();
          }
        });
      }
    }
  }
</script>
