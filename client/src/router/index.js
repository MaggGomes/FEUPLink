import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage'
import SignUp from '@/components/pages/SignUp'
import SignIn from '@/components/pages/SignIn'
import ContinueSignupLinkedin from '@/components/pages/ContinueSignupLinkedin'
import Feed from '@/components/pages/Feed'
import AuthenticationPolicy from '@/policies/authenticationPolicy'
import store from '@/store/store'
import AuthenticationService from '@/services/AuthenticationService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
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
      name: 'Continue Signup Linkedin',
      component: ContinueSignupLinkedin,
      beforeEnter: AuthenticationPolicy.unAuthenticated
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
      path: '/logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('setToken', null)
        store.dispatch('setUser', null)
        next('/');
      }
    },
    { // just a callback for the linkedIn oauth
      path: '/linkedIn',
      beforeEnter: async (to, from, next) => {
        var url = new URL(window.location.href);
        var code = url.searchParams.get("code");
        var state = url.searchParams.get("state");
        var error = url.searchParams.get("error");


        try{
          let data = (await AuthenticationService.signup_linkedin({code,state,error})).data;
          
          store.dispatch('setToken', data.token)
          store.dispatch('setUser', data.person)
          next('/feed');
        }catch(error){
          console.log(error.response.data.error);
          next('/');
        }

      }
    },
    { // just a callback for the linkedIn oauth
      path: '/facebook',
      beforeEnter: async (to, from, next) => {
        var url = new URL(window.location.href);
        var code = url.searchParams.get("code");
        var state = url.searchParams.get("state");
        var error = url.searchParams.get("error");

        try{
          let data = (await AuthenticationService.signup_facebook({code,state,error})).data;
          
          store.dispatch('setToken', data.token)
          store.dispatch('setUser', data.person)
          next('/feed');
        }catch(error){
          console.log(error.response.data.error);
          next('/');
        }

      }
    }
  ]
})
