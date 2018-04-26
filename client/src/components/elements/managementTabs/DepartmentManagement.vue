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


      <!-- dialog new department -->
      <v-dialog v-model="departmentDialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline"> {{ updatingDepartment ? 'Update Department information' : 'Create a new Department' }} </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValid" ref="form" autocomplete="off">
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-flex xs12 md9>
                    <v-text-field label="Department name" hint="This must be unique" v-model="name" :rules="[v => !!v || 'Department name is required']"
                      required></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-text-field label="Department acronym" v-model="acronym" :rules="[v => !!v || 'Department acronym is required']" required></v-text-field>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="() => {                
                  if(updatingDepartment)
                    showConfirmDialog(updateDepartment, 'Are you sure you want to update the department?')
                   else
                     showConfirmDialog(createDepartment, 'Are you sure you want to create the department?')
                }" :disabled="!formValid">
              {{ updatingDepartment ? 'Update' : 'Create' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <span class="display-1"> Manage Departments </span>

      <v-btn flat color="success" slot="activator" @click="departmentDialog=true">
        <v-icon> add </v-icon>
      </v-btn>

      <!-- department details dialog -->
      <v-dialog v-model="showDepartmentDetails">
        <v-card>
          <v-card-title v-if="currentDepartment !== null" class="headline">{{currentDepartment.name}}</v-card-title>
          <v-card-text>
            <department-details :department="currentDepartment"> </department-details>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="blue darken-1" @click="showDepartmentDetails=false"> Dismiss </v-btn>          
          </v-card-actions>
        </v-card>        
      </v-dialog>

      <!-- list of departments -->

      <v-toolbar v-for="department in departments" :key="department.id">
        <v-toolbar-title>{{department.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items >
         <v-btn flat @click="() => {
                      currentDepartment=department  
                      showDepartmentDetails=true                    
                  }">
            <v-icon> remove_red_eye </v-icon>
          </v-btn>
          <v-btn flat @click="openUpdateDepartmentDialog(department)">
            <v-icon> mode_edit </v-icon>
          </v-btn>
          <v-btn flat color="error" @click="() => {
                      currentDepartment=department
                      showConfirmDialog(deleteDepartment, `Are you sure you want to delete \'${department.name}\' ?`)
                  }">
            <v-icon> delete </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>




    </v-layout>
  </v-container>
</template>


<script>
import DepartmentService from '@/services/DepartmentService'
import DepartmentDetails from '@/components/elements/DepartmentDetails'

export default {
  components:{
    DepartmentDetails,
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
      departmentDialog: false,
      // update
      updatingDepartment: false,
      currentDepartment: null,
      // departments data
      departments: [],
      // department dialog fields
      name: null,
      acronym: null,
      //show department details dialog
      showDepartmentDetails:false,
      //form-validation
      formValid:false,
    }
  },
  methods: {
    showConfirmDialog(action, title){
        this.warningDialog=true
        this.warningAction=action 
        this.warningTitle=title
    },
    warningAction(){ // function to be ovewritten by the correct action
    },
    closeDialog(){
      this.departmentDialog=false
      this.updatingDepartment=false      
    },    
    getDepartmentObject(){
      // returns the object with a department based on the dialog fields
      return {
          name: this.name,        
          acronym: this.acronym,        
        }
    },
    async createDepartment(){
        
      try{
        this.success = (await DepartmentService.create_department(this.getDepartmentObject())).data

        this.closeDialog()
        
        // update department list
        this.getDepartments()
      }catch(error){
        this.error=error
      }
      
    },
    openUpdateDepartmentDialog(department){
      // update dialog fields
      this.name=department.name
      this.acronym=department.acronym
    
      this.updatingDepartment=true
      this.departmentDialog=true
      this.currentDepartment=department
    },
    async updateDepartment(){
      
      try{
        let departmentInfo = this.getDepartmentObject()
        departmentInfo['departmentId']=this.currentDepartment.id

        this.success=(await DepartmentService.update_department(departmentInfo)).data
        
        this.closeDialog()
        // update department list
        this.getDepartments()
      }catch(error){
        this.error=error
      }
    
    },
    async deleteDepartment(){
      try{
        this.success = (await DepartmentService.delete_department(this.currentDepartment.id)).data
        
        // update department list
        this.getDepartments()
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
      await this.getDepartments();
  },
   watch: {   
    departmentDialog (val) {
      // to clear red fields and form data
      if(val && !this.updatingDepartment)
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
    }
  },
}
</script>

<style scoped>


</style>
