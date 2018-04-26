import store from '@/store/store'

export default {
  // to-do add method to verify the user authentication and role
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