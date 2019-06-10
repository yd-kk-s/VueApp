<template>
  <div class="wrapper">
    <Group />
    <Chat />
  </div>
</template>

<script>
  import Vue from 'vue';
  import Group from './Group.vue'
  import Chat from './Chat.vue'

  export var bus = new Vue();

  export default {
    components: { Group,
                  Chat
                }
  }
</script>

<style>
  html, body {
    margin: auto;
    width: 100%;
    height: 100%;
  }
  p {
    font-size: 20px;
        margin: 20px;
  }
  h1 {
    font-size: 35px;
  }
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
