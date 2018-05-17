<template>
  <v-card flat raised class="short-width" style="margin-bottom: 20px;">
    <v-container class="minimum-side-padding">
      <v-layout row>
        <v-flex xs7 wrap>
          <v-toolbar-title class="center-text">{{$t['education']}}</v-toolbar-title>
        </v-flex>
        <v-flex v-if="person.id == this.$store.state.user.id">

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
							<v-btn icon class="mx-0" @click="dialogEducation=true"> 
                <v-icon>fa-plus</v-icon>  
              </v-btn>
						</v-flex>
            <v-flex xs1>
            </v-flex>
						<v-flex xs9>
              <v-select :items="visibleOptions" v-model="student.educationVisible" 
                label="Visible to..." prepend-icon="visibility" @change="showConfirmDialog(updateEducationVisibility, 'Are you sure you want to change the visibility?')"></v-select>
						</v-flex>
					</v-layout>

          <v-dialog v-model="dialogEducation" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-form autocomplete="off" ref="form" v-model="valid2">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-select :items="degreeOptions" v-model="editedItemEducation.degree" 
                          label="Academic degree" :rules="[v => !!v || 'Academic degree is required']" required prepend-icon="person" ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-select :items="filteredCourses" item-text="name" autocomplete v-model="editedItemEducation.course"
                        label="Course name" :rules="[v => !!v || 'Course is required']" required prepend-icon="person"></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu"
                          transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                          <v-text-field
                          slot="activator" label="Enrollment date" v-model="editedItemEducation.enrollmentDate"
                          :rules="[v => !!v || 'Enrollment date is required']" required prepend-icon="event" readonly></v-text-field>
                          <v-date-picker
                          ref="picker" v-model="editedItemEducation.enrollmentDate" @change="save" min="1950-01-01"
                          :max="new Date().toISOString().substr(0, 10)" type="month"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-menu
                          ref="menu2" lazy :close-on-content-click="false" v-model="menu2" 
                          transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                          <v-text-field
                          slot="activator" label="Graduation date" v-model="editedItemEducation.graduationDate" 
                          prepend-icon="event" readonly></v-text-field>
                          <v-date-picker ref="picker" v-model="editedItemEducation.graduationDate" @change="save"
                          min="1950-01-01" :max="new Date().toISOString().substr(0, 10)" type="month" ></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="closeEducation">Cancel</v-btn>
                <v-btn v-if="valid2" color="blue darken-1" flat @click.native="showConfirmDialog(saveEducation, 'Are you sure you want to save this item?')">Save</v-btn>
                <v-btn v-else disabled>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-list class="full-width" three-line>
          <template v-for="(item, index) in itemsEducation">
            <v-divider v-if="index !== 0" :key="index"></v-divider>
            <v-list-tile :key="index + 'tile'">
              <v-list-tile-avatar>
                <img :src="defaultCourseImg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.course.name }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <p>{{ item.degree }}</p>
                  <p>{{ item.enrollmentDate }} - {{ item.graduationDate }}</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-layout v-if="person.id == userId" row class="hidden-sm-and-down">
                <v-flex lg12 md12>
                  <v-list-tile-action>
                    <v-btn icon class="mx-0" @click="editItemEducation(item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click.native="() => {
                        currentItem=item
                        showConfirmDialog(deleteItemEducation, 'Are you sure you want to delete this item ?')
                      }">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-flex>
                </v-layout>
            </v-list-tile>
            <v-layout row class="hidden-md-and-up" :key="index + 'layout'" justify-center style="margin-bottom: 5px;">
              <v-flex lg6 md6 style="text-align: center;">
                <v-btn icon class="mx-0" @click="editItemEducation(item)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-flex>
              <v-flex lg6 md6 style="text-align: center;">
                <v-btn icon class="mx-0" @click.native="() => {
                    currentItem=item
                    showConfirmDialog(deleteItemEducation, 'Are you sure you want to delete this item ?')
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
import defaultCourseImg from "@/assets/defaultCourse.png";
import ProfileService from "@/services/ProfileService";
import CourseService from "@/services/CourseService";

