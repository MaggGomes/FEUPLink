<template>
  <v-card flat raised class="short-width" style="margin-bottom: 20px;">
    <v-container class="minimum-side-padding">
      <v-layout row>
        <v-flex xs7 wrap>
          <v-toolbar-title class="center-text">{{$t('experience')}}</v-toolbar-title>
        </v-flex>
        <v-flex v-if="person.id == this.$store.state.user.id" wrap>
          <!-- provide feedback to the user -->
          <v-snackbar :timeout="6000" :color="feedbackColor" v-model="showingFeedback" top multi-line>
            <div v-if="error!=null">
              {{error.response.data.error}}
            </div>
            <div v-if="success!=null">
              {{success.res}}
            </div>
            <v-btn flat dark @click="showingFeedback=false"> Close </v-btn>
          </v-snackbar>

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

          <v-layout row>
            <v-flex xs1>
							<v-btn icon class="mx-0" @click="dialogExperience=true"> 
                <v-icon>fa-plus</v-icon>  
              </v-btn>
						</v-flex>
            <v-flex xs1>
            </v-flex>
						<v-flex xs9>
              <v-select :items="visibleOptions" v-model="person.experienceVisible" 
                label="Visible to..." prepend-icon="visibility" @change="showConfirmDialog(updateExperienceVisibility, 'Are you sure you want to change the visibility?')"></v-select>
						</v-flex>
					</v-layout>

          <v-dialog v-model="dialogExperience" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-form autocomplete="off" ref="form" v-model="valid3">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Company" v-model="editedItemExperience.company"
                        :rules="[v => !!v || 'Company name is required']" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Title" v-model="editedItemExperience.title"
                        :rules="[v => !!v || 'Title is required']" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" 
                          transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                          <v-text-field slot="activator" label="Start date"
                          v-model="editedItemExperience.startDate" prepend-icon="event" 
                          :rules="[v => !!v || 'Start date is required']" required readonly></v-text-field>
                          <v-date-picker ref="picker" v-model="editedItemExperience.startDate" @change="save" 
                          min="1950-01-01" :max="new Date().toISOString().substr(0, 10)" type="month"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12>
                        <v-menu ref="menu2" lazy :close-on-content-click="false" v-model="menu2"
                          transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                          <v-text-field slot="activator" label="End date" v-model="editedItemExperience.endDate" 
                          prepend-icon="event" readonly></v-text-field>
                          <v-date-picker ref="picker" v-model="editedItemExperience.endDate" @change="save" min="1950-01-01" 
                          :max="new Date().toISOString().substr(0, 10)" type="month"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12>
                        <v-select :items="jobOptions" v-model="editedItemExperience.isCurrent" 
                        label="Current job" :rules="[v => !!v || 'Is current job is required']" required prepend-icon="person"></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="closeExperience">Cancel</v-btn>
                <v-btn v-if="valid3" color="blue darken-1" flat @click.native="showConfirmDialog(saveExperience, 'Are you sure you want to save this item?')">Save</v-btn>
                <v-btn v-else disabled>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-list class="full-width" three-line>
          <template v-for="(item, index) in itemsExperience">
            <v-divider v-if="index !== 0" :key="index"></v-divider>
            <v-list-tile :key="index + 'tile'">
              <v-list-tile-avatar>
                <img :src="defaultCompanyImg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.company }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <p>{{ item.ttle }}</p>
                  <p>{{ item.startDate }} - {{ item.endDate }}</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-layout row class="hidden-sm-and-down">
                <v-flex v-if="person.id == userId" lg12 md12>
                  <v-list-tile-action>
                    <v-btn icon class="mx-0" @click="editItemExperience(item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="() => {
                      currentItem=item
                      showConfirmDialog(deleteItemExperience, 'Are you sure you want to delete this item ?')
                    }">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-flex>
                </v-layout>
            </v-list-tile>
            <v-layout row class="hidden-md-and-up" :key="index + 'layout'" justify-center style="margin-bottom: 5px;">
              <v-flex lg6 md6 style="text-align: center;">
                <v-btn icon class="mx-0" @click="editItemExperience(item)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-flex>
              <v-flex lg6 md6 style="text-align: center;">
                <v-btn icon class="mx-0" @click="() => {
                    currentItem=item
                    showConfirmDialog(deleteItemExperience, 'Are you sure you want to delete this item ?')
                  }">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </template>
        </v-list>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import defaultCompanyImg from "@/assets/defaultCompany.png";
