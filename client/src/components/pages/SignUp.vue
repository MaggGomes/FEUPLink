<template>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
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
            <v-btn id="linkedin-signup-button" large dark class="signup-button blue">Sign up with LinkedIn</v-btn>        
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { bus } from '@/main'
import FBSignInButton from 'vue-facebook-signin-button'
import Vue from 'vue';

Vue.use(FBSignInButton)

export default {
  name: 'SignUp',
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
    async signup () {
      try {
        await AuthenticationService.signup({
          name: this.name,
          email: this.email,
          hashedPassword: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
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
  width:60%;
  height:60px;
  font-size: 125%;
  margin-left: 10%;
}
</style>
