<template>
  <div class="text-lg-center text-md-center text-sm-center">
      <h1>Sign-In</h1>

      <input type="email" name="email" placeholder="email" v-model="email">
      <input type="password" name="password" placeholder="password" v-model="password">
      <button @click="signin">Sign-In</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signin () {
      const response = await AuthenticationService.signin({
        email: this.email,
        password: this.password
      }).catch((err) => { console.log(err); });
      console.log(response.data)
    }
  }
}
</script>

<style>

</style>
