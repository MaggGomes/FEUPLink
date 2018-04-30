<template>
  <div>
    <profile-header :person="person" :personType="personType" :locationString="locationString">
    </profile-header>

    <profile-content :title="'Experience'" :person="person" :itemsExperience="itemsExperience">
    </profile-content>

    <v-card flat raised>
      <v-container>
        <v-layout>
          <v-flex xs11>
            <v-toolbar-title>Experience</v-toolbar-title>
          </v-flex>
          <v-flex v-if="person.id == this.$store.state.user.id">
            <v-dialog v-model="dialogExperience" max-width="500px">
              <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Company" v-model="editedItemExperience.company"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Title" v-model="editedItemExperience.title"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
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
                          label="Start date"
                          v-model="editedItemExperience.startDate"
                          prepend-icon="event"
                          readonly
                          ></v-text-field>
                          <v-date-picker
                          ref="picker"
                          v-model="editedItemExperience.startDate"
                          @change="save"
                          min="1950-01-01"
                          :max="new Date().toISOString().substr(0, 10)"
                          type="month"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6>
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
                          label="End date"
                          v-model="editedItemExperience.endDate"
                          prepend-icon="event"
                          readonly
                          ></v-text-field>
                          <v-date-picker
                          ref="picker"
                          v-model="editedItemExperience.endDate"
                          @change="save"
                          min="1950-01-01"
                          :max="new Date().toISOString().substr(0, 10)"
                          type="month"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
															:items="jobOptions"
															v-model="editedItemExperience.isCurrent"
															label="Current job"
															prepend-icon="person"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="closeExperience">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="saveExperience">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-data-table v-if="person.id == this.$store.state.user.id"
          :headers="headersExperienceEdit"
          :items="itemsExperience"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.company }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.startDate }}</td>
            <td class="text-xs-left">{{ props.item.endDate }}</td>
            <td class="text-xs-left">{{ props.item.isCurrent }}</td>
            <td class="justify-left layout px-0">
              <v-btn icon class="mx-0" @click="editItemExperience(props.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItemExperience(props.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
        <v-data-table v-else
          :headers="headersExperience"
          :items="itemsExperience"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.company }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.startDate }}</td>
            <td class="text-xs-left">{{ props.item.endDate }}</td>
            <td class="text-xs-left">{{ props.item.isCurrent }}</td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-container>
  
      <v-container>
        <v-layout>
          <v-flex xs11>
            <v-toolbar-title>Education</v-toolbar-title>
          </v-flex>
          <v-flex v-if="person.id == this.$store.state.user.id">
            <v-dialog v-model="dialogEducation" max-width="500px">
              <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-select
                          :items="degreeOptions"
                          v-model="editedItemEducation.degree"
                          label="Academic degree"
                          prepend-icon="person"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                          :items="coursesOptions"
                          item-text="name"
                          autocomplete
                          v-model="editedItemEducation.course"
                          label="Course name"
                          prepend-icon="person"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
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
                          label="Enrollment date"
                          v-model="editedItemEducation.enrollmentDate"
                          prepend-icon="event"
                          readonly
                          ></v-text-field>
                          <v-date-picker
                          ref="picker"
                          v-model="editedItemEducation.enrollmentDate"
                          @change="save"
                          min="1950-01-01"
                          :max="new Date().toISOString().substr(0, 10)"
                          type="month"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-menu
                          ref="menu4"
                          lazy
                          :close-on-content-click="false"
                          v-model="menu4"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          min-width="290px"
                          >
                          <v-text-field
                          slot="activator"
                          label="Graduation date"
                          v-model="editedItemEducation.graduationDate"
                          prepend-icon="event"
                          readonly
                          ></v-text-field>
                          <v-date-picker
                          ref="picker"
                          v-model="editedItemEducation.graduationDate"
                          @change="save"
                          min="1950-01-01"
                          :max="new Date().toISOString().substr(0, 10)"
                          type="month"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="closeEducation">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="saveEducation">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-data-table v-if="person.id == this.$store.state.user.id"
          :headers="headersEducationEdit"
          :items="itemsEducation"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.degree }}</td>
            <td class="text-xs-left">{{ props.item.course.name }}</td>
            <td class="text-xs-left">{{ props.item.enrollmentDate }}</td>
            <td class="text-xs-left">{{ props.item.graduationDate }}</td>
            <td class="justify-left layout px-0">
              <v-btn icon class="mx-0" @click="editItemEducation(props.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItemEducation(props.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
        <v-data-table v-else
          :headers="headersEducation"
          :items="itemsEducation"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.degree }}</td>
            <td class="text-xs-left">{{ props.item.course }}</td>
            <td class="text-xs-left">{{ props.item.enrollmentDate }}</td>
            <td class="text-xs-left">{{ props.item.graduationDate }}</td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-card>

  </div>
</template>
<script>
import Vue from "vue";
import ProfileService from "@/services/ProfileService";
import CourseService from "@/services/CourseService";
import LinkedInButton from "@/components/elements/LinkedInButton";
import FacebookButton from "@/components/elements/FacebookButton";
import ProfileHeader from "@/components/elements/profileElements/Header"
import ProfileContent from "@/components/elements/profileElements/Content"

