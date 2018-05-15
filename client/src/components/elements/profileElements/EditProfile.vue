<template>
	<v-dialog v-model="editPersonDialog" max-width="400px">
		<v-card>
			<v-card-title class="headline">Edit Profile</v-card-title>

			<v-card-text>
				<v-container wrap>
					<v-layout row>
						<v-text-field label="Name" v-model="editedPerson.name"></v-text-field>
					</v-layout>
					<v-layout row>
						<v-text-field label="Email" v-model="editedPerson.email"></v-text-field>
					</v-layout>
					<v-layout row>
						<v-select autocomplete :items="genders" v-model="editedPerson.gender" label="Gender" single-line></v-select>
					</v-layout>
					<v-layout row>
						<v-text-field label="Phone" v-model="editedPerson.phone"></v-text-field>
					</v-layout>
					<v-layout row>
						<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" style="width: 100%;">
							<v-text-field slot="activator" label="Birth Date" :placeholder="birthDateFormatted" v-model="birthDateFormatted" 
								readonly hint="DD/MM/YYYY format"></v-text-field>
							<v-date-picker ref="picker" v-model="date" @change="updateBirthDate" min="1950-01-01"
								:max="new Date().toISOString().substr(0, 10)" value="02/02/2015"></v-date-picker>
						</v-menu>
					</v-layout>
					<v-layout row>
						<v-text-field label="Country" v-model="editedPerson.country"></v-text-field>
					</v-layout>
					<v-layout row>
						<v-text-field label="City" v-model="editedPerson.city"></v-text-field>
					</v-layout>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-layout row justify-end>
					<v-btn color="primary" flat @click.stop="editPersonDialog=false">Close</v-btn>
					<v-btn color="primary" flat @click.stop="updatePersonProfile">Edit</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import ProfileService from "@/services/ProfileService";

export default {
  name: "profile-edit",

  props: {
    person: {
      type: Object
		},
		editDialog: {
			type: Boolean
		}
  },

  data() {
    return {
			editPersonDialog: this.editDialog,
      editedPerson: this.person,
      genders: ["Male", "Female"],
			menu: null,
			date: null
    };
	},
	
	methods: {
		async updatePersonProfile () {
			let result = await ProfileService.updatePerson({
				userId: this.editedPerson.id,
				name: this.editedPerson.name,
				email: this.editedPerson.email,
				gender: this.editedPerson.gender,
				phone: this.editedPerson.phone,
				birthDate: this.editedPerson.birthDate,
				country: this.editedPerson.country,
				city: this.editedPerson.city
			});
			if (result.status !== 200) {
				// show error!!
			}

			this.editPersonDialog = false;

			//Updating parent component
			this.$emit('personEdited', this.editedPerson)
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
		},
		editDialog(val) {
			this.editPersonDialog = val
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

