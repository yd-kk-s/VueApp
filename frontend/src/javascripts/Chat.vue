<template>
  <div class="content">
    <div class="group-name-area">
      <p>{{ name }}</p>
    </div>
    <div class="message-area">
      <p class="message" v-for="message in messages" data-group_id=""
          v-bind:key="message.id">
        {{ message['message'] }}
      </p>
    </div>
    <div class="submit-area" v-if="form">
      <input class="text-area" v-model="message" placeholder="メッセージを入力してください" >
      <button class="btn" v-if="chatChannel" @click="speak">⬆︎</button>
    </div>
  </div>
</template>

<script>
  import App from './App.vue'
  import axios from 'axios'
  import { bus } from './App.vue'

  export default {
    data() {
      return {
        message: "",
        messages: [],
        name: "",
        chatChannel: null,
        form: false
      }
    },
    created: function() {
      let group_id = this.$route.params
      this.changeApi(`http://localhost:3000/groups/${group_id["id"]}/messages.json`)
      this.chatChannel = this.$cable.subscriptions.create( "ChatChannel",{
        received: (data) => {
          this.messages.push(data)
          this.message = ""
        }
      })
    },
    mounted: function() {
      bus.$on('event', this.changeApi)
      bus.$on('bus-event', this.changeMethod)
    },
    methods: {
      changeApi(api) {
        this.api = axios.get(api).then(response => {
          this.messages = response.data.messages
          this.name = response.data.group_name
        })
      },
      changeMethod(form) {
          this.form = form;
      },
      speak() {
        if ( this.message.length > 0 ) {
          let group_id = this.$route.params
          this.chatChannel.perform('speak', {
            message: this.message,
            group_id: group_id
          })
        } else {
          alert('メッセージを入力してください')
        }
      }
    }
  }
</script>

<style>
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
    height: 114%;
    overflow: scroll;
    border: solid 1px #4b504d;
    margin: 5px 3px 0px 0px;
  }
  .text-area {
    width: 1020px;
    height: 40px;
    margin: 30px;
    border: solid 1px;
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
</style>
