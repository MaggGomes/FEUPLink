<template>
    <v-btn v-on:click="signIn" large class="blue darken-3" color="primary"> 
      <v-icon color="white" large left>fab fa-facebook</v-icon>
      <div v-if="this.$route.name === 'SignUp'">
        {{$t('signup')}} {{$t('facebook')}}
      </div>
      <div v-else-if="this.$route.name == 'SignIn'">
        {{$t('signin')}} {{$t('facebook')}}
    </div>     
    </v-btn> 
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {  
  methods: {
    async signIn() {
        try {

          let client_id = '1602254696490199'; 
          let redirect_uri = 'https://localhost:8080/facebook'; 
          let state = 'Feup-Link-state'; 
          
          window.location.replace(
            `https://www.facebook.com/v2.12/dialog/oauth?` +
            `response_type=code&` +
            `client_id=${client_id}&` +
            `redirect_uri=${redirect_uri}&` +
            `state=${state}&` +
            'scope=email,public_profile,user_birthday,user_location'
          );
        
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
