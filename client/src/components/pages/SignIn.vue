<template>
   <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm10 md5>
            <v-card class="elevation-12">
              <v-toolbar dark class="red darken-4">
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <form ref="form" lazy-validation>
                <v-text-field :email="email"
                  prepend-icon="email"
                  label="Email"
                  :rules="emailRules"
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field :password="password"
                  prepend-icon="lock"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  v-model="password"
                  required
                ></v-text-field>                
              </form>
               <div class="danger-alert" v-html="error" />
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
          <v-flex xs12 sm12 md5>          
            <fb-signin-button
              :params="FBSignInParams"
              @success="onFBSignInSuccess"
              @error="onFBSignInError">
              <v-btn id="facebook-signin-button" class="signin-button indigo elevation-12" large dark>   
                Sign in with Facebook
                </v-btn>
            </fb-signin-button><br>
               <linked-in-button class="signin-button elevation-12" ></linked-in-button>
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
import LinkedInButton from '@/components/elements/LinkedInButton'

Vue.use(FBSignInButton)

export default {
  name: 'SignIn',
  components: {
      LinkedInButton,
  },
  data () {
    return {
       FBSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      },
      valid: false,
      email: '',
      password: '',
      checkbox:'',
      error: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must be valid'
      ]
    }
  },
  methods: {
    async signin () {
      if(this.$refs.form.validate()){
        try {
          await AuthenticationService.signin({
            email: this.email,
            hashedPassword: this.password
          })
        } catch (error) {
          this.error = error.response.data.error
        }   
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
  width: 100%;
  height:60px;
  font-size: 125%;
}

</style>
