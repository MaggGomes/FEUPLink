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
        <v-list-tile v-for="menuItem in menuItens" :key="menuItem.title" route :to="menuItem.link">
          <v-list-tile-content>
            {{ menuItem.title }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
    <v-toolbar floating dark id="main-bar">
      <div id="side-main">
        <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav">
        </v-toolbar-side-icon>
        <v-toolbar-title >
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-avatar tile id="mini-logo" class="hidden-sm-and-up">
              <img
                      :src="minilogo"
                      alt="IconFeup"
              >
            </v-avatar>
            <v-avatar tile id="main-logo" class="hidden-xs-only">
              <img
                      v-bind:src="logo"
                      alt="FEUPLink"
              >
            </v-avatar>
          </router-link>
        </v-toolbar-title>
      </div>
      <div id="main-bar-content" class="hidden-xs-only">
        <v-spacer></v-spacer>
        <v-toolbar-items flex v-if="$store.state.isUserLoggedIn" >
          <v-btn flat v-for="signnedInItem in signnedInMenuItens" :class="signnedInItem.title" :key="signnedInItem.title" router :to="signnedInItem.link">{{ signnedInItem.title }}</v-btn>
        </v-toolbar-items>
        <v-toolbar-items flex v-else class="hidden-xs-only">
          <v-btn flat v-for="menuItem in menuItens" :class="menuItem.title" :key="menuItem.title" router :to="menuItem.link">{{ menuItem.title }}</v-btn>
        </v-toolbar-items>
      </div>
    </v-toolbar>
  
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </div>
  </v-app>
</template>

<script>
  import logo from './assets/FEUPLinklogo.png';
  import minilogo from './assets/IconFeup.png';
  export default {
    name: "App",
    data() {
      return {
        sideNav: false,
        menuItens: [
            {
                title: 'Home',
                link: "/"
            },
            {
                title: 'Sign-Up',
                link: "/signup"
            },
            {
                title: 'Sign-In',
                link: "/signin"
            }

        ],
          minilogo: minilogo,
          logo: logo,

        signnedInMenuItens: [
            {
                title: 'Home',
                link: "/"
            },
            {
                title: 'Feed',
                link: "/Feed"
            },
            {
                title: 'Logout',
                link: "/logout"
            }
        ]
      }
    }
  };
   window.fbAsyncInit = function() {
    FB.init({
      appId            : '1602254696490199',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  #main-bar{
    background-color: rgb(140,45,25);
  }
  .toolbar{
    width:100%;
    margin:0px;
  }
  .toolbar__content{
    display: inline-flex;
    width: 100%;
  }
  #main-bar .toolbar__content{
    background: url('assets/header.png') no-repeat center;
    background-size: cover;
  }
  #main-bar .btn__content{
    text-transform: none;
  }

  #main-bar .btn__content:before{
    opacity: 0;
  }

  #side-main{
    width: 100%;
    display: inline-flex;
  }

  #main-bar-content{
    width: 100%;
    display: flex;
  }

  #main-logo{
    height: 50px!important;
    width: auto!important;
  }
  #mini-logo{
    height: 40px!important;
    width: auto!important;
  }

  @media(min-width: 991px){
    #main-bar .toolbar__content{
      display: inline-block;
      height: 145px!important;
    }
    #main-bar-content{
      width: auto;
      margin: 0px 50px;
      color: rgb(140,45,25);
    }
    #side-main{
      height: 50px;
      margin-top: 50px;
    }
    #main-bar-content .btn{
      width: 140px;
      border: 2px solid white;
      border-radius: 0%;
      color:rgb(140,45,25);
      background-color: white!important;
    }
    #main-bar-content .Sign-Up{
      color: white;
      background-color: transparent!important;
    }

    #main-bar-content .Sign-In,
    #main-bar-content .Sign-Up{

      margin-left: 20px!important;
    }

  }
  @media (max-width: 990px){
    #main-logo{
      height: 40px!important;
    }
  }
  @media (max-width: 600px){
    #side-main{
      display: inline-flex;
      margin-left: 0;
    }
    #side-main .btn{
      margin-top: 0px;
    }
    #side-main .toolbar__title{
      text-align: end;
      flex:auto;
      margin-right: 20px;
    }
  }
  .font-color {
    color: white;
  }
</style>
