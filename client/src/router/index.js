import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage'
import SignUp from '@/components/pages/SignUp'
import SignIn from '@/components/pages/SignIn'
import SignUpContinue from '@/components/pages/SignUpContinue'

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
      path: '/signup-continue',
      name: 'SignUpContinue',
      component: SignUpContinue
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
