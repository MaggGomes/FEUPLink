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
							<v-text-field slot="activator" label="Birth Date" :placeholder="editedPerson.birthDate" v-model="editedPerson.birthDate" 
								readonly></v-text-field>
							<v-date-picker ref="picker" v-model="editedPerson.birthDate" @change="$refs.menu.save(editedPerson.birthDate)" min="1950-01-01"
								:max="new Date().toISOString().substr(0, 10)"></v-date-picker>
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
      menu: null
    };
	},
	
	methods: {
		async updatePersonProfile() {
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
			console.log(result)

			this.editPersonDialog = false;
		}
	},

  mounted() {
    console.log(this.person.name);
    console.log(this.editedPerson.name);
  },

  watch: {
    person(val) {
      this.editedPerson = val;
		},
		editDialog(val) {
			this.editPersonDialog = val;
		}
  }
};
</script>

<style scopped>

</style>