import ProfileService from "@/services/ProfileService";

export default {
  name: "profile-experience-content",

  props: ["person", "itemsExperience"],

  data() {
    return {
      defaultCompanyImg: defaultCompanyImg,
      currentItem: null,
      showingFeedback: false,
      feedbackColor: 'error',
      error: null,
      success: null,
      warningDialog: false,
      warningTitle: null,
      valid3: false,
      menu: false,
      menu2: false,
      jobOptions: this.$i18n.messages[this.$i18n.locale]["job_options"],
      visibleOptions: ['All Users', 'Channel Admins', 'Super Admins'],
      defaultItemExperience: {
        company: "",
        title: "",
        startDate: null,
        endDate: null,
        isCurrent: null
      },
      editedIndexExperience: -1,
      editedItemExperience: {
        company: "",
        title: "",
        startDate: null,
        endDate: null,
        isCurrent: null
      },
      dialogExperience: false,
      userId: this.$store.state.user.id
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

    async updateExperienceVisibility() {
      try {
        this.success = (await ProfileService.updateExperienceVisibility({
          experienceVisible: this.person.experienceVisible,
          personId: this.$store.state.user.id
        })).data;
      } catch(error) {
        this.error=error
      }
    },
    editItemExperience(item) {
      this.editedIndexExperience = this.itemsExperience.indexOf(item);
      this.editedItemExperience = Object.assign({}, item);
      this.dialogExperience = true;
    },
    async deleteItemExperience() {
      try {
        this.success = (await ProfileService.deleteJobExperience({
          company: this.currentItem.company,
          personId: this.$store.state.user.id
        })).data;
        const index = this.itemsExperience.indexOf(this.currentItem);
        this.itemsExperience.splice(index, 1);
      } catch(error) {
        this.error=error
      }
    },

    closeExperience() {
      this.dialogExperience = false;
      setTimeout(() => {
        this.editedItemExperience = Object.assign(
          {},
          this.defaultItemExperience
        );
        this.editedIndexExperience = -1;
      }, 300);
    },

    async saveExperience() {
      if (this.editedIndexExperience > -1) {
        Object.assign(
          this.itemsExperience[this.editedIndexExperience],
          this.editedItemExperience
        );

        try {
          this.success = (await ProfileService.updateJobExperience({
            company: this.editedItemExperience.company,
            title: this.editedItemExperience.title,
            startDate: this.editedItemExperience.startDate,
            endDate: this.editedItemExperience.endDate,
            isCurrent: this.editedItemExperience.isCurrent,
            personId: this.$store.state.user.id
          })).data;
        } catch(error) {
          this.error=error
        }
      } else {
        try {
          this.success = (await ProfileService.insertExperience({
            company: this.editedItemExperience.company,
            title: this.editedItemExperience.title,
            startDate: this.editedItemExperience.startDate,
            endDate: this.editedItemExperience.endDate,
            isCurrent: this.editedItemExperience.isCurrent,
            personId: this.$store.state.user.id
          })).data;
          this.itemsExperience.push(this.editedItemExperience);
        } catch(error) {
          this.error=error
        }
      }
      this.closeExperience();
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    close() {
      this.dialogExperience = false;
      setTimeout(() => {
        this.editedItemExperience = Object.assign({}, this.defaultItemExperience);
        this.editedIndexExperience = -1;
      }, 300);
    }
  },

  computed: {
    formTitle() {
      return this.editedIndexExperience === -1 ? this.$i18n.messages[this.$i18n.locale]["new_item"] : this.$i18n.messages[this.$i18n.locale]["edit_item"];
    }
  },

  watch: {
    dialogExperience(val) {
      val || this.close();
    },
    success (val){
      if(val !== null){
        this.error=null
        this.feedbackColor='success'
        this.showingFeedback=true
      }
    },
    error(val){
      if(val !== null){
        this.success=null
        this.feedbackColor='error'
        this.showingFeedback=true
      }
    }
  }
};
</script>

<style scopped>
@media screen and (min-width: 960px) {
  .short-width {
    width: 60%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 960px) {
  .minimum-side-padding {
    padding-left: 3%;
    padding-right: 3%;
  }

  .center-text {
    text-align: center;
  }
}

.full-width {
  width: 100%;
}

.auto-width {
  width: 0;
}
</style>

