<template>
  <div class="text-lg-center text-md-center text-sm-center">
      <h1>Sign-In</h1>

      <input type="email" name="email" placeholder="email" v-model="email">
      <br>
      <input type="password" name="password" placeholder="password" v-model="password">
      <br>
      <div class="error" v-html="error" />
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
      password: '',
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
    }
  }
}
</script>

<style scopped>
.error {
  color: red;
}
</style>
