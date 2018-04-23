<template>
  <v-container fluid>
  <v-layout row wrap>

    <v-dialog v-model="createDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Create a new Course Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Age"
                  required
                  :items="['0-17', '18-29', '30-54', '54+']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="createDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="createDialog = false">Save</v-btn>
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

      <v-layout mt-2 row wrap>
        <v-flex xs12 offset-md1 md10 v-for="course in courses" :key="course.id">
          <v-toolbar>
            <v-toolbar-title>{{course.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat  @click="updateCourse(course)">
                <v-icon> mode edit </v-icon>
              </v-btn>
              <v-btn flat color="error" @click="deleteCourse(course.id)">
                <v-icon> delete </v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
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
        <v-alert type="error" :value="true">
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
      createDialog: false,
      updateDialog: false,
      courses: [],
      
    }
  },
  methods: {
    async addCourse(){
      console.log('add: ');
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
  }
}
</script>

<style scoped>


</style>
