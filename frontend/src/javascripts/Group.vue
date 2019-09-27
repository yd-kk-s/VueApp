<template>
  <div class="sidebar">
    <div class="group-modal-window">
      <div class="group">Group作成</div>
      <button class="g_btn" @click="openModal">＋</button>

<!-- 作成されたグループの名前一覧 -->
        <a class="group"
        v-for="group in groups"
        v-bind:key="group.id"
        @click="btnClick(group.id)">
          <router-link :to="{ name: 'group', params: {id: group.id} }">
            {{ group['name'] }}
          </router-link>
        </a>

<!-- モーダルウィンドウ -->
      <modal @close="closeModal" v-if="modal">
        <template slot="header">
          <button class="btn" @click="closeModal">×</button>
        </template>
        <template slot="title">
          <p>グループ作成</p>
        </template>
        <template slot="message">
          <form action='/groups' method="post" >
            <input class="textarea" v-model="name" name="name" placeholder="group name">
            <button class="btn">⬆︎</button>
          </form>
        </template>
      </modal>
    </div>
  </div>

</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import Modal from './Modal.vue'
import { bus } from './App.vue';

export default {
  components: { Modal },
  props: route => ({ id: Number(route.params.id) }),
  data () {
    return {
      modal: false,
      name: '',
      groups: [],
      form: true,
    }
  },
  created() {
    axios
    .get('http://localhost:3000/groups.json')
      .then(response => {
        this.groups = response.data
      })
  },
  methods: {
    btnClick(id) {
      bus.$emit('event', `http://localhost:3000/groups/${id}/messages.json`)
      bus.$emit('bus-event', this.form);
    },
    openModal() {
      axios
      this.modal = true
    },
    closeModal(){
      this.modal = false
    }
  }
}
</script>

<style>
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
    width: 105px;
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
  .textarea {
    width: 450px;
    height: 40px;
    margin: 40px;
    border: solid 1px;
  }
</style>
