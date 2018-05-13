<template>
  <v-container fluid pa-0>
    <v-layout row wrap>

      <!-- provide feedback to the user -->
      <v-snackbar :timeout="6000" :color="feedbackColor" v-model="showingFeedback" top multi-line>
        <div v-if="error!=null">
          {{error.response.data.error}}
        </div>
        <div v-if="success!=null">
          {{success.res}}
        </div>
        <v-btn flat dark @click="showingFeedback=false"> Close </v-btn>
      </v-snackbar>

      <!-- warning dialog -->
      <v-dialog v-model="warningDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Be Careful!</v-card-title>
          <v-card-text>
            {{warningTitle}}
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="red" @click="warningDialog=false"> Cancel </v-btn>
            <v-spacer> </v-spacer>
            <v-btn flat color="green" @click="() => { warningDialog=false, warningAction() }"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!-- dialog new course -->
      <v-dialog v-model="courseDialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline"> {{ updatingCourse ? 'Update Course information' : 'Create a new Course' }} </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValid" ref="form" autocomplete="off">
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-flex xs12 md9>
                    <v-text-field label="Course name" hint="This must be unique" v-model="name" :rules="[v => !!v || 'Course name is required']"
                      required></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-text-field label="Course acronym" v-model="acronym" :rules="[v => !!v || 'Course acronym is required']" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="Description" v-model="description" multi-line></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-select :items="departments" :filter="customDepartmentFilter" v-model="selectedDepartmentId" item-text="name" item-value="id"
                      label="Select the course department" autocomplete :rules="[v => !!v || 'Course department is required']"
                      required></v-select>
                  </v-flex>

                  <v-flex xs12 md9>
                    <v-text-field label="Website" v-model="website" prepend-icon="web"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-select label="Type of degree" v-model="academicDegree" :rules="[v => !!v || 'Course type of degree is required']" required
                      :items="['Bachelor', 'Masters', 'PhD']"></v-select>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-layout>
                      <v-flex xs8>
                        <v-menu ref="creationDateMenu" lazy :close-on-content-click="false" v-model="creationDateMenu" transition="scale-transition"
                          offset-y full-width :nudge-right="40" min-width="290px">
                          <v-text-field slot="activator" label="Creation date" v-model="creationDate" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker ref="picker" v-model="creationDate" @change="saveCreationDate" min="1950-01-01" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
                        </v-menu>

                      </v-flex>
                      <v-flex xs2>
                        <v-btn flat color="blue-grey lighten-3" @click="creationDate=''">
                          <v-icon> clear </v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>


                  <v-flex xs12 md6>
                    <v-layout>
                      <v-flex xs8>
                        <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y
                          full-width :nudge-right="40" min-width="290px">
                          <v-text-field slot="activator" label="Close date" v-model="endDate" prepend-icon="event" hint="If the course has already closed"
                            readonly></v-text-field>
                          <v-date-picker ref="picker" v-model="endDate" @change="saveEndDate" min="1950-01-01" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs2>
                        <v-btn flat color="blue-grey lighten-3" @click="endDate=''">
                          <v-icon> clear </v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-form>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="() => {                
                  if(updatingCourse)
                    showConfirmDialog(updateCourse, 'Are you sure you want to update the course?')
                   else
                     showConfirmDialog(createCourse, 'Are you sure you want to create the course?')
                }" :disabled="!formValid">
              {{ updatingCourse ? 'Update' : 'Create' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- course details dialog -->
      <v-dialog scrollable v-model="showCourseDetails">
        <v-card>
          <v-card-title v-if="currentCourse !== null" class="headline">{{currentCourse.name}}</v-card-title>
          <v-card-text>
            <course-details :course="currentCourse"> </course-details>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="blue darken-1" @click="showCourseDetails=false"> Dismiss </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>



      <!-- Page Content -->
      <v-flex>
        <v-layout>
          <v-flex xs7>
            <span class="display-1"> Manage Courses </span>
            <v-btn flat color="success" slot="activator" @click="courseDialog=true">
              <v-icon> add </v-icon>
            </v-btn>
          </v-flex>

          <v-flex xs2 offset-xs2>
            <v-select
              :items="numPagesOptions"
              v-model="itemsPerPage"
              label="Items"
              class="input-group--focused"
              item-value="pa"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-flex>

      

      <v-flex xs12>
        <!-- list of courses -->
        <v-toolbar v-for="course in courses" :key="course.id">
          <v-toolbar-title class="hidden-sm-and-down">{{course.name}}</v-toolbar-title>
          <v-toolbar-title class="hidden-md-and-up">{{course.acronym}}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn fab flat @click="() => {
                      currentCourse=course  
                      showCourseDetails=true                    
                  }">
              <v-icon> remove_red_eye </v-icon>
            </v-btn>
            <v-btn fab flat @click="openUpdateCourseDialog(course)">
              <v-icon> mode_edit </v-icon>
            </v-btn>
            <v-btn fab flat color="error" @click="() => {
                      currentCourse=course
                      showConfirmDialog(deleteCourse, `Are you sure you want to delete \'${course.name}\' ?`)
                  }">
              <v-icon> delete </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 pt-4>
        <v-pagination :length="numPages" v-model="currentPage" ></v-pagination>
      </v-flex>

    </v-layout>
  </v-container>
