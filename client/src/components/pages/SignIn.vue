<template>
    <v-content>
      <v-container fluid v-if="loading">
        <buffering-wheel />
      </v-container>
      <v-container fluid v-else>
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md5 id="main_card">
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <v-form autocomplete="off" ref="form" lazy-validation>
                <v-text-field :email="email"
                  prepend-icon="email"
                  label="Email"
                  :rules="emailRules"
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field :password="password"
                  prepend-icon="lock"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  v-model="password"
                  required
                ></v-text-field>                
              </v-form>
               <div class="danger-alert" v-html="error" />
              </v-card-text>             
              <v-card-actions>
                <v-checkbox style="margin-left:20px;margin-top:25px"
                  :label="`Remember me`"
                  v-model="checkbox"
                ></v-checkbox>
                <v-spacer></v-spacer>                   
                  Not a member?
                  <v-btn to="/signup" small flat color="primary" class="">Sign up!
                  </v-btn>
                <v-btn v-on:click="signin" dark >Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md5 id="social">
            <facebook-button class="signin-button elevation-12"></facebook-button><br>
            <linked-in-button class="signin-button elevation-12" ></linked-in-button>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import Vue from "vue";
import AuthenticationService from "@/services/AuthenticationService";
import FacebookButton from "@/components/elements/FacebookButton";
import LinkedInButton from "@/components/elements/LinkedInButton";
import BufferingWheel from "@/components/elements/BufferingWheel";

export default {
  name: "SignIn",
  components: {
    LinkedInButton,
    BufferingWheel,
    FacebookButton
  },
  data() {
    return {
      loading: false,
      valid: false,
      email: "",
      password: "",
      checkbox: "",
      error: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ||
          "Password must be valid"
      ]
    };
  },
  methods: {
    async signin() {
      try {
        this.loading = true;

        let resp = (await AuthenticationService.signin({
          email: this.email,
          hashedPassword: this.password
        })).data;

        if (resp != null) {
          this.$store.dispatch("setToken", resp.token);
          this.$store.dispatch("setUser", resp.person);
          this.loading = false;
          this.$router.push("Feed");
        }
      } catch (error) {
        this.loading = false;
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style scopped>
.error {
  color: red;
}
.signin-button {
  width: 100%;
  height: 60px;
  font-size: 125%;
}
.toolbar__content, button.btn{
  background-color:rgb(140,45,25)!important;
}
@media only screen and (max-width: 960px) and (min-width: 600px){
  #main_card {
    margin: 10px 20%;
  }
  #social {
    margin: 10px 40%;
  }
}

</style>
