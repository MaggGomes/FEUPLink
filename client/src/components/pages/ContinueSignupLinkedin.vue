<template>
    <v-content id="createContent">
		 <v-container fluid v-if="loading">
        <buffering-wheel />
      </v-container>
      <v-container fluid v-else>
        <v-toolbar dark class="red darken-4" height="40px">
              <v-toolbar-title style="font-size: 15px">Continue Signup Linkedin</v-toolbar-title>
            </v-toolbar>
         		<v-stepper v-model="e1" >
         			<v-stepper-header>
         				<v-stepper-step step="1" :complete="e1 > 1">Profile type</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="2">In FEUP</v-stepper-step>
         			</v-stepper-header>
         			<v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card color="grey lighten-3" class="mb-5" fill-height>
                    <v-container fill-height>
                        <v-layout align-center>
                        <v-flex xs12 sm12 text-xs-center>
                            <div class="cc-selector">
                            <input v-model="role" id="student" type="radio" name="credit-card" value="student" />
                            <label class="drinkcard-cc student" for="student"></label>
                            <input v-model="role" id="staff" type="radio" name="credit-card" value="staff" />
                            <label class="drinkcard-cc staff" for="staff"></label>
                            </div>
                        </v-flex>
                        </v-layout>
                    </v-container>
                            </v-card>
                            <v-flex xs12 sm12 text-right class="text-xs-right">
                                <v-btn dark class="red darken-4"  border-radius="0px" @click.native="e1 = 2">Continue</v-btn>
                            </v-flex>
                        </v-stepper-content>
         			<v-stepper-content step="2">
         				<v-card color="grey lighten-3" class="mb-5">
         					<v-form v-model="valid" ref="form" autocomplete="off" lazy-validation>
         						<v-container fluid>
											<v-layout row wrap align-center v-if="role == 'staff'">
										<v-flex xs9 text-xs-center>
												<v-select
													:items="departments"													
													v-model="departmentId"
													item-text="name"
													item-value="id"
													label="Select your department"
													prepend-icon="person"													
													:rules="[v => !!v || 'You must select a department']"
													required
												></v-select>		
											</v-flex>
											<v-flex xs3 text-xs-center>
												<v-btn-toggle v-model="dpVisible">
															<v-btn flat>
																<v-icon>visibility</v-icon>
															</v-btn>
															<v-btn flat>
																<v-icon>visibility_off</v-icon>
															</v-btn>
														</v-btn-toggle>
											</v-flex>									
										 </v-layout>	
										
										<v-layout row wrap align-center v-if="role == 'student'">
											<v-flex xs9 sm5 text-xs-center>
												<v-select
												:items="degrees"
												v-model="degree"
												label="Academic degree"
												prepend-icon="person"
												:rules="[v => !!v || 'Academic Degree is required']"
												></v-select>
											</v-flex>											
											<v-flex xs9 sm5 offset-sm1 text-xs-center>		
											  <v-select
													:items="courses"													
													v-model="courseId"
													item-text="name"
													item-value="id"
													label="Select your course"
													prepend-icon="person"
													autocomplete
													:rules="[v => !!v || 'You must select a course']"
													required
												></v-select>									
											</v-flex>
											<v-flex xs3 sm1 text-xs-center>
												<v-btn-toggle v-model="courseVisible">
													<v-btn flat>
														<v-icon>visibility</v-icon>
													</v-btn>
													<v-btn flat>
														<v-icon>visibility_off</v-icon>
													</v-btn>
												</v-btn-toggle>
											</v-flex>
										</v-layout>
									<v-layout align-center v-if="role == 'staff'">
										<v-flex xs9 sm11 text-xs-center>
											<v-text-field
												prepend-icon="person"
												label="Working location"
												v-model="workingLocation"
												></v-text-field>
										</v-flex>
										<v-flex xs3 sm1 text-xs-center>
											<v-btn-toggle v-model="workingLocationVisible">
												<v-btn flat>
													<v-icon>visibility</v-icon>
												</v-btn>
												<v-btn flat>
													<v-icon>visibility_off</v-icon>
												</v-btn>
											</v-btn-toggle>
										</v-flex>
									</v-layout>

									<v-layout row wrap align-center>
										<v-flex xs9 sm5 text-xs-center>
											<v-menu
												ref="menu2"
												lazy
												:close-on-content-click="false"
												v-model="menu2"
												transition="scale-transition"
												offset-y
												full-width
												:nudge-right="40"
												min-width="290px"
												>
												<v-text-field v-if="role == 'student'"
												slot="activator"
												label="Enrollment date"
												v-model="date2"
												prepend-icon="event"
												readonly
												></v-text-field>
												<v-text-field v-if="role == 'staff'"
												slot="activator"
												label="Start date"
												v-model="date2"
												prepend-icon="event"
												readonly
												></v-text-field>
												<v-date-picker
												ref="picker"
												v-model="date2"
												@change="save"
												min="1950-01-01"
												:max="new Date().toISOString().substr(0, 10)"
												type="month"
												></v-date-picker>
											</v-menu>
										</v-flex>
										<v-flex xs3 sm1 text-xs-center>
											<v-btn-toggle v-model="date2Visible">
												<v-btn flat>
													<v-icon>visibility</v-icon>
												</v-btn>
												<v-btn flat>
													<v-icon>visibility_off</v-icon>
												</v-btn>
											</v-btn-toggle>
										</v-flex>

										<v-flex class="to" xs12 sm1 text-xs-center>
											to
										</v-flex>

										<v-flex xs9 sm4 text-xs-center>
											<v-menu
												ref="menu3"
												lazy
												:close-on-content-click="false"
												v-model="menu3"
												transition="scale-transition"
												offset-y
												full-width
												:nudge-right="40"
												min-width="290px"
												>
												<v-text-field v-if="role == 'student'"
												slot="activator"
												label="Graduation date"
												v-model="date3"
												prepend-icon="event"
												readonly
												></v-text-field>
												<v-text-field v-if="role == 'staff'"
												slot="activator"
												label="End date"
												v-model="date3"
												prepend-icon="event"
												readonly
												></v-text-field>
												<v-date-picker
												ref="picker"
												v-model="date3"
												@change="save"
												min="1950-01-01"
												:max="new Date().toISOString().substr(0, 10)"
												type="month"
												></v-date-picker>
											</v-menu>
										</v-flex>
										<v-flex xs3 sm1 text-xs-center>
											<v-btn-toggle v-model="date3Visible">
												<v-btn flat>
													<v-icon>visibility</v-icon>
												</v-btn>
												<v-btn flat>
													<v-icon>visibility_off</v-icon>
												</v-btn>
											</v-btn-toggle>
										</v-flex>
									</v-layout>

							<v-layout align-center v-if="role == 'student'">
								<v-flex xs9 sm11 text-xs-center>		
									<v-select
											:items="studentTypes"
											v-model="studenType"
											label="Student type"
											prepend-icon="person"
											:rules="[v => !!v || 'Student type is required']"
											required
											></v-select>
								</v-flex>
								<v-flex xs3 sm1 text-xs-center>
									<v-btn-toggle v-model="typeVisible">
										<v-btn flat>
											<v-icon>visibility</v-icon>
										</v-btn>
										<v-btn flat>
											<v-icon>visibility_off</v-icon>
										</v-btn>
									</v-btn-toggle>
								</v-flex>
							</v-layout>
							<v-layout align-center>
								<v-flex xs9 sm11 text-xs-center>
									<v-text-field
									prepend-icon="person"
									label="Mec number"
									v-model="number"
									:rules="[v => !!v || 'Number is required']"
									required
									></v-text-field>
								</v-flex>
								<v-flex xs3 sm1 text-xs-center>
									<v-btn-toggle v-model="numberVisible">
										<v-btn flat>
											<v-icon>visibility</v-icon>
										</v-btn>
										<v-btn flat>
											<v-icon>visibility_off</v-icon>
										</v-btn>
									</v-btn-toggle>
								</v-flex>
							</v-layout>
         				</v-container>
         			</v-form>
         		</v-card>
				<v-flex xs12 sm12 text-right class="text-xs-right">
					<v-btn  @click.native="e1 = 1" flat>Back</v-btn>					
					<v-btn 
						color="primary" 
						v-on:click="submitData" 
						:disabled="!valid">
							Finish
					</v-btn>
				</v-flex>
         	</v-stepper-content>
         </v-stepper-items>
     </v-stepper>
      <v-alert xs12 type="error" :value="showingError">
        {{this.errorMessage}}
      </v-alert>
      </v-container>
    </v-content>
