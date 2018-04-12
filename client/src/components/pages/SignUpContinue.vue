         <template >
         	<v-content >
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
         					<v-card color="grey lighten-3" class="mb-4" height="400px">

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
         							label="Address"
         							v-model="address"
         							></v-text-field>
         							<v-text-field
         							prepend-icon="email"
         							label="Email"
         							v-model="email"
         							></v-text-field>
         						</v-container>
         					</form>
         				</v-card>
         				<v-btn dark class="red darken-4" height="33px" border-radius="0px" @click.native="e1 = 2">Continue</v-btn>
         			</v-stepper-content>
         			<v-stepper-content step="2">
         				<v-card color="grey lighten-3" class="mb-5" height="400px" fill-height>
                   <v-container fill-height>
                    <v-layout align-center>
                      <v-flex xs24 sm12 text-xs-center>
                        <div class="cc-selector">
                          <input id="student" type="radio" name="credit-card" value="student" />
                          <label class="drinkcard-cc student" for="student"></label>
                          <input id="staff" type="radio" name="credit-card" value="staff" />
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
         				<v-card color="grey lighten-3" class="mb-5" height="400px">
         					<form autocomplete="off">
         						<v-container fluid>
									 <v-select
         							:items="courses"
         							v-model="course"
         							label="Course"
         							single-line
         							auto
         							prepend-icon="person"
         							hide-details
         							></v-select>

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
												label="Start period"
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
												label="End period"
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
							
							<v-checkbox
							:label="`Graduated`"
							v-model="checkbox"
							></v-checkbox>
							<v-text-field
							prepend-icon="person"
							label="Student number"
							v-model="number"
							></v-text-field>
         				</v-container>
         			</form>
         		</v-card>

         		<v-btn dark class="red darken-4" border-radius="0px" @click.native="e1 = 4">Continue</v-btn>
         		<v-btn  @click.native="e1 = 2" flat>Back</v-btn>
         	</v-stepper-content>
         	<v-stepper-content step="4">
         		<v-card color="grey lighten-3" class="mb-5" height="400px">

         		<form autocomplete="off">
         						<v-container fluid>
									 <v-text-field
         							prepend-icon="company"
         							label="Company"
         							v-model="company"
         							></v-text-field>

         							<v-text-field
         							prepend-icon="position"
         							label="Position"
         							v-model="position"
         							></v-text-field>

         							<v-text-field
         							prepend-icon="person"
         							label="City/Town"
         							v-model="city"
         							></v-text-field>

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
												label="Start period"
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
												label="End period"
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
							
							<v-checkbox
							:label="`Still Work Here`"
							v-model="checkbox"
							></v-checkbox>

							<v-checkbox
							:label="`I have no work experience`"
							v-model="checkbox"
							></v-checkbox>
							
         				</v-container>
         			</form>
         			</v-card>
         		<v-btn color="primary" @click.native="e1 = 1">Finish</v-btn>
         		<v-btn @click.native="e1 = 3" flat>Back</v-btn>
         	</v-stepper-content>
         </v-stepper-items>
     </v-stepper>
 </v-content>
</template>

<script>
	import { bus } from '@/main'

	export default {
		data () {
			return {
				e1: 0,
				date: null,
				date2: null,
				gender: null,
				country: '',
				address: '',
				email: '',
				menu: false,
				menu2: false,
				checkbox: false,
				number: '',
				genders: ['Male', 'Female', 'Not Specified' ],
				course: null,
				courses: ['MIEIC', 'MIEC', 'MIEQ', 'MIEIG', 'MIEEC'],
				company: null,
				city: null,
				position: null,
			}
		},
		created () {
			bus.$on('signupContinue', (data) => {
				console.log(data);
			})
		},
		watch: {
			menu (val) {
				val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
			}
		},
		methods: {
			save (date) {
				this.$refs.menu.save(date)
			}
		}
	}
</script>

<style scopped>
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
