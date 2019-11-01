<template>
  <div v-show="isShow" class="message-box" @click="close">
    <div class="message-area">
      {{msg}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false,
        msg: '',
      }
    },
    methods: {
      show (msg) {
        this.msg = msg;
        this.isShow = true;
        setTimeout(this.close, 3000);
      },
      close () {
        this.isShow = false;
        this.msg = '';
      }
    }
  }
</script>

<style>
.message-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(23, 23, 23, 0.82);
  z-index: 199;
  white-space: nowrap;
}
.message-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
