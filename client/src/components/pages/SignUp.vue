<template>
  <div class="text-lg-center text-md-center text-sm-center">
      <h1>Sign-Up</h1>

      <input type="text" name="name" placeholder="name" v-model="name">
      <br>
      <input type="email" name="email" placeholder="email" v-model="email">
      <br>
      <input type="password" name="password" placeholder="password" v-model="password">
      <br>
      <div class="error" v-html="error" />
      <button @click="signup">Sign-up</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async signup () {
      try {
        await AuthenticationService.signup({
          name: this.name,
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
