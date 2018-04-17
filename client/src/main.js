// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'

// Importing vuetify stuff
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

Vue.use(Vuetify)
Vue.use(VeeValidate)

Vue.config.productionTip = false

sync(store, router)

console.log(process.env.NODE_ENV);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})