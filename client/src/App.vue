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
          <v-avatar size="32px" tile>
            <img
                    src="assets/IconFeup.png"
                    alt="IconFeup"
            >
          </v-avatar>
        </v-toolbar-side-icon>
        <v-toolbar-title >
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-avatar tile>
              <img
                      src="assets/FEUPLinklogo.png"
                      alt="FEUPLink"
              >
            </v-avatar>
          </router-link>
        </v-toolbar-title>
      </div>
      <div id="main-bar-content">
        <v-spacer></v-spacer>
        <v-toolbar-items flex v-if="$store.state.isUserLoggedIn" class="hidden-xs-only">
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
                title: 'News',
                link: "/"
            },
            {
                title: 'About',
                link: "/"
            },
            {
                title: 'Contact',
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

          logo:'assets/FEUPLinklogo.png',

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
    background-color: darkred;
  }
  .toolbar{
    width:100%;
    margin:0px;
  }
  .toolbar__content{
    display: inline-flex;
    width: 100%;
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

  @media(min-width: 991px){
    #main-bar .toolbar__content{
      display: inline-block;
      background: url('assets/header.png');
      height: 225px!important;
    }
    #main-bar-content{
      width: auto;
      margin: 0px 50px;
      color: darkred;
    }
    #side-main{
      height: 50px;
      margin-top: 50px;
    }
    #main-bar-content .btn{
      width: 140px;
      border: 2px solid white;
      border-radius: 0%;
      color:darkred;
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
  @media (max-width: 441px) {
    #side-main .toolbar__title{
      display: flex;
      margin-top: 5%;
    }
  }


  .font-color {
    color: white;
  }
</style>
