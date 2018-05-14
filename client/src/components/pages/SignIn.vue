<template>
   <v-app id="inspire">
    <v-content>
      <v-container fluid v-if="loading">
        <buffering-wheel />
      </v-container>
      <v-container fluid v-else>
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm10 md5>
            <v-card class="elevation-12">
              <v-toolbar dark class="red darken-4">
                <v-toolbar-title>{{$t("signin")}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <v-form autocomplete="off" ref="form" v-model="valid">
                <v-text-field :email="email"
                  prepend-icon="email"
                  :placeholder="$t('email')"
                  :rules="emailRules"
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field :password="password"
                  prepend-icon="lock"
                  type="password"
                  :placeholder="$t('password')"
                  :rules="passwordRules"
                  v-model="password"
                  required
                ></v-text-field>                
              </v-form>
               <div class="danger-alert" v-html="error" />
              </v-card-text>             
              <v-card-actions>
                <v-btn to="/signup" small flat color="primary" class="">
                  {{$t("signup")}}
                </v-btn>
                <v-spacer> </v-spacer>
                <v-btn v-if="valid" v-on:click="signin" dark class="red darken-4">
                  {{$t("continue")}}
                </v-btn>
                <v-btn v-else disabled>{{$t("continue")}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 md5>             
            <facebook-button class="signin-button elevation-12"></facebook-button><br>
            <linked-in-button class="signin-button elevation-12" ></linked-in-button>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import AuthenticationService from "@/services/AuthenticationService";
import FacebookButton from "@/components/elements/FacebookButton";
import LinkedInButton from "@/components/elements/LinkedInButton";
import BufferingWheel from "@/components/elements/BufferingWheel";

export default {
  name: "SignIn",
  valid: false,
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
        v => !!v || this.$i18n.messages[this.$i18n.locale]['email_rule1'],
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          this.$i18n.messages[this.$i18n.locale]['email_rule2']
      ],
      passwordRules: [
        v => !!v || this.$i18n.messages[this.$i18n.locale]['password_rule1'],
        v =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ||
          this.$i18n.messages[this.$i18n.locale]['password_rule2']
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
</style>
