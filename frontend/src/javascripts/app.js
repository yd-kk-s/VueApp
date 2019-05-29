// entryファイル

Vue.config.devtools = true
import Vue from 'vue';
import App from './App.vue';
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer('ws:localhost:3000/cable');
Vue.prototype.$cable = cable;

new Vue({
  el: '#app',
  components: {
    App,
  template: '<App]/>',
  },
  render: h => h(App)
});
