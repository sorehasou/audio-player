<template>
  <div>
    <audio controls ref="audioPlayer" autoplay loop>
    </audio>
  </div>
</template>

<script>
  export default {
    methods: {
      play (src) {
        this.$refs.audioPlayer.src = src;
      }
    }
  }
</script>

<style>
audio {
  width: 100%;
}
</style>
