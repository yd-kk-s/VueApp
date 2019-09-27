Vue.config.devtools = true

import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import ActionCable from 'actioncable';
import Chat from './Chat.vue'

Vue.use(VueRouter)

const cable = ActionCable.createConsumer('ws:localhost:3000/cable')

Vue.prototype.$cable = cable
Vue.config.productionTip = false

const routes = [
  {
    name: 'group',
    path: '/groups/:id(\\d+)/messages',
    component: Chat,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  data: {
    showModal: false
  },
  components: {
    App,
  template: '<App]/>'
  },
  render: h => h(App)
})
