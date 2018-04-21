<template>
  <div class="text-lg-center text-md-center text-sm-center">
    <v-container>
       <v-navigation-drawer  style="width: 15%; margin-top: 64px ;"
                             fixed
                             permanent
                             v-model="drawer">
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile>
                <v-list-tile-avatar>
                  <img :src= 'user.img'>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.username }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
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
        <v-flex xs11 offset-xs2>

          <component
                  v-bind:is="currentTabComponent"
                  class="nav_tab"
          >

          </component>

        </v-flex>
    </v-container>
  </div>
</template>

<script>
    import Vue from 'vue'

    Vue.component('nav_tab-1', {
            data () {
                return {
                    contents: [
                        {title: 'Post1',data: 1233 ,avatar:'https://www.w3schools.com/howto/img_avatar.png'},

                        {title: 'Post2',data: 123,avatar:'https://www.w3schools.com/howto/img_avatar.png'},

                        {title: 'Post3',data: 12393,avatar:'https://www.w3schools.com/howto/img_avatar.png'},

                        {title: 'Post4',data: 12323123,avatar:'https://www.w3schools.com/howto/img_avatar.png'},

                        {title: 'Post5',data: 12323,avatar:'https://www.w3schools.com/howto/img_avatar.png'},
                    ],

                }
            },
        template: '<v-list two-line>'+
        '<v-list-tile v-for="content in contents" :key="content.title" @click="">'+
        '<v-list-tile-avatar>'+
        '<img :src="content.avatar">'+
        '</v-list-tile-avatar>'+
        '<v-list-tile-content>'+
        '<v-list-tile-title v-html="content.title"></v-list-tile-title>'+
        '<v-list-tile-sub-title v-html="content.data"></v-list-tile-sub-title>'+
        '</v-list-tile-content>'+
        '</v-list-tile>'+
        '</v-list>'
    }


    )
    Vue.component('nav_tab-2', {
        data () {
            return {
                contents: [
                    {title: 'Event1',date:1, description:''},

                    {title: 'Event2',date:2, description:''},

                    {title: 'Event3',date:3, description:''},

                ],

            }
        },
        template: '<v-list two-line>'+
        '<v-list-tile v-for="content in contents" :key="content.title" @click="">'+
        '<v-list-tile-content>'+
        '<v-list-tile-title v-html="content.title"></v-list-tile-title>'+
        '</v-list-tile-content>'+
        '</v-list-tile>'+
        '</v-list>'
    })
    Vue.component('nav_tab-3', {
        template: '<div>Job Opportunities component</div>'
    })
    Vue.component('nav_tab-4', {
        template: '<div>Newsletter component</div>'
    })
    Vue.component('nav_tab-5', {
        template: '<div>News component</div>'
    })
    Vue.component('nav_tab-6', {
        template: '<div>Education component</div>'
    })

    export default {
  name: "Feed",
  mounted () {
//    if (!this.$store.state.isUserLoggedIn){
//        this.$router.push('/');
//    }
  },
    data () {
        return {
            drawer: true,
            user: {username: 'john doe', img: 'https://www.w3schools.com/howto/img_avatar.png'},
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

</style>
