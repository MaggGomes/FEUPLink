<template>
  <div class="text-lg-center text-md-center text-sm-center" id="feed_content">
    <v-container>
       <v-navigation-drawer  fixed
                             permanent
                             floating
                             hide-overlay
                             class="hidden-sm-and-down"
                             v-model="drawer">
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src= 'user.img'>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.username }}</v-list-tile-title>
                    <v-list-tile-sub-title> {{ user.type }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list class="pt-0" dense>
            <v-list-tile v-for="nav_tab in nav_tabs"
                         v-bind:key="nav_tab.id"
                         v-bind:class="[{ active: currentTab === nav_tab.id }]"
                         @click="currentTab = nav_tab.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ nav_tab.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-tabs dark
                class="hidden-md-and-up">
            <v-tab v-for="nav_tab in nav_tabs"
                    v-bind:key="nav_tab.id"
                    v-bind:class="[{ active: currentTab === nav_tab.id }]"
                    @click="currentTab = nav_tab.id"
                    ripple>
                {{nav_tab.name}}
            </v-tab>
            <v-tab-item v-for="nav in nav_tabs.length"
                        :key="nav"
                        class="side_content">
                <component
                        v-bind:is="currentTabComponent"
                        class="nav_tab">

                </component>
            </v-tab-item>
        </v-tabs>
        <v-flex class="side_content hidden-sm-and-down">
            <component
                    v-bind:is="currentTabComponent"
                    class="nav_tab">

            </component>

        </v-flex>

    </v-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Feed_content from '@/components/elements/feedElements/Feed_content'
  import Events_content from '@/components/elements/feedElements/Events_content'
  import Jobs_content from '@/components/elements/feedElements/Jobs_content'
  import Newsletter_content from '@/components/elements/feedElements/Newsletter_content'
  import News_content from '@/components/elements/feedElements/News_content'
  import Education_content from '@/components/elements/feedElements/Education_content'

  Vue.component('nav_tab-1', Feed_content);
  Vue.component('nav_tab-2', Events_content);
  Vue.component('nav_tab-3', Jobs_content);
  Vue.component('nav_tab-4', Newsletter_content);
  Vue.component('nav_tab-5', News_content);
  Vue.component('nav_tab-6', Education_content);

    export default {
  name: "Feed",
  mounted () {
    if (!this.$store.state.isUserLoggedIn){
        this.$router.push('/');
    }
  },
    data () {
        return {
            drawer: true,
            user: {username: 'John Doe', type: 'Student',img: 'https://www.w3schools.com/howto/img_avatar.png'},
            currentTab: 1,
            nav_tabs: [{name:'Feed', id:1}, {name:'Events', id:2}, {name:'Job Opportunities', id:3}, {name:'Newsletter', id:4}, {name:'News', id:5}, {name:'Education', id:6}],
        }
    },
    computed: {
        currentTabComponent: function () {
            return 'nav_tab-' + this.currentTab
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .avatar, .avatar .icon, .avatar img{
        border-radius: 0%;
    }

    #feed_content .navigation-drawer{
        max-width: 170px;
        margin-top: 170px!important;
        background-color: transparent;
    }

    #feed_content .list{
        margin-bottom: 10px !important;
    }

    #feed_content .navigation-drawer>.list .list__tile{
        background-color: rgba(221, 221, 221, 0.75);
        margin: 5px 10px;
    }

    #feed_content .navigation-drawer>.list .active .list__tile {
        background-color: rgba(188, 188, 188, 0.75);
    }

    #feed_content .side_content .list {
        background-color: rgba(221, 221, 221, 0.75) ;
        padding: 1px 0px;
    }
    #feed_content .side_content .list .list__tile{
        background-color: rgba(188, 188, 188, 0.75) ;
        margin:10px;
    }

    @media(min-width: 1024px ){
        #feed_content .navigation-drawer{
            margin-left: 5%;
        }
        #feed_content .side_content{
            margin-left: 25%;
        }
    }

    @media(max-width: 960px ){
        #feed_content .container.fluid,
        #feed_content .container{
            padding: 0;

        }
        #feed_content .accent{
            background-color: red!important;
            border-color: red!important;
        }
    }

</style>
