<template>
  <div class="text-lg-center text-md-center text-sm-center" id="feed_content">
    <v-container>
      <v-navigation-drawer fixed permanent floating hide-overlay class="hidden-sm-and-down" v-model="drawer">
        <v-list class="pt-0" dense>
          <v-list-tile v-for="nav_tab in nav_tabs" :key="nav_tab.id" v-bind:class="[{ active: currentTab === nav_tab.id }]" @click="currentTab = nav_tab.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ nav_tab.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-tabs dark class="hidden-md-and-up">
        <v-tab v-for="nav_tab in nav_tabs" :key="nav_tab.id" :class="[{ active: currentTab === nav_tab.id }]" @click="currentTab = nav_tab.id" ripple>
          {{nav_tab.name}}
        </v-tab>
        <v-tab-item v-for="nav in nav_tabs.length" :key="nav" class="side_content">
          <span v-if="currentTab === 1">
          <course-management></course-management>
        </span>
        <span v-else-if="currentTab === 2">
          <department-management></department-management>
        </span>
        </v-tab-item>
      </v-tabs>
      
      <v-flex class="side_content hidden-sm-and-down">
        <span v-if="currentTab === 1">
          <course-management></course-management>
        </span>
        <span v-else-if="currentTab === 2">
          <department-management></department-management>
        </span>
      </v-flex>
     
    </v-container>
  </div>
</template>


<script>
  import Vue from 'vue'
  import CourseManagement from '@/components/elements/managementTabs/CourseManagement'
  import DepartmentManagement from '@/components/elements/managementTabs/DepartmentManagement'

  export default {
    components: {
      CourseManagement,
      DepartmentManagement,
    },
    data () {
        return {
            drawer: true,           
            currentTab: 1,
            nav_tabs: [{name:'Courses', id:1}, {name:'Departments', id:2}, ],
        }
    },

};
</script>


<style>
  
    #feed_content .navigation-drawer{
        max-width: 170px;
        margin-top: 90px!important;
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