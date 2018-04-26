<template>
  <v-container fluid>
    <v-layout v-if="department !== null" row wrap>
      <v-flex xs12>
        <v-tabs v-model="active" color="red darken-4" dark slider-color="white">
          <v-tab ripple>
            Department details
          </v-tab>
          <v-tab ripple>
            Department Staff
          </v-tab>
          <v-tab ripple>
            Department Courses
          </v-tab>
          <v-tab-item >
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex class="title" xs4 mt-1>Name</v-flex>
                  <v-flex xs8>{{department.name}}</v-flex>

                  <v-flex class="title" xs4 mt-1>Acronym</v-flex>
                  <v-flex xs8>{{department.acronym}}</v-flex>

                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item >
            <v-card flat>
              <v-card-text>
              {{department.Staffs}}
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item >
            <v-card flat>
              <v-card-text>
               {{department.Courses}}
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>



      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import CourseService from '@/services/CourseService'


export default {
  data () {
      return {
        active: null,
      }
  },
  props: {
    department: {
      type: Object
    }
  }
}
</script>


