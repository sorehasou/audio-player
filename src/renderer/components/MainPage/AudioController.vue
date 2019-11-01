<template>
  <div>
    <audio controls ref="audioPlayer" autoplay>
    </audio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        playIndex: 0,
        isPlayList: false,
        playList: this.$store.state.AudioData.playList,
      }
    },
    mounted () {
      var _this = this;
      _this.$refs.audioPlayer.onended = function() {
        _this.next();
      };
    },
    methods: {
      play (src) {
        this.isPlayList = false;
        this.$refs.audioPlayer.src = src;
      },
      playListStart (index) {
        this.isPlayList = true;
        this.playIndex = index;
        var url = this.playList[this.playIndex].url;
        this.$refs.audioPlayer.src = url;
      },
      next () {
        if (this.isPlayList && this.playList.length > 0) {
          this.playIndex++;
          if (this.playIndex >= this.playList.length) {
            this.playIndex = 0;
          }
          var url = this.playList[this.playIndex].url;
          this.$refs.audioPlayer.src = url;
        }
      }
    }
  }
</script>

<style>
audio {
  width: 100%;
}
</style>
