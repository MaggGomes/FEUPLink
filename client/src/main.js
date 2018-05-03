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
import MultiLanguage from 'vue-multilanguage'

Vue.use(MultiLanguage, {
	default: 'en',
  en: {
    close: 'Close',
    waning:'Warning!',
    cancel: 'Cancel',
    confirm: 'Confirm',
    dismiss: 'Dismiss',
  },
  pt: {
    close: 'Fechar',
    waning:'Cuidado!',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    dismiss: 'Descartar',
  }
})
Vue.use(Vuetify)
Vue.use(VeeValidate)

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})