<template>	
	<v-card>
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
		<v-card-title class="headline">Edit Profile</v-card-title>

		<v-card-text>
			<v-form autocomplete="off" ref="form" v-model="valid">
				<v-container wrap>
					<v-layout row>
						<v-flex xs9>
							<v-text-field label="Name" v-model="editedPerson.name" :rules="[v => !!v || 'Name is required']" required prepend-icon="person"></v-text-field>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="nameVisibility" @change="updateNameVisibility">
								<v-btn flat>
									<v-icon>visibility</v-icon>
								</v-btn>
								<v-btn flat>
									<v-icon>visibility_off</v-icon>
								</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs9>
							<v-text-field label="Email" v-model="editedPerson.email" :rules="[v => !!v || 'Email is required']" required prepend-icon="email"></v-text-field>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="emailVisibility" @change="updateEmailVisibility">
							<v-btn flat>
								<v-icon>visibility</v-icon>
							</v-btn>
							<v-btn flat>
								<v-icon>visibility_off</v-icon>
							</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs9>
							<v-select autocomplete :items="genders" v-model="editedPerson.gender" label="Gender" 
							single-line :rules="[v => !!v || 'Gender is required']" required prepend-icon="fa-transgender"></v-select>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="genderVisibility" @change="updateGenderVisibility">
							<v-btn flat>
								<v-icon>visibility</v-icon>
							</v-btn>
							<v-btn flat>
								<v-icon>visibility_off</v-icon>
							</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs9>
							<v-text-field prepend-icon="phone" label="Phone" v-model="editedPerson.phone"></v-text-field>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="phoneVisibility" @change="updatePhoneVisibility">
							<v-btn flat>
								<v-icon>visibility</v-icon>
							</v-btn>
							<v-btn flat>
								<v-icon>visibility_off</v-icon>
							</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs9>
							<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" style="width: 100%;">
								<v-text-field slot="activator" label="Birth Date" :placeholder="birthDateFormatted" v-model="birthDateFormatted" 
									readonly hint="DD/MM/YYYY format" prepend-icon="event"></v-text-field>
								<v-date-picker ref="picker" v-model="date" @change="updateBirthDate" min="1950-01-01"
									:max="new Date().toISOString().substr(0, 10)" value="02/02/2015"></v-date-picker>
							</v-menu>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="birthDateVisibility" @change="updateBirthDateVisibility">
							<v-btn flat>
								<v-icon>visibility</v-icon>
							</v-btn>
							<v-btn flat>
								<v-icon>visibility_off</v-icon>
							</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs9>
							<v-text-field prepend-icon="flag" label="Country" v-model="editedPerson.country"></v-text-field>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="countryVisibility" @change="updateCountryVisibility">
							<v-btn flat>
								<v-icon>visibility</v-icon>
							</v-btn>
							<v-btn flat>
								<v-icon>visibility_off</v-icon>
							</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs9>
							<v-text-field prepend-icon="location_city" label="City" v-model="editedPerson.city"></v-text-field>
						</v-flex>
						<v-flex xs3>
							<v-btn-toggle v-model="cityVisibility" @change="updateCityVisibility">
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
		</v-card-text>

		<v-card-actions>
			<v-layout row justify-end>
				<v-btn color="primary" flat @click.stop="$emit('closeDialog')">Close</v-btn>
				<v-btn v-if="valid" color="primary" flat @click.stop="showConfirmDialog(updatePersonProfile, 'Are you sure you want to update your profile?')">Edit</v-btn>
				<v-btn v-else disabled>Edit</v-btn>
			</v-layout>
		</v-card-actions>
	</v-card>
</template>

<script>
import ProfileService from "@/services/ProfileService";

