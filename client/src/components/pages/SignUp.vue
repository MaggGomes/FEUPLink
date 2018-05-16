<template>
    <v-content id="createContent">
      <v-container fluid v-if="firstStep" id="createNewAcc">
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm10 md5 id="main_card">
            <v-card class="elevation-12">
              <v-toolbar dark id="title_create">
                <v-toolbar-title>{{$t('signup')}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <v-form autocomplete="off" ref="form" v-model="valid">
                <v-text-field :name="name"
                  prepend-icon="person"
                  :placeholder="$t('name')"
                  v-model="name"
                  :rules="nameRules"
                  :counter="50"
                  required
                ></v-text-field>
                <v-text-field :email="email"
                  prepend-icon="email"
                  :placeholder="$t('email')"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field :password="password"
                  prepend-icon="lock"
                  :placeholder="$t('password')"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  :placeholder="$t('repeat_password')"
                  type="password"
                  v-model="repeatPassword"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-form>
               <div class="danger-alert" v-html="error" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="valid" v-on:click="continueSignup" dark class="continue_btn">{{$t('continue')}}</v-btn>
				<v-btn class="continue_btn" v-else disabled>{{$t('continue')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md5 id="social">
			<facebook-button class="signup-button elevation-12"></facebook-button><br>
            <linked-in-button class="signup-button elevation-12" ></linked-in-button>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
      <v-container id="userInfo" fluid v-else>
        <v-toolbar dark height="40px" id="title_registration">
              <v-toolbar-title style="font-size: 15px">{{$t('signup')}}</v-toolbar-title>
            </v-toolbar>
         		<v-stepper v-model="e1" >
         			<v-stepper-header>
         				<v-stepper-step step="1" :complete="e1 > 1">{{$t('personal')}}</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="2" :complete="e1 > 2">{{$t('profile_type')}}</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="3" :complete="e1 > 3">{{$t('in_feup')}}</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="4">{{$t('experience')}}</v-stepper-step>
         			</v-stepper-header>
         			<v-stepper-items>
         				<v-stepper-content step="1">
         					<v-card color="grey lighten-3" class="mb-4">

         						<v-form autocomplete="off" ref="form" v-model="formValid1">
         							<v-container fluid>
												<v-layout align-center>
													<v-flex xs9 sm11 text-xs-center>
														<v-menu
															ref="menu"
															lazy
															:close-on-content-click="false"
															v-model="menu"
															transition="scale-transition"
															offset-y
															full-width
															:nudge-right="40"
															min-width="290px"
															>
															<v-text-field
															slot="activator"
															:placeholder="$t('birthdate')"
															v-model="date"
															prepend-icon="event"
															readonly
															></v-text-field>
															<v-date-picker
															ref="picker"
															v-model="date"
															@change="save"
															min="1950-01-01"
															:max="new Date().toISOString().substr(0, 10)"
															></v-date-picker>
														</v-menu>
													</v-flex>
													<v-flex xs3 sm1 text-xs-center>
														<v-btn-toggle v-model="birthdayVisible">
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
														<v-select
															:items="$t('genders')"
															v-model="gender"
															:placeholder="$t('gender')"
															prepend-icon="person"
															:rules="genderRules"
															required
														></v-select>
													</v-flex>
													<v-flex xs3 sm1 text-xs-center>
														<v-btn-toggle v-model="genderVisible">
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
														:placeholder="$t('country')"
														v-model="country"
														></v-text-field>
													</v-flex>
													<v-flex xs3 sm1 text-xs-center>
														<v-btn-toggle v-model="countryVisible">
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
														:placeholder="$t('city')"
														v-model="city"
														></v-text-field>
													</v-flex>
													<v-flex xs3 sm1 text-xs-center>
														<v-btn-toggle v-model="cityVisible">
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
							<v-btn v-if="formValid1" dark class="continue_btn" height="33px" border-radius="0px" @click.native="e1 = 2">{{$t('continue')}}</v-btn>
							<v-btn v-else class="continue_btn" disabled>{{$t('continue')}}</v-btn>
						</v-flex>
         			</v-stepper-content>
         			<v-stepper-content step="2">
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
							<v-btn class="back_btn" background-color="darkgrey" @click.native="e1 = 1" flat>{{$t('back')}}</v-btn>							
							<v-btn dark class="continue_btn"  border-radius="0px" @click.native="e1 = 3">{{$t('continue')}}</v-btn>
						</v-flex>
					 </v-stepper-content>
         			<v-stepper-content step="3">
         				<v-card color="grey lighten-3" class="mb-5">
         					<v-form autocomplete="off" ref="form" v-model="formValid2">
         						<v-container fluid>
											<v-layout row wrap align-center v-if="role == 'staff'">
											<v-flex xs9 text-xs-center>
												<v-select
													:items="departments"	
													v-model="departmentId"
													item-text="name"
													item-value="id"
													:placeholder="$t('department')"
													prepend-icon="person"	
													:rules="departmentRules"
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
											<v-flex xs12 sm6 text-xs-center>
												<v-select
												:items="$t('degrees')"
												v-model="degree"
												:placeholder="$t('degree')"
												prepend-icon="person"
												:rules="degreeRules"
												required
												></v-select>
											</v-flex>
											<v-flex xs12 sm6 text-xs-center>	
											  <v-select
													:items="filteredCourses"		
													v-model="courseId"
													item-text="name"
													item-value="id"
													:placeholder="$t('course')"
													prepend-icon="person"
													autocomplete
													:rules="courseRules"
													required
												></v-select>
											</v-flex>
										</v-layout>

									<v-layout align-center v-if="role == 'staff'">
										<v-flex xs9 sm11 text-xs-center>
											<v-text-field
												prepend-icon="person"
												:placeholder="$t('working_location')"
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
										<v-flex xs12 sm6 text-xs-center>
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
												:placeholder="$t('enrollment_date')"
												v-model="date2"
												prepend-icon="event"
												readonly
												:rules="enrollmentDateRules"
												required
												></v-text-field>
												<v-text-field v-if="role == 'staff'"
												slot="activator"
												:placeholder="$t('start_date')"
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

										<v-flex class="to" xs12 sm1 text-xs-center>
											to
										</v-flex>

										<v-flex xs12 sm5 text-xs-center>
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
												:placeholder="$t('graduation_date')"
												v-model="date3"
												prepend-icon="event"
												readonly
												></v-text-field>
												<v-text-field v-if="role == 'staff'"
												slot="activator"
												:placeholder="$t('end_date')"
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
									</v-layout>

							<v-layout align-center v-if="role == 'student'">
								<v-flex xs9 sm11 text-xs-center>		
									<v-select
										:items="$t('student_types')"
										v-model="type"
										:placeholder="$t('student_type')"
										prepend-icon="person"
										:rules="studentTypeRules"
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
									:placeholder="$t('mec_number')"
									v-model="number"
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
					<v-btn  @click.native="e1 = 2" flat class="back_btn">{{$t('back')}}</v-btn>					
					<v-btn v-if="formValid2" dark class="continue_btn" border-radius="0px" @click.native="e1 = 4">{{$t('continue')}}</v-btn>
					<v-btn v-else disabled class="continue_btn">{{$t('continue')}}</v-btn>
				</v-flex>
			 </v-stepper-content>
         	<v-stepper-content step="4">
         		<v-card color="grey lighten-3" class="mb-5">

         		<v-form autocomplete="off" ref="form" v-model="formValid3">
							<v-container fluid>
								<v-layout align-center>
									<v-flex xs12 sm12 text-xs-center>
										<v-text-field v-if="checkboxNoExperience"
												prepend-icon="person"
												:placeholder="$t('company')"
												v-model="company"
										></v-text-field>
										<v-text-field v-else
												prepend-icon="person"
												:placeholder="$t('company')"
												v-model="company"
												:rules="companyRules"
												required
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout row wrap align-center>
									<v-flex xs12 sm6 text-xs-center>
										<v-select
											:items="$t('company_types')"
											v-model="companyType"
											:placeholder="$t('company_type')"
											prepend-icon="person"
										></v-select>
									</v-flex>
									<v-flex xs12 sm6 text-xs-center>
										<v-text-field
										prepend-icon="person"
										:placeholder="$t('company_industry')"
										v-model="companyIndustry"
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout align-center>
									<v-flex xs12 sm12 text-xs-center>
										<v-text-field v-if="checkboxNoExperience"
										prepend-icon="person"
										:placeholder="$t('position')"
										v-model="position"
										></v-text-field>
										<v-text-field v-else
										prepend-icon="person"
										:placeholder="$t('position')"
										v-model="position"
										:rules="positionRules" required
										></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row wrap align-center>
									<v-flex xs12 sm6 text-xs-center>
										<v-menu
											ref="menu4"
											lazy
											:close-on-content-click="false"
											v-model="menu4"
											transition="scale-transition"
											offset-y
											full-width
											:nudge-right="40"
											min-width="290px"
											>
											<v-text-field v-if="checkboxNoExperience"
											slot="activator"
											:placeholder="$t('start_date')"
											v-model="date4"
											prepend-icon="event"
											readonly
											></v-text-field>
											<v-text-field v-else
											slot="activator"
											:placeholder="$t('start_date')"
											v-model="date4"
											prepend-icon="event"
											readonly
											:rules="startDateRules"
											required
											></v-text-field>
											<v-date-picker
											ref="picker"
											v-model="date4"
											@change="save"
											min="1950-01-01"
											:max="new Date().toISOString().substr(0, 10)"
											type="month"
											></v-date-picker>
										</v-menu>
									</v-flex>

									<v-flex class="to" xs12 sm1 text-xs-center>
										to
									</v-flex>

									<v-flex xs12 sm5 text-xs-center>
										<v-menu
											ref="menu5"
											lazy
											:close-on-content-click="false"
											v-model="menu5"
											transition="scale-transition"
											offset-y
											full-width
											:nudge-right="40"
											min-width="290px"
											>
											<v-text-field
											slot="activator"
											:placeholder="$t('end_date')"
											v-model="date5"
											prepend-icon="event"
											readonly
											></v-text-field>
											<v-date-picker
											ref="picker"
											v-model="date5"
											@change="save"
											min="1950-01-01"
											:max="new Date().toISOString().substr(0, 10)"
											type="month"
											></v-date-picker>
										</v-menu>
									</v-flex>
								</v-layout>
							
							<v-layout row wrap align-center>
								<v-flex xs12 sm3 text-xs-center>
									<v-checkbox
									:label="$t('currently_working')"
									v-model="checkboxWork"
									></v-checkbox>
								</v-flex>
							</v-layout>
							<v-layout row wrap align-center>
								<v-flex xs12 sm3 text-xs-center>
									<v-checkbox
									:label="$t('no_work_experience')"
									v-model="checkboxNoExperience"
									></v-checkbox>
								</v-flex>
							</v-layout>
							
         				</v-container>
         			</v-form>
         			</v-card>
				<v-flex xs12 sm12 text-right class="text-xs-right">
					<v-btn @click.native="e1 = 3" flat class="back_btn">{{$t('back')}}</v-btn>					
					<v-btn v-if="formValid3" class="finish_btn" color="primary" v-on:click="signup">{{$t('finish')}}</v-btn>
					<v-btn v-else disabled class="finish_btn">{{$t('finish')}}</v-btn>
				</v-flex>
         	</v-stepper-content>
         </v-stepper-items>
     </v-stepper>
      </v-container>
    </v-content>
</template>

<script>

import Vue from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import LinkedInButton from '@/components/elements/LinkedInButton'
import FacebookButton from '@/components/elements/FacebookButton'
import DepartmentService from '@/services/DepartmentService'
import CourseService from '@/services/CourseService'

export default {
  name: 'SignUp',
   components: {
    LinkedInButton,FacebookButton
  },
  data () {
    return {    
	  valid: false,
	  formValid1: false,
	  formValid2: false,
	  formValid3: false,
      name: 'paulo',
      email: 'paulo@gmail.com',
      password: '1234paulo',
      repeatPassword: '1234paulo',
      error: null,
      firstStep: true,
      e1: 0,
      date: null,
      date2: null,
      date3: null,
      date4: null,
      date5: null,
      gender: null,
      country: '',
	  companyType: null,
	  types: this.$i18n.messages[this.$i18n.locale]['company_types'],
	  menu: false,
	  menu2: false,
	  menu3: false,
	  menu4: false,
	  menu5: false,
	  type: null,
	  studentTypes: this.$i18n.messages[this.$i18n.locale]['student_types'],
      checkboxWork: false,
      checkboxNoExperience: false,
      number: '',
      genders: this.$i18n.messages[this.$i18n.locale]['genders'],
      courseId: null,
      courses: null,
	departmentId: null,
      departments: null,
      company: '',
      city: '',
      position: '',
      role: 'student',	
	  degree: null,
	  degrees: this.$i18n.messages[this.$i18n.locale]['degrees'],
	  birthdayVisible: 0,
	  genderVisible: 0,
	  countryVisible: 0,
	  cityVisible: 0,
	  dpVisible: 0,
	  typeVisible: 0,
	  numberVisible: 0,
	  companyIndustry: '',
	  workingLocationVisible: 0,
	  workingLocation: '',
	  nameRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['name_rule1'],
		v => v.length <= 50 || this.$i18n.messages[this.$i18n.locale]['name_rule2']
	  ],
	  emailRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['email_rule1'],
		v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$i18n.messages[this.$i18n.locale]['email_rule2']
	  ],
	  passwordRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['password_rule1'],
		v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || this.$i18n.messages[this.$i18n.locale]['password_rule2']
	  ],
	  degreeRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['degree_rule']
	  ],
	  departmentRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['department_rule']
	  ],
	  courseRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['course_rule']
	  ],
	  enrollmentDateRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['enrollment_date_rule']
	  ],
	  startDateRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['start_date_rule']
	  ],
	  studentTypeRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['student_type_rule']
	  ],
	  companyRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['company_rule']
	  ],
	  positionRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['position_rule']
	  ],
	  genderRules: [
		v => !!v || this.$i18n.messages[this.$i18n.locale]['gender_rule']
	  ],
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    continueSignup: function() {
      if(this.$refs.form.validate())
        this.firstStep = false;
    },
    async signup () {
			try {
				let resp
				if(this.role == 'student') {
					resp = (await AuthenticationService.signup_student({
						name: this.name,
						email: this.email,
						hashedPassword: this.password,
						birthDate: this.date,
						birthDate_visibility: ((this.birthdayVisible == 0) ? true : false),
						gender: this.gender,
						gender_visibility: ((this.genderVisible == 0) ? true : false),
						country: this.country,
						country_visibility: ((this.countryVisible == 0) ? true : false),
						city: this.city,
						city_visibility: ((this.cityVisible == 0) ? true : false),
						courseId: this.courseId,
						enrollmentDate: this.date2,
						graduationDate: this.date3,
						type: this.type,
						type_visibility: ((this.typeVisible == 0) ? true : false),
						mecNumber: this.number,
						mecNumber_visibility: ((this.numberVisible == 0) ? true : false),
						company: this.company,
						companyType: this.companyType,
						companyIndustry: this.companyIndustry,
						title: this.position,
						startDate: this.date4,
						endDate: this.date5,
						isCurrent: this.checkboxWork,
						workExperience: this.checkboxNoExperience
					})).data
				}
				else {
					resp = (await AuthenticationService.signup_staff({
						name: this.name,
						email: this.email,
						hashedPassword: this.password,
						birthDate: this.date,
						birthDate_visibility: ((this.birthdayVisible == 0) ? true : false),
						gender: this.gender,
						gender_visibility: ((this.genderVisible == 0) ? true : false),
						country: this.country,
						country_visibility: ((this.countryVisible == 0) ? true : false),
						city: this.city,
						city_visibility: ((this.cityVisible == 0) ? true : false),
						departmentId: this.departmentId,
						workingLocation: this.workingLocation,
						workingLocation_visibility: ((this.workingLocationVisible == 0) ? true : false),
						startDate: this.date2,
						startDate_visibility: ((this.date2Visible == 0) ? true : false),
						endDate: this.date3,
						endDate_visibility: ((this.date3Visible == 0) ? true : false),
						mecNumber: this.number,
						mecNumber_visibility: ((this.numberVisible == 0) ? true : false),
						company: this.company,
						companyType: this.companyType,
						companyIndustry: this.companyIndustry,
						title: this.position,
						startDate: this.date4,
						endDate: this.date5,
						isCurrent: this.checkboxWork,
						workExperience: this.checkboxNoExperience
					})).data
				}	
				
				if (resp != null) {
          this.$store.dispatch("setToken", resp.token);
          this.$store.dispatch("setUser", resp.person);
          this.loading = false;
          this.$router.push("Feed");
        }
			}catch(error){
				 this.error=error
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
  computed: {
    filteredCourses() {
      return this.courses.filter(c => c.academicDegree == this.degree)
    }
  },
}
</script>

<style scopped>
.signup-button {
  width: 100%;
  height:60px;
  font-size: 125%;
}

.continue_btn, .back_btn, .finish_btn, .stepper__step--active .stepper__step__step, .stepper__step--complete .stepper__step__step, .toolbar__content{
	background-color:rgb(140,45,25)!important;
	color:white!important;
}
.v-select .dropdown-menu {
	display:block;
}

.cc-selector input {
    margin:0;padding:0;
    -webkit-appearance:none;
       -moz-appearance:none;
            appearance:none;
}

.student{
	background: url('https://cdn3.iconfinder.com/data/icons/school-and-education-2/56/education_icons_IF-02-512.png') no-repeat center;
	background-size: cover;
}
.staff{
	background: url('https://cdn4.iconfinder.com/data/icons/hr-recruitment-management-part-2/400/hr-07-2-512.png') no-repeat center;
	background-size: cover;
}

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
	#social {
		padding-top: 1.5em !important;
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
@media only screen and (max-width: 960px) and (min-width: 600px){
	#main_card {
		margin: 10px 20%;
	}
	#social {
		margin: 10px 40%;
	}
}
</style>
