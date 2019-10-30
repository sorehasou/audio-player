<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'audio-player'
  }
</script>

<style>
  html, body, #app {
    font-family: meiryo;
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
</style>
