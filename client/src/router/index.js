import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage'
import SignUp from '@/components/pages/SignUp'
import SignIn from '@/components/pages/SignIn'
import ContinueSignupLinkedin from '@/components/pages/ContinueSignupLinkedin'
import ContinueSignupFacebook from '@/components/pages/ContinueSignupFacebook'
import Feed from '@/components/pages/Feed'
import Profile from '@/components/pages/Profile'
import Management from '@/components/pages/Management'
import FacebookLoading from '@/components/pages/FacebookLoading'
import LinkedINLoading from '@/components/pages/LinkedINLoading'
import CreateFeed from '@/components/pages/CreateFeed'
import AuthenticationPolicy from '@/policies/authenticationPolicy'
import store from '@/store/store'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: AuthenticationPolicy.unAuthenticated
    },
    {
      path: '/continue-signup-linkedin',
      name: 'ContinueSignupLinkedin',
      component: ContinueSignupLinkedin,
      beforeEnter: AuthenticationPolicy.authenticated
    },
    {
      path: '/continue-signup-facebook',
      name: 'ContinueSignupFacebook',
      component: ContinueSignupFacebook,
      beforeEnter: AuthenticationPolicy.authenticated
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: AuthenticationPolicy.unAuthenticated
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      beforeEnter: AuthenticationPolicy.authenticated
    },
    {
      path: '/feed/create',
      name: 'CreateFeed',
      component: CreateFeed,
      beforeEnter: AuthenticationPolicy.super_admin
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthenticationPolicy.authenticated
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
      beforeEnter: AuthenticationPolicy.authenticated
    },
    {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('setToken', null)
        store.dispatch('setUser', null)
        next('/');
      }
    },
    {
      path: '/linkedIn',
      name: 'LinkedINLoading',
      component: LinkedINLoading
    },
    {
      path: '/facebook',
      name: 'FacebookLoading',
      component: FacebookLoading
    },
  ]
})
