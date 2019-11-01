<template>
  <div>
    <template v-if="playList.length > 0">
      <div v-for="(item, index) in playList" class="music-list">
        <img class="music-img" :src="item.coverURL">
        <div class="music-detail">
          <div class="music-title">
            {{item.title}}
          </div>
          <div class="music-artist">
            {{item.artist}}
          </div>
          <div class="music-select">
            <span class="music-play" @click="play(index)">この曲から再生</span>
            <span class="music-remove-list" @click="remove(index)">削除</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-data">
        プレイリストなし
      </div>
    </template>
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
      ]),
      play (index) {
        this.$parent.$refs.audioController.playListStart(index);
      },
      remove (index) {
        this.removeTrack(index);
      }
    }
  }
</script>
