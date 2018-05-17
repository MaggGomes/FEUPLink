<template>	
	<v-card>
		<v-card-title class="headline">{{ $t("edit_profile") }}</v-card-title>

		<v-card-text>
			<v-container wrap>
				<v-layout row>
					<v-text-field
					:placeholder="$t('name')"
					v-model="editedPerson.name"
					prepend-icon="person">
					</v-text-field>
				</v-layout>
				<v-layout row>
					<v-text-field :placeholder="$t('email')" v-model="editedPerson.email" prepend-icon="email"></v-text-field>
				</v-layout>
				<v-layout row>
					<v-select autocomplete :items="genders" v-model="editedPerson.gender" :placeholder="$t('gender')" 
					single-line prepend-icon="fa-transgender"></v-select>
				</v-layout>
				<v-layout row>
					<v-text-field prepend-icon="phone" :placeholder="$t('phone')" v-model="editedPerson.phone"></v-text-field>
				</v-layout>
				<v-layout row>
					<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" style="width: 100%;">
						<v-text-field slot="activator" :placeholder="$t('birthdate')" v-model="birthDateFormatted" 
							readonly prepend-icon="event"></v-text-field>
						<v-date-picker ref="picker" v-model="date" @change="updateBirthDate" min="1950-01-01"
							:max="new Date().toISOString().substr(0, 10)" value="02/02/2015"></v-date-picker>
					</v-menu>
				</v-layout>
				<v-layout row>
					<v-text-field prepend-icon="flag" :placeholder="$t('country')" v-model="editedPerson.country"></v-text-field>
				</v-layout>
				<v-layout row>
					<v-text-field prepend-icon="location_city" :placeholder="$t('city')" v-model="editedPerson.city"></v-text-field>
				</v-layout>
			</v-container>
		</v-card-text>

		<v-card-actions>
			<v-layout row justify-end>
				<v-btn color="primary" flat @click.stop="$emit('closeDialog')">{{$t('close')}}</v-btn>
				<v-btn color="primary" flat @click.stop="updatePersonProfile">{{$t('edit')}}</v-btn>
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
      editedPerson: this.person,
      genders: this.$i18n.messages[this.$i18n.locale]["genders"],
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

