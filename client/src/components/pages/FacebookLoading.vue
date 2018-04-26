<template>
  <v-content >
	  <v-container fluid >
      <buffering-wheel />
    </v-container>
  </v-content>
</template>

<script>
import BufferingWheel from '@/components/elements/BufferingWheel'
import AuthenticationService from '@/services/AuthenticationService'


export default {
    name: 'FacebookLoading',
    components: {
      BufferingWheel
    },
    data () {
        return {
        }
    },
    mounted: async function() {
      // just a callback for the linkedIn oauth  
      
      var url = new URL(window.location.href);
      var code = url.searchParams.get("code");
      var state = url.searchParams.get("state");
      var error = url.searchParams.get("error");      

      try{        
        let data = (await AuthenticationService.signup_facebook({code,state,error})).data;
        this.$store.dispatch('setToken', data.token)
        this.$store.dispatch('setUser', data.person)
        
        // check if needs to complete authentication
        if (data.continueSignupFacebook) {
          this.$router.push('/continue-signup-facebook')
        }else {
          this.$router.push('/feed')
        }
        
      }catch(error){       
        this.$router.push('/');
      }
      //debugger
    },
}
</script>

<style scoped>
   
    
</style>