</template>

<script>

import Vue from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import BufferingWheel from '@/components/elements/BufferingWheel'
import DepartmentService from '@/services/DepartmentService'
import CourseService from '@/services/CourseService'

export default {
	 components: {
      BufferingWheel
  },
  data () {
    return {
			valid:false,
			showingError: false,
			errorMessage: '',
			// form-fields
			loading: false,
      e1: 0,
      date2: null,
      date3: null,
      menu2: false,
      menu3: false,
			studenType: null,
			studentTypes: ['Actual Student', 'Mobility Student', 'Alumni'],
      courseId: null,
      courses: null,
			departmentId: null,
      departments: null,
      role: 'student',	  
      number: '',
			degree: null,
			degrees: ['Bachelor', 'Masters', 'PhD'],
			dpVisible: 0,
			degreeVisible: 0,
			courseVisible: 0,
			date2Visible: 0,
			date3Visible: 0,
			typeVisible: 0,
      numberVisible: 0,
			workingLocationVisible: 0,
			workingLocation: '',
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    async submitData () {
				try{
					if (this.$refs.form.validate()) {
						await AuthenticationService.continue_signup_linkedin({
							personType: this.role,
							//student stuff
							courseId: this.courseId,
							enrollmentDate: this.date2,
							graduationDate: this.date3,
							studenType: this.studenType,
							// staff stuff
							departmentId: this.departmentId,						
							workingLocation: this.workingLocation,
							startDate: this.date2,
							endDate: this.date3,
							// commmon
							mecNumber: this.number,
						});
						
						this.$router.push('Feed');
					}
				}catch(error){
					this.e1=1;
					this.showingError=true;
					this.errorMessage=error.response.data.error;
				}
		},
		save (date) {
			this.$refs.menu.save(date)
		},
		async getCourses(){
      try{
        this.courses = (await CourseService.list_all_courses()).data
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
		await this.getCourses();
		await this.getDepartments()
  },	
}
</script>

<style scopped>
.v-select .dropdown-menu {
	display:block;
}

.primary {
  background-color: #b71c1c !important;
}

.cc-selector input {
    margin:0;padding:0;
    -webkit-appearance:none;
       -moz-appearance:none;
            appearance:none;
}

.student{background-image:url(https://cdn3.iconfinder.com/data/icons/school-and-education-2/56/education_icons_IF-02-512.png);}
.staff{background-image:url(https://cdn4.iconfinder.com/data/icons/hr-recruitment-management-part-2/400/hr-07-2-512.png);}

.cc-selector input:active +.drinkcard-cc{opacity: .9;}
.cc-selector input:checked +.drinkcard-cc{
    -webkit-filter: none;
       -moz-filter: none;
            filter: none;
}
.drinkcard-cc {
    cursor:pointer;
    background-size:contain;
    background-repeat:no-repeat;
    display:inline-block;
    width:400px;height:280px;
    -webkit-transition: all 100ms ease-in;
       -moz-transition: all 100ms ease-in;
            transition: all 100ms ease-in;
    -webkit-filter: brightness(1.8) grayscale(1) opacity(.7);
       -moz-filter: brightness(1.8) grayscale(1) opacity(.7);
            filter: brightness(1.8) grayscale(1) opacity(.7);
}
.drinkcard-cc:hover{
    -webkit-filter: brightness(1.2) grayscale(.5) opacity(.9);
       -moz-filter: brightness(1.2) grayscale(.5) opacity(.9);
            filter: brightness(1.2) grayscale(.5) opacity(.9);
}

/* Extras */
a:visited{color:#888}
a{color:#444;text-decoration:none;}
p{margin-bottom:.3em;}

@media only screen and (max-width: 720px) {
	#createContent {
		padding: 0 !important;
	}
	.stepper__content {
		padding: 0;
	}
	.drinkcard-cc {
		width:240px;height:180px;
	}
	.to {
		display: none;
	}
}
</style>
