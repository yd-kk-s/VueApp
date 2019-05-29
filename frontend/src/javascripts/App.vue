<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="group-modal-window">
        <div class="group">Group</div>
        <button class="g_btn">＋</button>
      </div>
    </div>
    <div class="content">
      <div class="group-name-area">
        <p>group name</p>
      </div>
      <div class="message-area">
        <p>message area</p>
        <p class="message" v-for="message in messages"
            v-bind:key="message.id">
          {{ message['message'] }}
        </p>
        <div class="submit-area">
          <input class="text-area" v-model="message" placeholder="message here" >
          <button class="btn" v-if="chatChannel" @click="speak">⬆︎</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      message: "",
      messages: [],
      chatChannel: null,
    };
  },
  created() {
      axios
      .get('http://localhost:3000/messages.json')
      .then(response => {
        this.messages = response.data
      })
    this.chatChannel = this.$cable.subscriptions.create( "ChatChannel",{
      received: (data) => {
        this.messages.push(data)
        this.message = ""
      },
    })
  },
  methods: {
    speak() {
      this.chatChannel.perform('speak', {
        message: this.message,
      });
    },
  },
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
  .sidebar {
    width: 250px;
    height:124%;
    float: left;
    background-color: cadetblue;
    opacity: 0.8;
    border: solid 1px #000000;
  }
  .group {
      font-size: 20px;
      margin: 15px;
      float: left;
  }
  .content {
    width: calc(100% - 255px);
    height: 100%;
    float: right;
  }
  .group-name-area {
    height: 70px;
    border: solid 1px #000000;
    margin: 0px 3px 0px 0px;
  }
  .message-area {
    height: 100%;
    overflow: scroll;
    border: solid 1px #4b504d;
    margin: 5px 3px 0px 0px;
  }
  .submit-area {
    width: 1180px;
    height: 100px;
    position: fixed;
    bottom: 0px;
    right: 3px;
    background-color: white;
    border: solid 1px #000000;
  }
  .text-area {
    width: 1020px;
    height: 40px;
    margin: 30px;
    border: solid 1px;
  }
  .btn {
    font-size: 20px;
    border: solid 1px;
    width: 55px;
  }
  .g_btn {
    font-size: 20px;
    border: solid 1px;
    width: 55px;
    float: right;
    margin: 10px;
  }
</style>
