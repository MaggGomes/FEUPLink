<template>
  <v-app>

    <div id="app">

      <v-navigation-drawer app temporary v-model="sideNav" absolute>
        <v-list>
          <v-list-tile v-if="$store.state.isUserLoggedIn" v-for="signnedInItem in signnedInMenuItens" :key="signnedInItem.title" route :to="signnedInItem.link">
            {{ $t(signnedInItem.title) }}
          </v-list-tile>
          <v-list-tile v-else>
            <v-list-tile-content v-for="menuItem in menuItens" :key="menuItem.title" route :to="menuItem.link">
              {{ $t(menuItem.title) }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar dark class="main-bar">
        <v-container class="main-container">
          <v-layout row>

            <v-flex class="hidden-sm-and-down">
              <v-toolbar-title >
                <router-link to="/" tag="span" style="cursor: pointer">
                  <v-avatar tile class="main-logo">
                    <img v-bind:src="logo" alt="FEUPLink">
                  </v-avatar>              
                </router-link>                    
              </v-toolbar-title>
            </v-flex>           

            <v-flex class="hidden-md-and-up">
              <v-layout>
                <v-toolbar-side-icon style="margin: 0px;" @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
                <v-flex>
                  <v-layout justify-end>
                    <v-menu>
                      <v-btn class="language-dropdown-sm-and-md" slot="activator">
                        {{this.$i18n.locale}}
                        <v-icon large left>arrow_drop_down</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile v-for="language in Object.keys(this.$i18n.messages)" :key="language" @click="changeLanguage(language)">
                          <v-list-tile-title>{{ language }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                    <v-toolbar-title>
                      <router-link to="/" tag="span" style="cursor: pointer">
                        <v-avatar tile class="mini-logo">
                          <img :src="minilogo" alt="IconFeup">
                        </v-avatar>             
                      </router-link>                    
                    </v-toolbar-title>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex> 
                       
            <v-flex class="main-bar-content hidden-sm-and-down">
              <v-layout justify-end>    
                <v-toolbar-items flex v-if="$store.state.isUserLoggedIn" >
                  <v-btn flat v-for="signnedInItem in signnedInMenuItens" :class="signnedInItem.title" :key="signnedInItem.title" router :to="signnedInItem.link">{{ $t(signnedInItem.title) }}</v-btn>
                  <v-menu>
                    <v-btn slot="activator">
                      {{this.$i18n.locale}}
                      <v-icon large left>arrow_drop_down</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="language in Object.keys(this.$i18n.messages)" :key="language" @click="changeLanguage(language)">
                        <v-list-tile-title>{{ language }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-toolbar-items>
                <v-toolbar-items flex v-else>
                  <v-btn flat v-for="menuItem in menuItens" :class="menuItem.title" :key="menuItem.title" router :to="menuItem.link">{{ $t(menuItem.title) }}</v-btn>
                  <v-menu>
                    <v-btn slot="activator">
                      {{this.$i18n.locale}}
                      <v-icon large left>arrow_drop_down</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="language in Object.keys(this.$i18n.messages)" :key="language" @click="changeLanguage(language)">
                        <v-list-tile-title>{{ language }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-toolbar-items>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-toolbar>

      <v-content>
        <v-container fluid pa-0>
          <div class="max-width">
            <router-view></router-view>
          </div>
        </v-container>
      </v-content>
      <v-footer absolute app></v-footer>
    </div>
  </v-app>
</template>

<script>
import logo from "./assets/FEUPLinklogo.png";
import minilogo from "./assets/IconFeup.png";
import Vue from "vue";

export default {
  name: "App",
  data() {
    return {
      minilogo: minilogo,
      logo: logo,
      sideNav: false,
      menuItens: [
        {
          title: "signin", //"Sign-In",
          link: "/signin"
        },
        {
          title: "signup", //"Sign-Up",
          link: "/signup"
        }
      ]
    };
  },
  methods: {
    changeLanguage(language) {
      this.$cookies.set("locale", language);
      this.$i18n.locale = language;
    }
  },
  created: function() {
    let locale = this.$cookies.get("locale");
    if (locale === null) {
      locale = navigator.language; //|| navigator.userLanguage
      if (locale.includes("pt")) locale = "pt";
      else locale = "en";
      this.$cookies.set("locale", locale);
    }
    this.$i18n.locale = locale;
  },
  computed: {
    signnedInMenuItens() {
      let userId =
        this.$store.state.user != undefined ? this.$store.state.user.id : 0;
      return [
        {
          title: "home",
          link: "/"
        },
        {
          title: "feed",
          link: "/feed"
        },
        {
          title: "management",
          link: "/management"
        },
        {
          title: "profile",
          link: "/profile/" + userId
        },
        {
          title: "logout",
          link: "/logout"
        }
      ];
    }
  }
};
</script>

<style>

#locale-dropdown-menu{
  margin-right: -15px;
  margin-bottom: 55px;
  margin-left: 30px;
}

#locale-dropdown{
  font-size: 16px;
  height: 40px;
  width: 25px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: #eeeeee;
}
.main-bar {
  background: url("assets/header.png") no-repeat center;
  background-size: cover;
  background-color: rgb(140, 45, 25);
  margin-bottom: 1.5em;
  height: 50px;
}
.main-bar .btn__content {
  text-transform: none;
}

.main-bar .btn__content:before {
  opacity: 0;
}

.main-logo {
  height: 50px !important;
  width: auto !important;
}
.mini-logo {
  height: 40px !important;
  width: auto !important;
}

.language-dropdown-sm-and-md {
    width: 20px;
    height: 20px;
    background-color: transparent !important;
    font-weight: bold;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 0.6em;
    box-shadow: none !important;
  }

@media (min-width: 991px) {
  .main-bar {
    height: 100px !important;
  }
  .main-bar-content {
    margin-top: 20px;
  }
  .main-bar-content .btn {
    width: 120px;
    height: 25px;
    border: 2px solid #f5f5f5;
    border-radius: 2%;
    color: rgb(140, 45, 25);
    background-color: #f5f5f5 !important;
    font-weight: bold;
    margin-left: 2px;
    margin-right: 2px;
  }
  .main-container {
    margin-top: 10px !important;
    margin-left: 30px !important;
  }
}
.font-color {
  color: white;
}

@media (max-width: 600px) {
  .main-container {
    margin-top: -1.3em !important;
  }
}

@media (min-width: 600px) and (max-width: 991px) {
  .main-bar {
    height: 70px;
  }
}

@media screen and (min-width: 960px) {
  .max-width {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
