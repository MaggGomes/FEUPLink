<template>	
	<v-card>
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
		
		<v-card-title class="headline">{{ $t("edit_profile") }}</v-card-title>

		<v-card-text>
			<v-form autocomplete="off" ref="form" v-model="valid">
				<v-container wrap>
					<v-layout row>
						<v-flex xs12>
							<v-text-field label="Name" v-model="editedPerson.name" :rules="[v => !!v || 'Name is required']" required prepend-icon="person"></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs7>
							<v-text-field label="Email" v-model="editedPerson.email" :rules="[v => !!v || 'Email is required']" required prepend-icon="email"></v-text-field>
						</v-flex>
						<v-flex xs1>
						</v-flex>
						<v-flex xs4>
							<v-select :items="visibleOptions" v-model="editedPerson.email_visibility" 
                				label="Visible to..." prepend-icon="visibility"></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs7>
							<v-select autocomplete :items="genders" v-model="editedPerson.gender" label="Gender" 
							single-line :rules="[v => !!v || 'Gender is required']" required prepend-icon="fa-transgender"></v-select>
						</v-flex>
						<v-flex xs1>
						</v-flex>
						<v-flex xs4>
							<v-select :items="visibleOptions" v-model="editedPerson.gender_visibility" 
                				label="Visible to..." prepend-icon="visibility"></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs7>
							<v-text-field prepend-icon="phone" label="Phone" v-model="editedPerson.phone"></v-text-field>
						</v-flex>
						<v-flex xs1>
						</v-flex>
						<v-flex xs4>
							<v-select :items="visibleOptions" v-model="editedPerson.phone_visibility" 
                				label="Visible to..." prepend-icon="visibility"></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs7>
							<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" style="width: 100%;">
								<v-text-field slot="activator" label="Birth Date" :placeholder="birthDateFormatted" v-model="birthDateFormatted" 
									readonly hint="DD/MM/YYYY format" prepend-icon="event"></v-text-field>
								<v-date-picker ref="picker" v-model="date" @change="updateBirthDate" min="1950-01-01"
									:max="new Date().toISOString().substr(0, 10)" value="02/02/2015"></v-date-picker>
							</v-menu>
						</v-flex>
						<v-flex xs1>
						</v-flex>
						<v-flex xs4>
							<v-select :items="visibleOptions" v-model="editedPerson.birthDate_visibility" 
                				label="Visible to..." prepend-icon="visibility"></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs7>
							<v-text-field prepend-icon="flag" label="Country" v-model="editedPerson.country"></v-text-field>
						</v-flex>
						<v-flex xs1>
						</v-flex>
						<v-flex xs4>
							<v-select :items="visibleOptions" v-model="editedPerson.country_visibility" 
                				label="Visible to..." prepend-icon="visibility"></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs7>
							<v-text-field prepend-icon="location_city" label="City" v-model="editedPerson.city"></v-text-field>
						</v-flex>
						<v-flex xs1>
						</v-flex>
						<v-flex xs4>
							<v-select :items="visibleOptions" v-model="editedPerson.city_visibility" 
                				label="Visible to..." prepend-icon="visibility"></v-select>
						</v-flex>
					</v-layout>
				</v-container>
			</v-form>
		</v-card-text>
		
		

		<v-card-actions>
			<v-layout row justify-end>
				<v-btn color="primary" flat @click.stop="$emit('closeDialog')">{{$t('close')}}</v-btn>
				<v-btn v-if="valid" color="primary" flat @click.stop="updateProfileWarning">{{$t('edit')}}</v-btn>
				<v-btn v-else disabled>{{$t('edit')}}</v-btn>
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
      genders: this.$i18n.messages[this.$i18n.locale]["genders"],		
	  menu: null,
	  date: null,
      warningDialog: false,
	  warningTitle: null,
	  success: null,
	  error: null,
	  visibleOptions: ['All Users', 'Channel Admins', 'Super Admins'],
    };
	},
	
	methods: {
		updateProfileWarning(){
			this.showConfirmDialog(
				this.updatePersonProfile,
				this.$i18n.messages[this.$i18n.locale]['profile_update_warning']		
			)
		},
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
		}
	}
};
</script>

<style scopped>

</style>

