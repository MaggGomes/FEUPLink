// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'
import * as VueGoogleMaps from "vue2-google-maps";

// Importing vuetify stuff
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import messages from './assets/locales.json'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(VueI18n)
Vue.use(Vuetify)
Vue.use(VeeValidate)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  //silentTranslationWarn: true
})

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCch6DI0UVWidRXGpAwvIbDf03I3aY7c8I",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
