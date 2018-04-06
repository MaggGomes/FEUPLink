<template>
   <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12">
              <v-toolbar dark class="red darken-4">
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <form autocomplete="off">
                <v-text-field :email="email"
                  prepend-icon="email"
                  label="Email"
                  v-model="email"
                ></v-text-field>
                <v-text-field :password="password"
                  prepend-icon="lock"
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>               
              </form>
               <div class="danger-alert" v-html="error" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="signin" dark class="red darken-4">Continue</v-btn>
                <v-btn to="/signup" dark class="red darken-4">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>             
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              Sign in with Facebook
            </fb-signin-button>              
            <br /><br />
            <v-card-media v-bind:src="require('@/assets/Linkedin.png')" height="100px">
            </v-card-media>              
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import AuthenticationService from '@/services/AuthenticationService'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(FBSignInButton)

export default {
  name: 'SignIn',
  data () {
    return {
       fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      },
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async signin () {
      try {
        await AuthenticationService.signin({
          email: this.email,
          hashedPassword: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }      
    },
     onSignInSuccess (response) {
      FB.api('/me', user => {
        console.log(`Good to see you, ${dude.name}.`)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style scopped>
.error {
  color: red;
}
.fb-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  width: 40%;
  background-color: #4267b2;
  color: #fff;
}
</style>
