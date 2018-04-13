<template>
    <v-btn v-on:click="signIn" large dark class="linkedIn-sign-btn blue">Sign up with LinkedIn</v-btn> 
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

function onLinkedInLoad(){
  console.log("oi-linkedin");
}

export default {
  onLinkedInLoad: function(){
     console.log("oi- linkedin");
  },
  methods: {
    async signIn() {
        try {
          console.log("Sign in");
          let client_id = '78tdph8nd2st08'; 
          let redirect_uri = 'http://localhost:8081/signup_linkedin'; 
          let state = 'Feup-Link-state'; 
          
          window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?` +
                `response_type=code&` +
                `client_id=${client_id}&` +
                `redirect_uri=${redirect_uri}&` +
                `state=${state}`);
      } catch (error) {
        this.error = error.response.data.error
        console.log('Error-> ' + error);
      }
    },   
  }
}
</script>

<style scopped>
.linkedIn-sign-btn{
  background-image: "../../assets/linkedIN/Sign-In-Default.png";
}
</style>
