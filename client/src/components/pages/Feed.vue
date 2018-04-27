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

    Vue.component('nav_tab-1', {
            data () {
                return {
                    contents: [
                        {title: 'Post1',avatar:'https://www.w3schools.com/howto/img_avatar.png', description: 'Mauris hendrerit tristique mi. Praesent tristique nulla nisi, vitae viverra enim gravida laoreet. Donec condimentum lacus volutpat, laoreet sapien in, congue nunc. Vestibulum commodo suscipit nisi. Proin suscipit diam ac nibh lobortis viverra. Cras placerat pulvinar nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},

                        {title: 'Post2',avatar:'https://www.w3schools.com/howto/img_avatar.png', description: 'Pellentesque semper tempor pulvinar. Curabitur sollicitudin luctus sapien, at ultrices arcu pellentesque sit amet. Pellentesque vitae justo interdum, mollis quam vel, eleifend orci. Aliquam cursus turpis mi, ac ultrices orci lacinia vel. Suspendisse bibendum tellus in dui mattis condimentum non non lectus. Nullam pellentesque, lorem in tristique auctor, metus urna maximus velit, ac tempus nunc lacus vitae ligula. Vestibulum consequat velit vitae cursus pretium.'},

                        {title: 'Post3',avatar:'https://www.w3schools.com/howto/img_avatar.png', description: 'Vivamus eleifend metus semper risus eleifend eleifend. In tristique vel magna eget scelerisque. Cras quis venenatis augue. Nulla facilisi. Sed in feugiat mi, in pretium ante.'},

                        {title: 'Post4',avatar:'https://www.w3schools.com/howto/img_avatar.png', description: 'Integer pulvinar sem a vulputate interdum. Duis in lorem mi. Nullam eu odio sit amet nibh aliquet posuere eget vitae nulla. Integer congue auctor risus, sit amet placerat risus blandit in.'},

                        {title: 'Post5',avatar:'https://www.w3schools.com/howto/img_avatar.png', description: 'Donec bibendum hendrerit velit, ac maximus ex mattis id. In luctus est nec sodales pretium. Nulla bibendum nisi quis mauris tempus, id vulputate turpis venenatis. Nullam eu libero imperdiet, mattis magna in, sollicitudin nisi. Nullam auctor ipsum orci. Sed ac ex erat.'},
                    ],

                }
            },
        template: '<v-list two-line>'+
        '<v-list-tile ripple avatar v-for="content in contents" :key="content.title" @click="">'+
        '<v-list-tile-avatar>'+
        '<img :src="content.avatar">'+
        '</v-list-tile-avatar>'+
        '<v-list-tile-content>'+
        '<v-list-tile-title v-html="content.title"></v-list-tile-title>'+
        '<v-list-tile-sub-title v-html="content.description"></v-list-tile-sub-title>'+
        '</v-list-tile-content>'+
        '</v-list-tile>'+
        '</v-list>'

    }

    )
    Vue.component('nav_tab-2', {
        data () {
            return {
                contents: [
                    {title: 'Event1',date: '12-2-2018' ,avatar:'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg', description: 'Mauris hendrerit tristique mi. Praesent tristique nulla nisi, vitae viverra enim gravida laoreet. Donec condimentum lacus volutpat, laoreet sapien in, congue nunc. Vestibulum commodo suscipit nisi. Proin suscipit diam ac nibh lobortis viverra. Cras placerat pulvinar nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},

                    {title: 'Event2',date: '31-7-2018',avatar:'http://eventsbyambrosia.com/wp-content/uploads/2016/06/events.jpg', description: 'Pellentesque semper tempor pulvinar. Curabitur sollicitudin luctus sapien, at ultrices arcu pellentesque sit amet. Pellentesque vitae justo interdum, mollis quam vel, eleifend orci. Aliquam cursus turpis mi, ac ultrices orci lacinia vel. Suspendisse bibendum tellus in dui mattis condimentum non non lectus. Nullam pellentesque, lorem in tristique auctor, metus urna maximus velit, ac tempus nunc lacus vitae ligula. Vestibulum consequat velit vitae cursus pretium.'},

                    {title: 'Event3',date: '3-9-2018',avatar:'http://eventsbyambrosia.com/wp-content/uploads/2016/06/events.jpg', description: 'Vivamus eleifend metus semper risus eleifend eleifend. In tristique vel magna eget scelerisque. Cras quis venenatis augue. Nulla facilisi. Sed in feugiat mi, in pretium ante.'},

                    {title: 'Event4',date: '8-12-2020',avatar:'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg', description: 'Integer pulvinar sem a vulputate interdum. Duis in lorem mi. Nullam eu odio sit amet nibh aliquet posuere eget vitae nulla. Integer congue auctor risus, sit amet placerat risus blandit in.'},

                    {title: 'Event5',date: '30-5-2018',avatar:'https://www.w3schools.com/howto/img_avatar.png', description: 'Donec bibendum hendrerit velit, ac maximus ex mattis id. In luctus est nec sodales pretium. Nulla bibendum nisi quis mauris tempus, id vulputate turpis venenatis. Nullam eu libero imperdiet, mattis magna in, sollicitudin nisi. Nullam auctor ipsum orci. Sed ac ex erat.'},
                ],

            }
        },
        template: '<v-list two-line>'+
        '<v-list-tile ripple avatar v-for="content in contents" :key="content.title" @click="">'+
        '<v-list-tile-avatar>'+
        '<img :src="content.avatar">'+
        '</v-list-tile-avatar>'+
        '<v-list-tile-content>'+
        '<v-list-tile-title v-html="content.title"></v-list-tile-title>'+
        '<v-list-tile-sub-title v-html="content.description"></v-list-tile-sub-title>'+
        '</v-list-tile-content>'+
        '<v-list-tile-action>'+
        '<v-list-tile-action-text>{{content.date}}</v-list-tile-action-text>'+
        '</v-list-tile-action>'+
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
<style>
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

    .side_content .list {
        background-color: rgba(221, 221, 221, 0.75) ;
        padding: 1px 0px;
    }
    .side_content .list .list__tile{
        background-color: rgba(188, 188, 188, 0.75) ;
        margin:10px;
    }

    @media(min-width: 1024px ){
        #feed_content .navigation-drawer{
            margin-left: 5%;
        }
        .side_content{
            margin-left: 25%;
        }
    }

    @media(max-width: 960px ){
        .container.fluid,
        #feed_content .container{
            padding: 0;

        }
        .accent{
            background-color: red!important;
            border-color: red!important;
        }
    }

</style>
