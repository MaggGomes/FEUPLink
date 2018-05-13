<template>
  <v-container fluid>
    <v-layout v-if="course !== null" row wrap>
      <v-flex xs12>
        <v-tabs v-model="active" color="red darken-4" dark slider-color="white">
          <v-tab ripple>
            Course details
          </v-tab>
          <v-tab ripple>
            Course Students
          </v-tab>
          <v-tab ripple>
            Course Departments
          </v-tab>
          <v-tab ripple>
            Course associated channels
          </v-tab>
          <v-tab-item style="height: 400px;">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex class="subheading" xs4 mt-2>Name</v-flex>
                  <v-flex xs8 mt-2>{{course.name}}</v-flex>

                  <v-flex class="subheading" xs4 mt-2>Acronym</v-flex>
                  <v-flex xs8 mt-2>{{course.acronym}}</v-flex>

                  <v-flex class="subheading" xs4 mt-2>Type of Degree</v-flex>
                  <v-flex xs8 mt-2>{{course.academicDegree}}</v-flex>

                  <v-flex class="subheading" xs4 mt-2>Description</v-flex>
                  <v-flex xs8 mt-2>{{course.description}}</v-flex>           

                  <v-flex class="subheading" xs4 mt-2>website</v-flex>
                  <v-flex xs8 mt-2>{{course.website}}</v-flex>

                  <v-flex class="subheading" xs4 mt-2>Creation Date</v-flex>
                  <v-flex xs8 mt-2>{{String(course.creationDate).substring(0,10)}}</v-flex>

                  <v-flex class="subheading" xs4 mt-2>End Date</v-flex>
                  <v-flex xs8 mt-2>{{String(course.endDate).substring(0,10)}}</v-flex>

                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- students -->
          <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content  v-for="student in course.Students" :key="student.id">
                <div slot="header">
                  {{student.mecNumber}} 
                    <v-spacer> </v-spacer>    
                  {{student.Person.name}}
                </div>
                <v-card class="grey lighten-3">                
                  <v-card-text>
                    <v-layout row wrap>
                     
                      <v-flex class="subheading" xs4 mt-2>Enrrolment Date</v-flex>
                      <v-flex xs8 mt-2>{{String(student.CourseStudent.enrollmentDate).substring(0,10)}}</v-flex>
                    
                      <v-flex class="subheading" xs4 mt-2>Graduation Date</v-flex>
                      <v-flex xs8 mt-2>{{String(student.CourseStudent.graduationDate).substring(0,10)}}</v-flex>                    
                                
                    </v-layout>
                  </v-card-text>        
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn flat color="red darken-4" router :to="`/profile/${student.PersonId}`"> See Student Profile </v-btn>          
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>

          <!-- departments -->
          <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content  v-for="department in course.Departments" :key="department.id">
                <div slot="header">
                  {{department.name}} 
                  <v-spacer> </v-spacer>  
                </div>
                <v-card class="grey lighten-3">                
                  <v-card-text>
                    <v-layout row wrap>
                     
                      <v-flex class="subheading" xs4 mt-2>Department Name</v-flex>
                      <v-flex xs8 mt-2>{{String(department.name)}}</v-flex>
                    
                      <v-flex class="subheading" xs4 mt-2>Department Acronym</v-flex>
                      <v-flex xs8 mt-2>{{String(department.acronym)}}</v-flex>                    
                                
                    </v-layout>
                  </v-card-text>                  
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>


          <!-- Channels -->
          <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header"> {{course.Channel.name}}</div>
                <v-card class="grey lighten-3">
                  <v-card-text>
                    {{course}}
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

export default {
  data () {
      return {
        active: null,
      }
  },
  props: {
    course: {
      type: Object
    }
  },
}
</script>