export default {
  name: "Profile",
  components: {
    LinkedInButton,
    FacebookButton,
    ProfileHeader,
    ProfileContent
  },
  data: () => ({
    menu: false,
    menu2: false,
    menu3: false,
    menu4: false,
    jobOptions: ["Yes", "No"],
    degreeOptions: ["Bachelor", "Masters", "PhD"],
    coursesOptions: null,
    dialogExperience: false,
    dialogEducation: false,
    headersExperienceEdit: [
      { text: "Company", value: "company" },
      { text: "Title", value: "title" },
      { text: "Start date", value: "startDate" },
      { text: "End date", value: "endDate" },
      { text: "Current job", value: "isCurrent" },
      { text: "Actions", value: "name", sortable: false }
    ],
    headersEducationEdit: [
      { text: "Academic Degree", value: "degree" },
      { text: "Course name", value: "cours" },
      { text: "Enrollment date", value: "enrollmentDate" },
      { text: "Graduation date", value: "graduationDate" },
      { text: "Actions", value: "name", sortable: false }
    ],
    headersExperience: [
      { text: "Company", value: "company" },
      { text: "Title", value: "title" },
      { text: "Start date", value: "startDate" },
      { text: "End date", value: "endDate" },
      { text: "Current job", value: "isCurrent" }
    ],
    headersEducation: [
      { text: "Academic Degree", value: "degree" },
      { text: "Course name", value: "cours" },
      { text: "Enrollment date", value: "enrollmentDate" },
      { text: "Graduation date", value: "graduationDate" }
    ],
    itemsExperience: [],
    itemsEducation: [],
    person: {},
    locationString: "",
    personType: "",
    editedIndexExperience: -1,
    editedIndexEducation: -1,
    editedItemExperience: {
      company: "",
      title: "",
      startDate: null,
      endDate: null,
      isCurrent: null
    },
    defaultItemExperience: {
      company: "",
      title: "",
      startDate: null,
      endDate: null,
      isCurrent: null
    },
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
    tabsItems: ["Experience", "Visibility Options"]
  }),

  computed: {
    formTitle() {
      return this.editedIndexExperience === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialogExperience(val) {
      val || this.close();
    },
    dialogEducation(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let result = await ProfileService.getTypeOfPerson({
        id: this.$route.params.id
      });

      if (result.data.type == "student") {
        this.personType = "Student"
        let student = await ProfileService.getStudentInformation({
          id: this.$route.params.id
        });

        this.person = student.data.person;
        console.log(student.data);

        this.locationString =
          this.person.contry !== null && this.person.city !== null
            ? this.person.city + ", " + this.person.country
            : [this.person.city, this.person.country].join('');

        for (var i = 0; i < student.data.courses.length; i++) {
          var enrDate = new Date(
            student.data.courses[i].CourseStudent.enrollmentDate
          );
          var enrollmentDate =
            enrDate.getUTCFullYear() + "-" + (enrDate.getUTCMonth() + 1);
          var grdDate = new Date(
            student.data.courses[i].CourseStudent.graduationDate
          );
          var graduationDate =
            grdDate.getUTCFullYear() + "-" + (grdDate.getUTCMonth() + 1);
          this.itemsEducation.push({
            degree: student.data.courses[i].academicDegree,
            course: student.data.courses[i],
            enrollmentDate: enrollmentDate,
            graduationDate: graduationDate
          });
        }

        for (var i = 0; i < student.data.experience.length; i++) {
          var sDate = new Date(student.data.experience[i].job.startDate);
          var startDate =
            sDate.getUTCFullYear() + "-" + (sDate.getUTCMonth() + 1);
          var eDate = new Date(student.data.experience[i].job.endDate);
          var endDate =
            eDate.getUTCFullYear() + "-" + (eDate.getUTCMonth() + 1);

          var current = "";
          if (student.data.experience[i].job.isCurrent) current = "Yes";
          else current = "No";

          this.itemsExperience.push({
            company: student.data.experience[i].companyName,
            title: student.data.experience[i].job.title,
            startDate: startDate,
            endDate: endDate,
            isCurrent: current
          });
        }
        console.log(this.itemsExperience)
      } else if (result.data.type == "staff") {
        this.personType = "Staff"
        let staff = await ProfileService.getStaffInformation({
          id: this.$route.params.id
        });
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async getCourses() {
      try {
        this.coursesOptions = (await CourseService.list_all_courses()).data;
      } catch (error) {
        this.error = error;
      }
    },
    editItemExperience(item) {
      this.editedIndexExperience = this.itemsExperience.indexOf(item);
      this.editedItemExperience = Object.assign({}, item);
      this.dialogExperience = true;
    },
    async deleteItemExperience(item) {
      const index = this.itemsExperience.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.itemsExperience.splice(index, 1);
      await ProfileService.deleteJobExperience({
        company: item.company,
        personId: this.$store.state.user.id
      });
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

        await ProfileService.updateJobExperience({
          company: this.editedItemExperience.company,
          title: this.editedItemExperience.title,
          startDate: this.editedItemExperience.startDate,
          endDate: this.editedItemExperience.endDate,
          isCurrent: this.editedItemExperience.isCurrent,
          personId: this.$store.state.user.id
        });
      } else {
        this.itemsExperience.push(this.editedItemExperience);
        await ProfileService.insertExperience({
          company: this.editedItemExperience.company,
          title: this.editedItemExperience.title,
          startDate: this.editedItemExperience.startDate,
          endDate: this.editedItemExperience.endDate,
          isCurrent: this.editedItemExperience.isCurrent,
          personId: this.$store.state.user.id
        });
      }
      this.closeExperience();
    },

    editItemEducation(item) {
      this.editedIndexEducation = this.itemsEducation.indexOf(item);
      this.editedItemEducation = Object.assign({}, item);
      this.dialogEducation = true;
    },

    async deleteItemEducation(item) {
      const index = this.itemsEducation.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.itemsEducation.splice(index, 1);
      await ProfileService.deleteCourseStudent({
        name: item.course.name,
        academicDegree: item.degree,
        PersonId: this.$store.state.user.id
      });
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
    }
  },
  mounted: async function() {
    await this.getCourses();
  }
};
</script>

<style scopped>
.primary {
  background-color: #b71c1c !important;
}
</style>
