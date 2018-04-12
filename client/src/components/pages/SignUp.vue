<template>
    <v-content>
      <v-container fluid>
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12">
              <v-toolbar dark class="red darken-4">
                <v-toolbar-title>Create new account</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <form autocomplete="off">
                <v-text-field :name="name"
                  prepend-icon="person"
                  label="Name"
                  v-model="name"
                ></v-text-field>
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
                <v-text-field
                  prepend-icon="lock"
                  label="Repeat password"
                  type="password"
                  v-model="repeatPassword"
                ></v-text-field>
              </form>
               <div class="danger-alert" v-html="error" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="continueSignup" to="/signup-continue" dark class="red darken-4">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>
             <fb-signin-button
              :params="FBSignUpParams"
              @success="onFBSignUpSuccess"
              @error="onFBSignUpError">
              <v-btn id="facebook-signup-button" class="signup-button indigo" large dark>Sign up with Facebook</v-btn>
            </fb-signin-button><br>
            <linked-in-button class="signup-button" ></linked-in-button>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import LinkedInButton from '@/components/elements/LinkedInButton'
import { bus } from '@/main'
import FBSignInButton from 'vue-facebook-signin-button'
import Vue from 'vue';

Vue.use(FBSignInButton)

export default {
  name: 'SignUp',
   components: {
    LinkedInButton,
  },
  data () {
    return {      
      FBSignInParams: {
        scope: '',
        return_scopes: true
      },
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      error: null
    }
  },
  methods: {
    continueSignup: function() {
      bus.$emit('signupContinue', Array(this.name, this.email, this.password))
    },
    onFBSignUpSuccess (response) {
      FB.api('/me', user => {
      })
    },
    onFBSignUpError (error) {
    }
  }
}
</script>

<style scopped>
.signup-button {
  width: 100%;
  height:60px;
  font-size: 125%;
}
</style>
