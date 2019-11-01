<template>
  <div>
    <div v-if="playList.length > 0" v-for="item in playList" class="music-list">
      <img class="music-img" :src="item.coverURL">
      <div class="music-detail">
        <div class="music-title">
          {{item.title}}
        </div>
        <div class="music-artist">
          {{item.artist}}
        </div>
        <div class="music-select">
          Now Playing...
        </div>
      </div>
    </div>
    <div v-else>
      プレイリストなし
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        playList: this.$store.state.AudioData.playList,
      }
    },
    methods: {
      ...mapMutations([
        'addTrack',
        'removeTrack',
        'nextTrack',
      ]),
    }
  }
</script>
