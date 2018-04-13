<template>
    <v-content>
      <v-container fluid v-if="firstStep">
        <v-layout row wrap align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md5>
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
             <fb-signin-button
              :params="FBSignUpParams"
              @success="onFBSignUpSuccess"
              @error="onFBSignUpError">
              <v-btn id="facebook-signup-button" class="signup-button indigo" large dark>Sign up with Facebook</v-btn>
            </fb-signin-button><br>
            <linked-in-button class="signup-button" ></linked-in-button>
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
         							<v-select
         							:items="genders"
         							v-model="gender"
         							label="Gender"
         							single-line
         							auto
         							prepend-icon="person"
         							hide-details
         							></v-select><br />
         							<v-text-field
         							prepend-icon="person"
         							label="Country"
         							v-model="country"
         							></v-text-field>
         							<v-text-field
         							prepend-icon="person"
         							label="City"
         							v-model="city"
         							></v-text-field>
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
                          <input id="student" type="radio" name="credit-card" value="student" />
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
											 <v-layout align-center>
											<v-flex xs24 sm6 text-xs-center>
												<v-text-field
													prepend-icon="person"
													label="Department name"
													v-model="dpName"
													></v-text-field>
											</v-flex>
											<v-flex xs24 sm6 text-xs-center>
												<v-text-field
													prepend-icon="person"
													label="Department acronym"
													v-model="dpAcr"
													></v-text-field>
											</v-flex>
										 </v-layout>
											
									 <v-select v-if="role == 'student'"
         							:items="courses"
         							v-model="course"
         							label="Course"
         							single-line
         							auto
         							prepend-icon="person"
         							hide-details
         							></v-select><br />

										<v-select v-if="role == 'staff'"
         							:items="courses"
         							v-model="course"
         							label="Working location"
         							single-line
         							auto
         							prepend-icon="person"
         							hide-details
         							></v-select><br />

									<v-layout align-center>
										<v-flex xs24 sm6 text-xs-center>
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
												<v-text-field
												slot="activator"
												label="Enrollment date"
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
												></v-date-picker>
											</v-menu>
										</v-flex>

										<v-flex xs24 sm1 text-xs-center>
											to
										</v-flex>

										<v-flex xs24 sm6 text-xs-center>
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
												<v-text-field
												slot="activator"
												label="Graduation date"
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
												></v-date-picker>
											</v-menu>
										</v-flex>
									</v-layout>

							<v-checkbox v-if="role == 'student'"
							:label="`Graduated`"
							v-model="graduated"
							></v-checkbox>
							<v-text-field
							prepend-icon="person"
							label="Mec number"
							v-model="number"
							></v-text-field>
							<v-text-field v-if="role == 'student'"
							prepend-icon="person"
							label="CGPA"
							v-model="cgpa"
							></v-text-field>
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
									<v-text-field
         							prepend-icon="person"
         							label="Company"
         							v-model="company"
         							></v-text-field>


         							<v-text-field
         							prepend-icon="person"
         							label="Position"
         							v-model="position"
         							></v-text-field>

         							<v-text-field
         							prepend-icon="person"
         							label="City/Town"
         							v-model="companyCity"
         							></v-text-field>

									<v-layout align-center>
										<v-flex xs24 sm6 text-xs-center>
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
												></v-date-picker>
											</v-menu>
										</v-flex>

										<v-flex xs24 sm1 text-xs-center>
											to
										</v-flex>

										<v-flex xs24 sm6 text-xs-center>
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
												></v-date-picker>
											</v-menu>
										</v-flex>
									</v-layout>
							
							<v-checkbox
							:label="`I currently work here`"
							v-model="checkboxWork"
							></v-checkbox>

							<v-checkbox
							:label="`I have no work experience`"
							v-model="checkboxExperience"
							></v-checkbox>
							
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

import FBSignInButton from 'vue-facebook-signin-button'
import Vue from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import LinkedInButton from '@/components/elements/LinkedInButton'

Vue.use(FBSignInButton)

export default {
  name: 'SignUp',
   components: {
    LinkedInButton,
  },
  data () {
    return {      
      FBSignInParams: {
        scope: '',
        return_scopes: true
      },
      valid: false,
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
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
      companyCity: '',
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      graduated: false,
      checkboxWork: false,
      checkboxExperience: false,
      number: '',
      genders: ['Male', 'Female', 'Not Specified' ],
      course: null,
      courses: ['MIEIC', 'MIEC', 'MIEQ', 'MIEIG', 'MIEEC'],
      company: '',
      city: '',
      position: '',
      role: 'student',
      cgpa: '',
			dpName: '',
			dpAcr: '',
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
    onFBSignUpSuccess (response) {
      FB.api('/me', user => {
      })
    },
    onFBSignUpError (error) {
    },
    async signup () {
				if(this.role == 'student') {
				//try {
					await AuthenticationService.signup_student({
						name: this.name,
						email: this.email,
						hashedPassword: this.password,
						birthDate: this.date,
						gender: this.gender,
						country: this.country,
						city: this.city,
						dpName: this.dpName,
						acronym: this.dpAcr,
						course: this.course,
						enrollmentDate: this.date2,
						graduationDate: this.date3,
						type: this.graduated,
						mecNumber: this.number,
						cgpa: this.cgpa,
						company: this.company,
						title: this.position,
						startDate: this.date4,
						endDate: this.date5,
						isCurrent: this.checkboxWork,
						workExperience: this.workExperience
					})
				/*} catch (error) {
					console.log(error);
					//this.error = error.response.data.error
				}*/
				}
				else {
					await AuthenticationService.signup_student({
						name: this.name,
						email: this.email,
						hashedPassword: this.password,
						birthDate: this.date,
						gender: this.gender,
						country: this.country,
						city: this.city,
						dpName: this.dpName,
						acronym: this.dpAcr,
						workingLocation: this.course
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
