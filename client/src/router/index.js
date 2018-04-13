import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage'
import SignUp from '@/components/pages/SignUp'
import SignIn from '@/components/pages/SignIn'
import Feed from '@/components/pages/Feed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    }
  ]
})
