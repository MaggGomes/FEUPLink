<template>
  <div class="text-lg-center text-md-center text-sm-center" id="management_content">
    <v-container fluid pa-0>
      <v-layout row wrap>

        <!-- big screen --> 
        <v-flex xs4 class="hidden-sm-and-down">
          <v-navigation-drawer fixed permanent floating hide-overlay v-model="drawer">
            <v-list class="pt-0" dense>
              <v-list-tile v-for="nav_tab in nav_tabs" :key="nav_tab.id" v-bind:class="[{ active: currentTab === nav_tab.id }]" @click="currentTab = nav_tab.id">
                <v-list-tile-content>
                  <v-list-tile-title class="headline">{{ nav_tab.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-flex>

        <v-flex xs8 pt-5 class="hidden-sm-and-down">
          <span v-if="currentTab === 1">
            <course-management></course-management>
          </span>
          <span v-else-if="currentTab === 2">
            <department-management></department-management>
          </span>
        </v-flex>

        <!-- small screen --> 
        <v-flex class="hidden-md-and-up">
          <v-tabs dark slider-color="white">
            <v-tab v-for="nav_tab in nav_tabs" :key="nav_tab.id" :class="[{ active: currentTab === nav_tab.id }]" @click="currentTab = nav_tab.id"
              ripple>
              {{nav_tab.name}}
            </v-tab>
            <v-tab-item v-for="nav in nav_tabs.length" :key="nav">
              <span v-if="currentTab === 1">
                <course-management></course-management>
              </span>
              <span v-else-if="currentTab === 2">
                <department-management></department-management>
              </span>
            </v-tab-item>
          </v-tabs>
        </v-flex>

      </v-layout>
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


<style scoped>
  
    #management_content .navigation-drawer{
        margin-left: 5%;        
        margin-top: 200px !important;
        background-color: transparent;
    }

    #management_content .list{
          background-color: rgba(221, 221, 221, 0.75) !important;
          
    }
  
    #management_content .active{
        background-color: rgba(188, 188, 188, 0.75) !important;
    }

</style>
