import store from '@/store/store'

export default {
  authenticated: (to, from, next) => {
    if (store.state.isUserLoggedIn) {
      next()
    } else {
      next('/signup')
    }
  },
  unAuthenticated: (to, from, next) => {
    if (!store.state.isUserLoggedIn) {
      next()
    } else {
      next('/signin')
    }
  },
}