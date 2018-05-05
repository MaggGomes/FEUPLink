// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'

// Importing vuetify stuff
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

Vue.use(VueI18n)

const messages = {
  en: {
    close: 'Close',
    waning:'Warning!',
    cancel: 'Cancel',
    confirm: 'Confirm',
    dismiss: 'Dismiss',
    signin: 'Sign-In',
    signup: 'Sign-Up',
    logout: 'Logout',
    management: 'Management',
    feed: 'Feed',
    profile: 'Profile',
    home: 'Home',
  },
  pt: {
    close: 'Fechar',
    waning:'Atenção!',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    dismiss: 'Descartar',
    signin: 'Entrar',
    signup: 'Registar',
    logout: 'Sair',
    management: 'Administração',
    feed: 'Feed',
    profile: 'Perfil',
    home: 'Início', // Página Inicial?
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

Vue.use(Vuetify)
Vue.use(VeeValidate)

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
