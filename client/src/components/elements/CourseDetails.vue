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
            Course associated channels
          </v-tab>
          <v-tab-item >
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex class="title" xs4 mt-1>Name</v-flex>
                  <v-flex xs8>{{course.name}}</v-flex>

                  <v-flex class="title" xs4 mt-1>Acronym</v-flex>
                  <v-flex xs8>{{course.acronym}}</v-flex>

                  <v-flex class="title" xs4 mt-1>Type of Degree</v-flex>
                  <v-flex xs8>{{course.academicDegree}}</v-flex>

                  <v-flex class="title" xs4 mt-1>Description</v-flex>
                  <v-flex xs8>{{course.description}}</v-flex>

                  <v-flex class="title" xs4 mt-1>website</v-flex>
                  <v-flex xs8>{{course.website}}</v-flex>

                  <v-flex class="title" xs4 mt-1>Creation Date</v-flex>
                  <v-flex xs8>{{String(course.creationDate).substring(0,10)}}</v-flex>

                  <v-flex class="title" xs4 mt-1>End Date</v-flex>
                  <v-flex xs8>{{String(course.endDate).substring(0,10)}}</v-flex>

                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item >
            <v-card flat>
              <v-card-text>
              {{course.Students}}
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item >
            <v-card flat>
              <v-card-text>
               {{course.Channels}}
              </v-card-text>
            </v-card>
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
  }
}
</script>


