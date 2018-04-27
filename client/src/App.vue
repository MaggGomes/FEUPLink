<template>
  <v-app>

  <div id="app">
  
    <v-navigation-drawer app temporary v-model="sideNav" absolute>
      <v-list>
        <v-list-tile v-if="$store.state.isUserLoggedIn" v-for="signnedInItem in signnedInMenuItens" :key="signnedInItem.title" route :to="signnedInItem.link">
          <v-list-tile-content>
            {{ signnedInItem.title }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else v-for="menuItem in menuItens" :key="menuItem.title" route :to="menuItem.link">
          <v-list-tile-content>
            {{ menuItem.title }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
    <v-toolbar app dark class="red darken-4">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="font-color">
        <router-link to="/" tag="span" style="cursor: pointer">FEUPLink</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.isUserLoggedIn" class="hidden-xs-only">
        <v-btn flat v-for="signnedInItem in signnedInMenuItens" :key="signnedInItem.title" router :to="signnedInItem.link">{{ signnedInItem.title }}</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-xs-only">
        <v-btn flat v-for="menuItem in menuItens" :key="menuItem.title" router :to="menuItem.link">{{ menuItem.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <v-content>
      <v-container fluid>
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
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      menuItens: [
        {
          title: "Sign-In",
          link: "/signin"
        },
        {
          title: "Sign-Up",
          link: "/signup"
        }
      ]
    };
  },
  computed: {
    signnedInMenuItens() {
      let userId = (this.$store.state.user != undefined ? this.$store.state.user.id : 0)
      return [
        {
          title: "Home",
          link: "/"
        },
        {
          title: "Feed",
          link: "/feed"
        },
        {
            title: 'Management',
            link: "/management"
        },
        {
          title: "Profile",
          link: "/profile/" + userId
        },
        {
          title: "Logout",
          link: "/logout"
        }
      ];
    }
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.font-color {
  color: white;
}

@media screen and (min-width: 960px) {
  .max-width {
    width: 80%; 
    margin: 0 auto;
  }   
}
</style>
