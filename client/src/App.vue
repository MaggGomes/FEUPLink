<template>
  <div id="app">
  
    <v-navigation-drawer app temporary v-model="sideNav" absolute>
      <v-list>
        <v-list-tile v-for="item in menuItens" :key="item.title" route :to="item.link">
          <v-list-tile-content>
            {{ item.title }}
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
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItens" :key="item.title" router :to="item.link">{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        sideNav: false,
        menuItens: [{
            title: 'Sign-In',
            link: "/signin"
          },
          {
            title: 'Sign-Up',
            link: "/signup"
          }
        ]
      }
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  
  .font-color {
    color: white;
  }
</style>
