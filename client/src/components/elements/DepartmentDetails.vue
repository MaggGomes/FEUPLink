<template>
  <v-container fluid>
    <v-layout v-if="department !== null" row wrap>
      <v-flex xs12>
        <v-tabs v-model="active" color="red darken-4" dark slider-color="white">

          <v-tab ripple>
            {{$t('department_details')}}
          </v-tab>

          <v-tab ripple>
            {{$t('department_staff')}}
          </v-tab>

          <v-tab ripple>
            {{$t('department_courses')}}
          </v-tab>

          <!-- Department Info -->
          <v-tab-item style="height: 400px;">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex class="title" xs4 mt-1>{{$t('name')}}</v-flex>
                  <v-flex xs8>{{department.name}}</v-flex>

                  <v-flex class="title" xs4 mt-1>{{$t('acronym')}}</v-flex>
                  <v-flex xs8>{{department.acronym}}</v-flex>

                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>


          <!-- Staff -->
          <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content  v-for="staff in department.Staffs" :key="staff.id">
                <div slot="header">
                  {{staff.mecNumber}} 
                    <v-spacer> </v-spacer>    
                  {{staff.Person.name}}
                </div>
                <v-card class="grey lighten-3">                  
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex class="body-1" xs4 mt-2>{{$t('working_location')}}</v-flex>
                      <v-flex xs8 mt-2>{{staff.workingLocation}}</v-flex>
                     
                      <v-flex class="body-1" xs4 mt-2>{{$t('start_date')}}</v-flex>
                      <v-flex xs8 mt-2>{{String(staff.jobStart).substring(0,10)}}</v-flex>
                    
                      <v-flex class="body-1" mt-2 xs4>{{$t('end_date')}}</v-flex>
                      <v-flex xs8 mt-2>{{String(staff.jobEnd).substring(0,10)}}</v-flex>                    
                                
                    </v-layout>
                  </v-card-text>        
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn flat color="red darken-4" router :to="`/profile/${staff.PersonId}`"> {{$t('see_profile')}} </v-btn>          
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>


          <!-- Courses -->
          <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content  v-for="course in department.Courses" :key="course.id">
                <div slot="header">
                  {{course.name}} 
                    <v-spacer> </v-spacer>    
                  {{course.acronym}}
                </div>
                <v-card class="grey lighten-3">                 
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex class="body-1" xs4 mt-2>{{$t('description')}}</v-flex>
                      <v-flex xs8 mt-2>{{course.description}}</v-flex>                          
                    </v-layout>
                  </v-card-text>   
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
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


