<template>
  <div>
      <h1>Sign-Up</h1>

      <input type="email" name="email" placeholder="email" v-model="email">
      <input type="password" name="password" placeholder="password" v-model="password">
      <button @click="signup">Sign-up</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signup () {
      const response = await AuthenticationService.signup({
        email: this.email,
        password: this.password
      }).catch(console.log("error!!"))
      console.log(response.data)
    }
  }
}
</script>

<style>

</style>
