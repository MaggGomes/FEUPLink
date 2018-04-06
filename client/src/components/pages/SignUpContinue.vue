<template>
  <v-content>
    <v-stepper v-model="e1">
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
          <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="grey lighten-3" class="mb-5" height="400px">
            <v-layout align-center>
              <v-flex xs12 sm6 text-xs-center>
                <div>
                  <v-btn large>Student</v-btn>
                </div>
              </v-flex>
              <v-flex xs12 sm6 text-xs-center>
                <div>
                  <v-btn large>Staff</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
          <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
          <v-btn @click.native="e1 = 1" flat>Back</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card color="grey lighten-3" class="mb-5" height="400px"></v-card>
          <v-btn color="primary" @click.native="e1 = 4">Continue</v-btn>
          <v-btn @click.native="e1 = 2" flat>Back</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card color="grey lighten-3" class="mb-5" height="400px"></v-card>
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
        gender: null,
        country: '',
        address: '',
        email: '',
        menu: false,
        genders: ['Male', 'Female', 'Not Specified' ]
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
</style>