export default {
  name: "profile-edit",

  props: {
    person: {
      type: Object
		}
  },

  data() {
    return {
	  valid: false,
      editedPerson: this.person,
      genders: ["Male", "Female"],
	  menu: null,
	  date: null,
      warningDialog: false,
	  warningTitle: null,
	  success: null,
	  error: null
    };
	},
	
	methods: {
		showConfirmDialog(action, title){
			this.warningDialog=true
			this.warningAction=action 
			this.warningTitle=title
		},

		warningAction(){ // function to be ovewritten by the correct action
		},
		async updatePersonProfile () {
			try {
				this.success = (await ProfileService.updatePerson({
					userId: this.editedPerson.id,
					name: this.editedPerson.name,
					name_visibility: this.editedPerson.name_visibility,
					email: this.editedPerson.email,
					email_visibility: this.editedPerson.email_visibility,
					gender: this.editedPerson.gender,
					gender_visibility: this.editedPerson.gender_visibility,
					phone: this.editedPerson.phone,
					phone_visibility: this.editedPerson.phone_visibility,
					birthDate: this.editedPerson.birthDate,
					birthDate_visibility: this.editedPerson.birthDate_visibility,
					country: this.editedPerson.country,
					country_visibility: this.editedPerson.country_visibility,
					city: this.editedPerson.city,
					city_visibility: this.editedPerson.city_visibility
				})).data;
			} catch(error) {
				this.error=error
			}
			//Updating parent component
			this.$emit('personEdited', [this.editedPerson, this.success, this.error])
		},
		updateBirthDate (date) {
			if (date !== null)
				this.editedPerson.birthDate = date

			this.$refs.menu.save(date)
		},
		updateNameVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.name_visibility = true
			else
				this.editedPerson.name_visibility = false
		},
		updateEmailVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.email_visibility = true
			else
				this.editedPerson.email_visibility = false
		},
		updateGenderVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.gender_visibility = true
			else
				this.editedPerson.gender_visibility = false
		},
		updatePhoneVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.phone_visibility = true
			else
				this.editedPerson.phone_visibility = false
		},
		updateBirthDateVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.birthDate_visibility = true
			else
				this.editedPerson.birthDate_visibility = false
		},
		updateCountryVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.country_visibility = true
			else
				this.editedPerson.country_visibility = false
		},
		updateCityVisibility (visibility) {
			if (visibility == 0)
				this.editedPerson.city_visibility = true
			else
				this.editedPerson.city_visibility = false
		}
	},

  watch: {
    person(val) {
		this.editedPerson = val

		if (!this.editedPerson.birthDate) return null

		let [year, month, day] = this.editedPerson.birthDate.split('-')
		day = day[0] + day[1]

		this.date =  `${year}-${month}-${day}`
	}
	},
	computed: {
		birthDateFormatted () {
			if (!this.editedPerson.birthDate) return null

			let [year, month, day] = this.editedPerson.birthDate.split('-')
			day = day[0] + day[1]

			return `${day}-${month}-${year}`
		},
		nameVisibility: {
			get: function () {
				if(this.editedPerson.name_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.name_visibility = true
				else
					this.editedPerson.name_visibility = false
			}
		},
		emailVisibility: {
			get: function () {
				if(this.editedPerson.email_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.email_visibility = true
				else
					this.editedPerson.email_visibility = false
			}
		},
		genderVisibility: {
			get: function () {
				if(this.editedPerson.gender_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.gender_visibility = true
				else
					this.editedPerson.gender_visibility = false
			}
		},
		phoneVisibility: {
			get: function () {
				if(this.editedPerson.phone_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.phone_visibility = true
				else
					this.editedPerson.phone_visibility = false
			}
		},
		birthDateVisibility: {
			get: function () {
				if(this.editedPerson.birthDate_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.birthDate_visibility = true
				else
					this.editedPerson.birthDate_visibility = false
			}
		},
		countryVisibility: {
			get: function () {
				if(this.editedPerson.country_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.country_visibility = true
				else
					this.editedPerson.country_visibility = false
			}
		},
		cityVisibility: {
			get: function () {
				if(this.editedPerson.city_visibility)
					return 0
				else
					return 1
			},
			set: function (newValue) {
				if(newValue == 0)
					this.editedPerson.city_visibility = true
				else
					this.editedPerson.city_visibility = false
			}
		}
	}
};
</script>

<style scopped>

</style>

