<template>
    <v-btn v-on:click="signIn" large class="light-blue darken-1" color="primary" > 
      <v-icon color="white" large left>fab fa-linkedin</v-icon>
      <div v-if="this.$route.name === 'SignUp'">
          {{$t('signup')}} {{$t('linkedin')}}
        </div>
        <div v-else-if="this.$route.name == 'SignIn'">
          {{$t('signin')}} {{$t('linkedin')}}
      </div>
    </v-btn> 
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  methods: {
    async signIn() {
        try {

          let client_id = '78tdph8nd2st08'; 
          let redirect_uri = 'http://localhost:8080/linkedin'; 
          let state = 'Feup-Link-state'; 
          
          window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?` +
                `response_type=code&` +
                `client_id=${client_id}&` +
                `redirect_uri=${redirect_uri}&` +
                `state=${state}`);
      } catch (error) {
        this.error = error.response.data.error
        console.log('Error: ' + error);
      }
    },   
  }
}
</script>

