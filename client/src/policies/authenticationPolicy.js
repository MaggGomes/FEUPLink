import store from '@/store/store'

export default {
  authenticated: (to, from, next) => {
    if (store.state.isUserLoggedIn) {
      next()
    } else {
      next('/')
    }
  },
  unAuthenticated: (to, from, next) => {
    if (!store.state.isUserLoggedIn) {
      next()
    } else {
      next('/')
    }
  }
}