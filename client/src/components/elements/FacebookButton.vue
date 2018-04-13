<template>
    <v-btn v-on:click="signIn" class="signup-button indigo" large dark>   
    Sign up with Facebook
    </v-btn>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {  
  methods: {
    async signIn() {
        try {
          console.log("Facebook Sign Up");
          /*
          let client_id = '1602254696490199'; 
          let redirect_uri = 'https://localhost:8081/signup_facebook'; 
          let state = 'Feup-Link-state'; 
          
          window.location.replace(`https://www.facebook.com/v2.12/dialog/oauth?` +
                `response_type=code&` +
                `client_id=${client_id}&` +
                `redirect_uri=${redirect_uri}&` +
                `state=${state}`);
          */        
        FB.login(
          function(res){
            switch(res.status){
              case 'connected':
                console.log('Facebook Login Suceeded!');
                console.log(res.authResponse);
                FB.api('/me', function(response) {
                  console.log(response);
                });
                /*
                try { AuthenticationService.signup_facebook(res.authResponse); }
                catch (error) { this.error = error.response.data.error }*/
              break;
              case 'not_authorized':
                console.log('Facebook Login Not Authorized!');
              break;
              case 'unknown':
                console.log('Facebook Login Status Unknown!');
              break;
            }
          }, {scope:'email'});
        
      } catch (error) {
        this.error = error.response.data.error
        console.log('Error-> ' + error);
      }
    },   
  }
}
</script>

<style scopped>

</style>