export default {
  name: "profile-education-content",

  props: ["person", "itemsEducation", "student"],

  data() {
    return {
      defaultCourseImg: defaultCourseImg,
      currentItem: null,
      showingFeedback: false,
      feedbackColor: 'error',
      error: null,
      success: null,
      warningDialog: false,
      warningTitle: null,
      valid2: false,
      menu: false,
      menu2: false,
      degreeOptions: this.$i18n.messages[this.$i18n.locale]["degrees"],
      visibleOptions: ['All Users', 'Channel Admins', 'Super Admins'],
      dialogEducation: false,
      coursesOptions: null,
      editedIndexEducation: -1,
      editedItemEducation: {
        degree: null,
        course: null,
        enrollmentDate: null,
        graduationDate: null
      },
      defaultItemEducation: {
        degree: null,
        course: null,
        enrollmentDate: null,
        graduationDate: null
      },
      userId: this.$store.state.user.id
    };
  },

  methods: {
    async getCourses() {
      try {
        this.coursesOptions = (await CourseService.list_all_courses()).data;
      } catch (error) {
        this.error = error;
      }
    },

    showConfirmDialog(action, title){
        this.warningDialog=true
        this.warningAction=action 
        this.warningTitle=title
    },

    warningAction() { // function to be ovewritten by the correct action
    },

    async updateEducationVisibility() {
      try {
        this.success = (await ProfileService.updateEducationVisibility({
          educationVisible: this.student.educationVisible,
          personId: this.$store.state.user.id
        })).data;
      } catch(error) {
        this.error=error
      }
    },

    editItemEducation(item) {
      this.editedIndexEducation = this.itemsEducation.indexOf(item);
      this.editedItemEducation = Object.assign({}, item);
      this.dialogEducation = true;
    },

    async deleteItemEducation() {
      try{
        this.success = (await ProfileService.deleteCourseStudent({
          name: this.currentItem.course.name,
          academicDegree: this.currentItem.degree,
          PersonId: this.$store.state.user.id
        })).data;
        const index = this.itemsEducation.indexOf(this.currentItem);
        this.itemsEducation.splice(index, 1);
      } catch(error){
          this.error=error
      }
    },    

    closeExperience() {
      this.dialogEducation = false;
      setTimeout(() => {
        this.editedItemEducation = Object.assign(
          {},
          this.defaultItemEducation
        );
        this.editedIndexEducation = -1;
      }, 300);
    },

    closeEducation() {
      this.dialogEducation = false;
      setTimeout(() => {
        this.editedItemEducation = Object.assign({}, this.defaultItemEducation);
        this.editedIndexEducation = -1;
      }, 300);
    },

    async saveEducation() {
      if (this.editedIndexEducation > -1) {
        Object.assign(
          this.itemsEducation[this.editedIndexEducation],
          this.editedItemEducation
        );
        try{
          this.success = (await ProfileService.updateCourseStudent({
            name: this.editedItemEducation.course.name,
            academicDegree: this.editedItemEducation.degree,
            enrollmentDate: this.editedItemEducation.enrollmentDate,
            graduationDate: this.editedItemEducation.graduationDate,
            PersonId: this.$store.state.user.id
          })).data;
        } catch(error){
          this.error=error
        }
      } else {
        try{
          this.success = (await ProfileService.insertCourseStudent({
            name: this.editedItemEducation.course.name,
            academicDegree: this.editedItemEducation.degree,
            enrollmentDate: this.editedItemEducation.enrollmentDate,
            graduationDate: this.editedItemEducation.graduationDate,
            PersonId: this.$store.state.user.id
          })).data;
          this.itemsEducation.push(this.editedItemEducation);
        } catch(error){
          this.error=error
        }
      }
      this.closeEducation();
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    close() {
      this.dialogEducation = false;
      setTimeout(() => {
        this.editedItemEducation = Object.assign(
          {},
          this.defaultItemEducation
        );
        this.editedIndexEducation = -1;
      }, 300);
    }
  },

  computed: {
    formTitle() {
      return this.editedIndexExperience === -1 ? this.$i18n.messages[this.$i18n.locale]["new_item"] :
      argumentsthis.$i18n.messages[this.$i18n.locale]["edit_item"];
    },
    filteredCourses() {
      return this.coursesOptions.filter(c => c.academicDegree == this.editedItemEducation.degree)
    }
  },

  watch: {
    dialogEducation(val) {
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
  },

  mounted: async function() {
    await this.getCourses();
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

