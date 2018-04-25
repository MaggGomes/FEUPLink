<template>
  <v-container fluid>
  <v-layout row wrap>

    <!-- dialog new course --> 
    <v-dialog v-model="courseDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline"> {{ updatingCourse ? 'Update Course information' : 'Create a new Course' }} </span>
        </v-card-title>
        <v-card-text>
        <v-form v-model="formValid" ref="form" autocomplete="off" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 md9>
                <v-text-field
                  label="Course name"
                  hint="This must be unique"
                  v-model="name"
                  :rules="[v => !!v || 'Course name is required']"
                  required
                ></v-text-field>
              </v-flex>
              
              <v-flex xs12 md3>
                <v-text-field
                  label="Course acronym"
                  v-model="acronym"
                  :rules="[v => !!v || 'Course acronym is required']"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Description"
                  v-model="description"
                  multi-line
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md9>
                <v-text-field
                  label="Website"                  
                  v-model="website"     
                  prepend-icon="web"             
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md3>
                <v-select
                  label="Type of degree"                 
                  v-model="academicDegree"
                  :rules="[v => !!v || 'Course type of degree is required']"
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
                    :rules="[v => !!v || 'Course creation date is required']"
                    required
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Cancel</v-btn>
          <v-btn 
            color="blue darken-1"
            flat
            @click.native="updatingCourse? updateCourse() : createCourse()"
            :disabled="!formValid"
          >
            {{ updatingCourse ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-jumbotron color="grey lighten-2">
      <v-layout>
        <v-flex xs6 md3>
           <v-btn flat  color="success" slot="activator" @click="courseDialog=true">
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
                    <v-btn flat @click="openUpdateCourseDialog(course)">
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
      showingError: false,
      error: null,
      success: null,
      page: 1,
      courseDialog: false,
      // update
      updatingCourse: false,
      currentCourseId: null,
      // courses data
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
      //form-validation
      formValid:false,
    }
  },
  methods: {
    saveCreationDate (date) {
		  this.$refs.creationDateMenu.save(date)
	  },
    saveEndDate (date) {
		  this.$refs.endDateMenu.save(date)
	  },
    closeDialog(){
      this.courseDialog=false
      this.updatingCourse=false
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
    getCourseObject(){
      // returns the object with a course based on the dialog fields
      return {
          name: this.name,
          academicDegree: this.academicDegree,
          acronym: this.acronym,
          description: this.description,
          website: this.website,
          creationDate: this.creationDate,
          endDate: this.endDate,
        }
    },
    async createCourse(){
        
      try{
        this.success = (await CourseService.create_course(this.getCourseObject())).data

        // clean the dialog
        this.courseDialog=false
        this.emptyDialogFields()
        
        // update course list
        this.getCourses()
      }catch(error){
        this.error=error.response.data.error
      }
      
    },
    openUpdateCourseDialog(course){
      // update dialog fields
      this.name=course.name
      this.academicDegree=course.academicDegree
      this.acronym=course.acronym
      this.description=course.description
      this.website=course.website
      this.creationDate=String(course.creationDate).substring(0,10)
      this.endDate=String(course.endDate).substring(0,10)

      this.updatingCourse=true
      this.courseDialog=true
      this.currentCourseId=course.id
    },
    async updateCourse(){
      
      try{
        let courseInfo = this.getCourseObject()
        courseInfo['courseId']=this.currentCourseId

        this.success=(await CourseService.update_course(courseInfo)).data
        
        this.closeDialog()
        // update course list
        this.getCourses()
      }catch(error){
        this.error=error
      }
    
    },
    async deleteCourse(id){
      try{
        this.success = (await CourseService.delete_course(id)).data
        
        // update course list
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
