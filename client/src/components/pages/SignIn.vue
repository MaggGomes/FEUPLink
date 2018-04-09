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
               <div class="danger-alert" v-html="error"/>
              </v-card-text>             
              <v-card-actions>
                <v-checkbox style="margin-left:20px;margin-top:25px"
                  :label="`Remember me`"
                  v-model="checkbox"
                ></v-checkbox>
                <v-spacer></v-spacer>                   
                  Not a member?
                  <v-btn to="/signup" small flat color="primary" class="">Sign up!
                  </v-btn>
                <v-btn v-on:click="signin" dark class="red darken-4">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>             
            <fb-signin-button
              :params="FBSignInParams"
              @success="onFBSignInSuccess"
              @error="onFBSignInError">
              <v-btn id="facebook-signin-button" class="signin-button indigo" large dark>   
                Sign in with Facebook
                </v-btn>
            </fb-signin-button><br>
            <v-btn id="linkedin-signin-button" large dark class="signin-button blue">Sign in with LinkedIn</v-btn>
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
       FBSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      },
      email: '',
      password: '',
      checkbox:'',
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
    async onFBSignInSuccess (response) {
      console.log(response);
       try {
        await AuthenticationService.fbsignin(response.authResponse)
      } catch (error) {
        this.error = error.response.data.error
      }     
    },
    onFBSignInError (error) {
      console.log(error);
    }
  }
}
</script>

<style scopped>
.error {
  color: red;
}
.signin-button {
  width:60%;
  height:60px;
  font-size: 125%;
  margin-left: 10%;
}
/*
.fb-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  width: 50%;
  height: 60px;
  line-height: 55px;
  background-color: #3F51B5;
  color: #fff;
  cursor: pointer;
  text-align: center; 
  vertical-align: middle;
  font-size: 150%;
  font-family: 'Roboto',sans-serif;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-rendering: optimizeLegibility;
}*/
</style>
