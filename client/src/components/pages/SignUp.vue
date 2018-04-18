<template>
    <v-content>
      <v-container fluid v-if="firstStep">
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm10 md5>
            <v-card class="elevation-12">
              <v-toolbar dark class="red darken-4">
                <v-toolbar-title>Create new account</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <v-form autocomplete="off" ref="form" v-model="valid">
                <v-text-field :name="name"
                  prepend-icon="person"
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  :counter="50"
                  required
                ></v-text-field>
                <v-text-field :email="email"
                  prepend-icon="email"
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field :password="password"
                  prepend-icon="lock"
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  label="Repeat password"
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
                <v-btn v-on:click="continueSignup" dark class="red darken-4">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>
						<facebook-button class="signup-button elevation-12"></facebook-button><br>
            <linked-in-button class="signup-button elevation-12" ></linked-in-button>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
      <v-container fluid v-else>
        <v-toolbar dark class="red darken-4" height="40px">
              <v-toolbar-title style="font-size: 15px">Registration</v-toolbar-title>
            </v-toolbar>
         		<v-stepper v-model="e1" >
         			<v-stepper-header>
         				<v-stepper-step step="1" :complete="e1 > 1">Personal</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="2" :complete="e1 > 2">Profile type</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="3" :complete="e1 > 3">In FEUP</v-stepper-step>
         				<v-divider></v-divider>
         				<v-stepper-step step="4">Experience</v-stepper-step>
         			</v-stepper-header>
         			<v-stepper-items>
         				<v-stepper-content step="1">
         					<v-card color="grey lighten-3" class="mb-4" height="450px">

         						<form autocomplete="off">
         							<v-container fluid>
												<v-layout align-center>
													<v-flex xs24 sm17 text-xs-center>
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
															label="Birthday date"
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
													<v-flex xs24 sm1 text-xs-center>
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
													<v-flex xs24 sm17 text-xs-center>
														<v-select
															:items="genders"
															v-model="gender"
															label="Gender"
															prepend-icon="person"
														></v-select>
													</v-flex>
													<v-flex xs24 sm1 text-xs-center>
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
													<v-flex xs24 sm17 text-xs-center>
														<v-text-field
														prepend-icon="person"
														label="Country"
														v-model="country"
														></v-text-field>
													</v-flex>
													<v-flex xs24 sm1 text-xs-center>
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
													<v-flex xs24 sm17 text-xs-center>
														<v-text-field
														prepend-icon="person"
														label="City"
														v-model="city"
														></v-text-field>
													</v-flex>
													<v-flex xs24 sm1 text-xs-center>
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
         					</form>
         				</v-card>
         				<v-btn dark class="red darken-4" height="33px" border-radius="0px" @click.native="e1 = 2">Continue</v-btn>
         			</v-stepper-content>
         			<v-stepper-content step="2">
         				<v-card color="grey lighten-3" class="mb-5" height="450px" fill-height>
                   <v-container fill-height>
                    <v-layout align-center>
                      <v-flex xs24 sm12 text-xs-center>
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
         				<v-btn dark class="red darken-4"  border-radius="0px" @click.native="e1 = 3">Continue</v-btn>
         				<v-btn background-color="darkgrey" @click.native="e1 = 1" flat>Back</v-btn>
         			</v-stepper-content>
         			<v-stepper-content step="3">
         				<v-card color="grey lighten-3" class="mb-5" height="450px">
         					<form autocomplete="off">
         						<v-container fluid>
											 <v-layout align-center v-if="role == 'staff'">
											<v-flex xs24 sm5 text-xs-center>
												<v-text-field
													prepend-icon="person"
													label="Department name"
													v-model="dpName"
													></v-text-field>
											</v-flex>
											<v-flex xs24 sm1 text-xs-center>
												<v-btn-toggle v-model="dpNameVisible">
															<v-btn flat>
																<v-icon>visibility</v-icon>
															</v-btn>
															<v-btn flat>
																<v-icon>visibility_off</v-icon>
															</v-btn>
														</v-btn-toggle>
											</v-flex>
											<v-flex xs24 sm5 text-xs-center>
												<v-text-field
												prepend-icon="person"
												label="Department acronym"
												v-model="dpAcr"
												></v-text-field>
											</v-flex>
											<v-flex xs24 sm1 text-xs-center>
												<v-btn-toggle v-model="dpAcrVisible">
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
											<v-flex xs24 sm6 text-xs-center>
												<v-select
												:items="degrees"
												v-model="degree"
												label="Academic degree"
												prepend-icon="person"
												></v-select>
											</v-flex>
											<v-flex xs24 sm1 text-xs-center>
												<v-btn-toggle v-model="degreeVisible">
													<v-btn flat>
														<v-icon>visibility</v-icon>
													</v-btn>
													<v-btn flat>
														<v-icon>visibility_off</v-icon>
													</v-btn>
												</v-btn-toggle>
											</v-flex>
											<v-flex xs24 sm6 text-xs-center>		
												<v-select
												:items="courses"
												v-model="course"
												label="Course"
												prepend-icon="person"
												></v-select>
											</v-flex>
											<v-flex xs24 sm1 text-xs-center>
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
										<v-flex xs24 sm17 text-xs-center>
											<v-text-field
												prepend-icon="person"
												label="Working location"
												v-model="workingLocation"
												></v-text-field>
										</v-flex>
										<v-flex xs24 sm1 text-xs-center>
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

									<v-layout align-center>
										<v-flex xs24 sm5 text-xs-center>
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
										<v-flex xs24 sm1 text-xs-center>
											<v-btn-toggle v-model="date2Visible">
												<v-btn flat>
													<v-icon>visibility</v-icon>
												</v-btn>
												<v-btn flat>
													<v-icon>visibility_off</v-icon>
												</v-btn>
											</v-btn-toggle>
										</v-flex>

										<v-flex xs24 sm1 text-xs-center>
											to
										</v-flex>

										<v-flex xs24 sm5 text-xs-center>
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
										<v-flex xs24 sm1 text-xs-center>
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
								<v-flex xs24 sm17 text-xs-center>		
									<v-select
											:items="studentTypes"
											v-model="type"
											label="Student type"
											prepend-icon="person"
											></v-select>
								</v-flex>
								<v-flex xs24 sm1 text-xs-center>
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
								<v-flex xs24 sm17 text-xs-center>
									<v-text-field
									prepend-icon="person"
									label="Mec number"
									v-model="number"
									></v-text-field>
								</v-flex>
								<v-flex xs24 sm1 text-xs-center>
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
         			</form>
         		</v-card>

         		<v-btn dark class="red darken-4" border-radius="0px" @click.native="e1 = 4">Continue</v-btn>
         		<v-btn  @click.native="e1 = 2" flat>Back</v-btn>
         	</v-stepper-content>
         	<v-stepper-content step="4">
         		<v-card color="grey lighten-3" class="mb-5" height="450px">

         		<form autocomplete="off">
							<v-container fluid>
								<v-layout align-center>
									<v-flex xs24 sm17 text-xs-center>
										<v-text-field
												prepend-icon="person"
												label="Company"
												v-model="company"
												></v-text-field>
									</v-flex>
									<v-flex xs24 sm1 text-xs-center>
										<v-btn-toggle v-model="companyVisible">
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
									<v-flex xs24 sm6 text-xs-center>
										<v-select
											:items="types"
											v-model="companyType"
											label="Company type"
											prepend-icon="person"
										></v-select>
									</v-flex>
									<v-flex xs24 sm1 text-xs-center>
										<v-btn-toggle v-model="companyTypeVisible">
											<v-btn flat>
												<v-icon>visibility</v-icon>
											</v-btn>
											<v-btn flat>
												<v-icon>visibility_off</v-icon>
											</v-btn>
										</v-btn-toggle>
									</v-flex>
									<v-flex xs24 sm6 text-xs-center>
										<v-text-field
										prepend-icon="person"
										label="Company industry"
										v-model="companyIndustry"
										></v-text-field>
									</v-flex>
									<v-flex xs24 sm1 text-xs-center>
										<v-btn-toggle v-model="companyIndustryVisible">
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
									<v-flex xs24 sm17 text-xs-center>
										<v-text-field
										prepend-icon="person"
										label="Position"
										v-model="position"
										></v-text-field>
									</v-flex>
									<v-flex xs24 sm1 text-xs-center>
										<v-btn-toggle v-model="positionVisible">
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
									<v-flex xs24 sm5 text-xs-center>
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
											<v-text-field
											slot="activator"
											label="Start period"
											v-model="date4"
											prepend-icon="event"
											readonly
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
									<v-flex xs24 sm1 text-xs-center>
										<v-btn-toggle v-model="date4Visible">
											<v-btn flat>
												<v-icon>visibility</v-icon>
											</v-btn>
											<v-btn flat>
												<v-icon>visibility_off</v-icon>
											</v-btn>
										</v-btn-toggle>
									</v-flex>

									<v-flex xs24 sm1 text-xs-center>
										to
									</v-flex>

									<v-flex xs24 sm5 text-xs-center>
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
											label="End period"
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
									<v-flex xs24 sm1 text-xs-center>
										<v-btn-toggle v-model="date5Visible">
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
								<v-flex xs24 sm2 text-xs-center>
									<v-checkbox
									:label="`I currently work here`"
									v-model="checkboxWork"
									></v-checkbox>
								</v-flex>
								<v-flex xs24 sm1 text-xs-center>
									<v-btn-toggle v-model="checkboxWorkVisible">
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
								<v-flex xs24 sm3 text-xs-center>
									<v-checkbox
									:label="`I have no work experience`"
									v-model="checkboxNoExperience"
									></v-checkbox>
								</v-flex>
								<v-flex xs24 sm1 text-xs-center>
									<v-btn-toggle v-model="checkboxNoExperienceVisible">
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
         			</form>
         			</v-card>
         		<v-btn color="primary" v-on:click="signup">Finish</v-btn>
         		<v-btn @click.native="e1 = 3" flat>Back</v-btn>
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