</template>



<script>
import CourseService from '@/services/CourseService'
import DepartmentService from '@/services/DepartmentService'
import CourseDetails from '@/components/elements/CourseDetails'

export default {
  components:{
    CourseDetails
  },
  data () {
    return {    
      // warning dialog
      warningDialog: false,
      warningTitle: null,
      // feedback
      showingFeedback: false,
      feedbackColor: 'error',
      error: null,
      success: null,
      // form
      courseDialog: false,
      // update
      updatingCourse: false,
      currentCourse: null,
      // courses data
      courses: [],
      // pagination
      numPages: 1,
      numPagesOptions: [5,10,15,20],
      currentPage: 1,
      itemsPerPage: 5,
      itemsCount: null,
      // course dialog fields
      name: null,
      academicDegree: null,
      acronym: null,
      description: null,
      website: null,
      creationDate: null,
      creationDateMenu:false,
      endDate: null,
      endDateMenu:false,
      selectedDepartmentId: null,
      //show course details dialog
      showCourseDetails: false,
      //form-validation
      formValid:false,
      departments: [],
    }
  },
  methods: {
     customDepartmentFilter (item, queryText, itemText) {        
          const hasValue = val => val != null ? val : ''
          const text = hasValue(item.name)
          const query = hasValue(queryText)
          return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
    },
    showConfirmDialog(action, title){
        this.warningDialog=true
        this.warningAction=action 
        this.warningTitle=title
    },
    warningAction(){ // function to be ovewritten by the correct action
    },
    saveCreationDate (date) {
		  this.$refs.creationDateMenu.save(date)
	  },
    saveEndDate (date) {
		  this.$refs.endDateMenu.save(date)
	  },
    closeDialog(){
      this.courseDialog=false
      this.updatingCourse=false      
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
          departmentId: this.selectedDepartmentId,
        }
    },
    async createCourse(){
        
      try{
        this.success = (await CourseService.create_course(this.getCourseObject())).data

        this.closeDialog()
        
        // update course list
        this.getCourses()
      }catch(error){
        this.error=error
      }
      
    },
    openUpdateCourseDialog(course){
      // update dialog fields
      this.name=course.name
      this.academicDegree=course.academicDegree
      this.acronym=course.acronym
      this.description=course.description
      this.website=course.website
      this.creationDate=(course.creationDate !== null) ? String(course.creationDate).substring(0,10) : course.creationDate
      this.endDate=(course.endDate !== null) ? String(course.endDate).substring(0,10) : course.endDate
      this.selectedDepartmentId=course.DepartmentId
      
      this.updatingCourse=true
      this.courseDialog=true
      this.currentCourse=course
    },
    async updateCourse(){
      
      try{
        let courseInfo = this.getCourseObject()
        courseInfo['courseId']=this.currentCourse.id

        this.success=(await CourseService.update_course(courseInfo)).data
        
        this.closeDialog()
        // update course list
        this.getCourses()
      }catch(error){
        this.error=error
      }
    
    },
    async deleteCourse(){
      try{
        this.success = (await CourseService.delete_course(this.currentCourse.id)).data
        
        // update course list
        this.getCourses()
      }catch(error){
        this.error=error
      }
    },
    async getCourses(){      
      try{
        this.itemsCount = (await CourseService.get_courses_count()).data.count
        this.numPages = Math.ceil(this.itemsCount / this.itemsPerPage)
        const from = (this.currentPage - 1) * this.itemsPerPage
        this.courses = (await CourseService.list_courses_in_range(from, this.itemsPerPage)).data
      }catch(error){
        this.error=error
      }
    },
    async getDepartments(){
      try{
        this.departments = (await DepartmentService.list_all_departments()).data
      }catch(error){
        this.error=error
      }
    }
  },     
  mounted: async function (){
      await this.getCourses()
      await this.getDepartments()
  },
   watch: {
     // date-picker stuff
    creationDate (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))

      if(val === '')
        this.creationDate = null;
    },
    endDate (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      
      if(val === '')
        this.endDate = null;
    },
    courseDialog (val) {
      // to clear red fields and form data
      if(val && !this.updatingCourse)
        this.$refs.form.reset()
    },
    success (val){
      if(val !== null){
        this.error=null
        this.feedbackColor='success'
        this.showingFeedback=true
      }
    },
    error(val){
      if(val !== null){
        this.success=null
        this.feedbackColor='error'
        this.showingFeedback=true
      }
    },
    currentPage(val){
      this.getCourses();
    },
    itemsPerPage(val){
      this.getCourses()
    }
  },
}
</script>

<style scoped>


</style>
