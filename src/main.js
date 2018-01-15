import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueGoodTable from 'vue-good-table'

Vue.use(VueResource);
Vue.use(VueGoodTable);

new Vue({
  el: '#app',
  render: h => h(App)
})