export default {
  name: 'SignUp',
   components: {
    LinkedInButton,FacebookButton
  },
  data () {
    return {    
      valid: false,
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
	  types: ['public', 'private'],
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
	  type: null,
	  studentTypes: ['Actual Student', 'Mobility Student', 'Alumni'],
      checkboxWork: false,
      checkboxNoExperience: false,
      number: '',
      genders: ['Male', 'Female', 'Not Specified' ],
      course: null,
      courses: ['MIEIC', 'MIEC', 'MIEQ', 'MIEIG', 'MIEEC'],
      company: '',
      city: '',
      position: '',
      role: 'student',
	  dpName: '',
	  dpAcr: '',
	  degree: null,
	  degrees: ['Bachelor', 'Masters', 'PhD'],
	  birthdayVisible: 0,
	  genderVisible: 0,
	  countryVisible: 0,
	  cityVisible: 0,
	  dpNameVisible: 0,
	  dpAcrVisible: 0,
	  degreeVisible: 0,
	  courseVisible: 0,
	  date2Visible: 0,
	  date3Visible: 0,
	  typeVisible: 0,
	  numberVisible: 0,
	  companyVisible: 0,
	  positionVisible: 0,
	  companyTypeVisible: 0,
	  checkboxWorkVisible: 0,
	  checkboxNoExperienceVisible: 0,
	  date4Visible: 0,
	  date5Visible: 0,
	  companyIndustry: '',
	  companyIndustryVisible: 0,
	  workingLocationVisible: 0,
	  workingLocation: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 50 || 'Name must be less than 50 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must be valid'
      ]
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
		if(this.role == 'student') {
			await AuthenticationService.signup_student({
				name: this.name,
				email: this.email,
				hashedPassword: this.password,
				birthDate: this.date,
				gender: this.gender,
				country: this.country,
				city: this.city,
				course: this.course,
				enrollmentDate: this.date2,
				graduationDate: this.date3,
				type: this.type,
				mecNumber: this.number,
				company: this.company,
				companyType: this.companyType,
				companyIndustry: this.companyIndustry,
				title: this.position,
				startDate: this.date4,
				endDate: this.date5,
				isCurrent: this.checkboxWork,
				workExperience: this.checkboxNoExperience
			})
		}
		else {
			await AuthenticationService.signup_staff({
				name: this.name,
				email: this.email,
				hashedPassword: this.password,
				birthDate: this.date,
				gender: this.gender,
				country: this.country,
				city: this.city,
				dpName: this.dpName,
				acronym: this.dpAcr,
				workingLocation: this.workingLocation,
				startDate: this.date2,
				endDate: this.date3,
				mecNumber: this.number,
				company: this.company,
				companyType: this.companyType,
				companyIndustry: this.companyIndustry,
				title: this.position,
				jobStartDate: this.date4,
				jobEndDate: this.date5,
				isCurrent: this.checkboxWork,
				workExperience: this.checkboxNoExperience
			})
		}
	},
	save (date) {
		this.$refs.menu.save(date)
	}
  }
}
</script>

<style scopped>
.signup-button {
  width: 100%;
  height:60px;
  font-size: 125%;
}

.v-select .dropdown-menu {
	display:block;
}

.primary {
  background-color: #b71c1c !important;
}

.cc-selector input{
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
.drinkcard-cc{
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
</style>
