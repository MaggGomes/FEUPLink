<template>
  <v-card flat raised class="short-width" style="margin-bottom: 20px;">
    <v-container class="minimum-side-padding">
      <v-layout row>
        <v-flex xs11>
          <v-toolbar-title class="center-text">{{$t['education']}}</v-toolbar-title>
        </v-flex>
        <v-flex v-if="person.id == this.$store.state.user.id">
          <v-dialog v-model="dialogEducation" max-width="500px">
            <v-btn icon slot="activator" class="mx-0">
              <v-icon>fa-plus</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-select :items="degreeOptions" v-model="editedItemEducation.degree" 
                        :placeholder="$t('degree')" prepend-icon="person" ></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-select :items="coursesOptions" item-text="name" autocomplete v-model="editedItemEducation.course"
                       :placeholder="$t('course')" prepend-icon="person"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu"
                        transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                        <v-text-field
                        slot="activator" :placeholder="$t('enrollment_date')" v-model="editedItemEducation.enrollmentDate"
                         prepend-icon="event" readonly></v-text-field>
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
                        slot="activator" :placeholder="$t('graduation_date')" v-model="editedItemEducation.graduationDate" 
                        prepend-icon="event" readonly></v-text-field>
                        <v-date-picker ref="picker" v-model="editedItemEducation.graduationDate" @change="save"
                        min="1950-01-01" :max="new Date().toISOString().substr(0, 10)" type="month" ></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="closeEducation">{{$t['cancel']}}</v-btn>
                <v-btn color="blue darken-1" flat @click.native="saveEducation">{{$t['save']}}</v-btn>
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
                    <v-btn icon class="mx-0" @click="deleteItemEducation(item)">
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
                <v-btn icon class="mx-0" @click="deleteItemEducation(item)">
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

  props: ["person", "itemsEducation"],

  data() {
    return {
      defaultCourseImg: defaultCourseImg,
      menu: false,
      menu2: false,
      degreeOptions: this.$i18n.messages[this.$i18n.locale]["degrees"],
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

    editItemEducation(item) {
      this.editedIndexEducation = this.itemsEducation.indexOf(item);
      this.editedItemEducation = Object.assign({}, item);
      this.dialogEducation = true;
    },

    async deleteItemEducation(item) {
      const index = this.itemsEducation.indexOf(item);
      confirm(this.$i18n.messages[this.$i18n.locale]["delete_confirmation"]) &&
        this.itemsEducation.splice(index, 1);
      await ProfileService.deleteCourseStudent({
        name: item.course.name,
        academicDegree: item.degree,
        PersonId: this.$store.state.user.id
      });
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
        await ProfileService.updateCourseStudent({
          name: this.editedItemEducation.course.name,
          academicDegree: this.editedItemEducation.degree,
          enrollmentDate: this.editedItemEducation.enrollmentDate,
          graduationDate: this.editedItemEducation.graduationDate,
          PersonId: this.$store.state.user.id
        });
      } else {
        this.itemsEducation.push(this.editedItemEducation);
        await ProfileService.insertCourseStudent({
          name: this.editedItemEducation.course.name,
          academicDegree: this.editedItemEducation.degree,
          enrollmentDate: this.editedItemEducation.enrollmentDate,
          graduationDate: this.editedItemEducation.graduationDate,
          PersonId: this.$store.state.user.id
        });
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
    }
  },

  watch: {
    dialogEducation(val) {
      val || this.close();
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

