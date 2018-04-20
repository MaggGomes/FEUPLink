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
    name: 'LinkedINLoading',
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
        let data = (await AuthenticationService.signup_linkedin({code,state,error})).data;
        
        this.$store.dispatch('setToken', data.token)
        this.$store.dispatch('setUser', data.person)
        
        // check if needs to complete authentication
        if (data.continueSignupLinkedin) {
          this.$router.push('ContinueSignupLinkedin')
        }else {
          this.$router.push('Feed')
        }
        
      }catch(error){
        this.$router.push('/')
      }
    },
}
</script>

<style scoped>
   
    
</style>

