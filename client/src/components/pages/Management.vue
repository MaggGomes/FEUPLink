<template>
  <v-container fluid>
  <v-layout row wrap>

    <!-- dialog new course --> 
    <v-dialog v-model="createDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Create a new Course</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 md9>
                <v-text-field
                  label="Course name"
                  hint="This must be unique"
                  v-model="name"
                  required
                ></v-text-field>
              </v-flex>
              
              <v-flex xs12 md3>
                <v-text-field
                  label="Course acronym"
                  v-model="acronym"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Description"
                  v-model="description"
                  multi-line
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md9>
                <v-text-field
                  label="Website"                  
                  v-model="website"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md3>
                <v-select
                  label="Type of degree"
                  required
                  :items="['Bachelor', 'Masters', 'PhD']"
                ></v-select>
              </v-flex>

              <v-flex xs12 md6>
               <v-menu
                ref="creationDateMenu"
                lazy
                :close-on-content-click="false"
                v-model="creationDateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Creation date"
                    v-model="creationDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="creationDate"
                    @change="saveCreationDate"
                    min="1950-01-01"
                    :max="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

                <v-flex xs12 md6>
               <v-menu
                ref="endDateMenu"
                lazy
                :close-on-content-click="false"
                v-model="endDateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Close date"
                    v-model="endDate"
                    prepend-icon="event"
                    hint="If the course has already closed"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="endDate"
                    @change="saveEndDate"
                    min="1950-01-01"
                    :max="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancelDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="createCourse">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-jumbotron color="grey lighten-2">
      <v-layout>
        <v-flex xs6 md3>
           <v-btn flat  color="success" slot="activator" @click="createDialog=true">
                <v-icon> add </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- list of courses --> 
      <v-layout mt-2 row wrap>
        <v-flex xs12 offset-md1 md10 >
          <v-expansion-panel v-for="course in courses" :key="course.id">
            <v-expansion-panel-content>
              <div slot="header">
                <v-toolbar>
                  <v-toolbar-title>{{course.name}}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn flat @click="updateCourse(course)">
                      <v-icon> mode edit </v-icon>
                    </v-btn>
                    <v-btn flat color="error" @click="deleteCourse(course.id)">
                      <v-icon> delete </v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
              </div>
              <v-card>
                <v-card-text>{{course.description}}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
      </v-flex>

      <!-- pagination -->
      <v-flex xs12>
        <div class="text-xs-center">
          <v-pagination :length="6" v-model="page"></v-pagination>
        </div>
      </v-flex>
</v-layout>
</v-jumbotron>

<v-layout row wrap>

</v-layout>

<v-layout>
  <v-flex xs12>
    <v-alert type="warning" :value="true">
      {{error}}
    </v-alert>
  </v-flex>
</v-layout>
</v-layout>
</v-container>
</template>



<script>
import CourseService from '@/services/CourseService'


export default {
  data () {
    return {
      error: null,
      success: null,
      page: 1,
      createDialog: false,
      updateDialog: false,
      courses: [],
      // course dialog fields
      name: '',
      academicDegree: '',
      acronym: '',
      description: '',
      website: '',
      creationDate: '',
      creationDateMenu:false,
      endDate: '',
      endDateMenu:false,
    }
  },
  methods: {
    saveCreationDate (date) {
		  this.$refs.creationDateMenu.save(date)
	  },
    saveEndDate (date) {
		  this.$refs.endDateMenu.save(date)
	  },
    cancelDialog(){
      this.createDialog=false
      this.emptyDialogFields()
    },
    emptyDialogFields(){
      this.name=''
      this.academicDegree=''
      this.acronym=''
      this.description=''
      this.website=''
      this.creationDate=''
      this.endDate=''
    },
    async createCourse(){
      this.createDialog=false
      this.emptyDialogFields()
      
      try{
        this.success = await (CourseService.create_course({
          name: this.name,
          academicDegree: this.academicDegree,
          acronym: this.acronym,
          description: this.description,
          website: this.website,
          creationDate: this.creationDate,
          endDate: this.endDate,
        }))
      }catch(error){
        this.error=error.response.data.error;
      }
      
    },
    async updateCourse(course){
      console.log('update: ', course);
    },
    async deleteCourse(id){
      console.log('delete: ' + id);
      try{
        this.success = (await CourseService.delete_course(id)).data
        
        //update course list
        this.getCourses()
      }catch(error){
        this.error=error;
      }
    },
    async getCourses(){
      try{
        this.courses = (await CourseService.list_all_courses()).data
      }catch(error){
        this.error = error
      }
    }
  },
  mounted: async function (){
      await this.getCourses();
  },
   watch: {
     // date-picker stuff
    creationDate (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    endDate (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
}
</script>

<style scoped>


</style>
