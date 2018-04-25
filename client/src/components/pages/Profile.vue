<template>
  <v-content>
    <v-container align-center>
      <v-layout style="margin-bottom: 20px;" row>
        <!-- Start region of mobile screen -->
        <v-flex hidden-sm-and-up>
          <v-layout row>
            <v-flex xs12>
              <img class="align-img-center" :src="defaultUserImg" width="150" height="150">
            </v-flex>
          </v-layout>
          <v-layout style="margin-bottom: 15px;margin-top: 15px;" row>
            <v-flex xs12 wrap>
              <h3 class="text-align-center">{{ person.name }}</h3>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4 wrap>
              <p class="grey-color">Studied at:</p>
            </v-flex>
            <v-flex xs8 wrap>
              <h4 class="text-align-center">FEUP</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4 wrap>
              <p class="grey-color">From:</p>
            </v-flex>
            <v-flex xs8 wrap>
              <h4 class="text-align-center">{{ person.city }}, {{ person.country }}</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4 wrap>
              <p class="grey-color">Works at:</p>
            </v-flex>
            <v-flex xs8 wrap>
              <h4 class="text-align-center">FEUP</h4>
            </v-flex>
          </v-layout>
          <v-layout row style="margin-top: 15px;">
            <v-flex xs4 wrap>
              <p class="grey-color">Contact:</p>
            </v-flex>
            <v-flex xs2>
              <v-icon>fab fa-facebook</v-icon>
            </v-flex>
            <v-flex xs2>
              <v-icon>fab fa-linkedin</v-icon>
            </v-flex>
            <v-flex xs2>
              <v-icon>fab fa-instagram</v-icon>
            </v-flex>
            <v-flex xs2>
              <v-icon>fab fa-skype</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- End region of mobile screen -->

        <!-- Start region of Small, medium, large and extra-large screen -->
        <v-flex hidden-xs-only lg2 sm3>
          <img :src="defaultUserImg" width="150" height="150">
        </v-flex>
        <v-flex hidden-xs-only lg6 sm6 justify-start>
          <v-layout class="bottom-margin" row>
            <v-flex xs12>
              <h3>{{ person.name }}</h3>
            </v-flex>
          </v-layout>
          <v-layout class="bottom-margin" row>
            <v-flex lg6 sm6>
              <v-layout row>
                <v-flex lg3 sm3>
                  <p class="grey-color">Studied at:</p>
                </v-flex>
                <v-flex lg9 sm9 wrap>
                  <h4>FEUP</h4>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex lg6 sm6>
              <v-layout row>
                <v-flex lg3 sm3>
                  <p class="grey-color">From:</p>
                </v-flex>
                <v-flex lg9 sm9 wrap>
                  <h4>{{ person.city }}, {{ person.country }}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout class="bottom-margin"  row>
            <v-flex lg6 sm6>
              <v-layout row>
                <v-flex lg3 sm3>
                  <p class="grey-color">Works at:</p>
                </v-flex>
                <v-flex lg9 sm9 wrap>
                  <h4>FEUP</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex hidden-xs-only lg3 sm3>
          <v-layout row>
            <v-flex lg12 sm12>
              <p class="grey-color">Contact:</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex lg2 sm2>
              <v-icon large>fab fa-facebook</v-icon>
            </v-flex>
            <v-flex lg2 sm2>
              <v-icon large>fab fa-linkedin</v-icon>
            </v-flex>
            <v-flex lg2 sm2>
              <v-icon large>fab fa-instagram</v-icon>
            </v-flex>
            <v-flex lg2 sm2>
              <v-icon large>fab fa-skype</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- End regionf of Small, medium, large and extra-large screen -->
      </v-layout>

      <v-layout>
        <v-flex xs11>
          <v-toolbar-title>Experience</v-toolbar-title>
        </v-flex>
        <v-flex>
          <v-dialog v-model="dialogExperience" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Company" v-model="editedItemExperience.company"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Title" v-model="editedItemExperience.title"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Start date" v-model="editedItemExperience.startDate"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="End date" v-model="editedItemExperience.endDate"></v-text-field>
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
      <v-data-table
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
    </v-container>

    <v-container>
      <v-layout>
        <v-flex xs11>
          <v-toolbar-title>Education</v-toolbar-title>
        </v-flex>
        <v-flex>
          <v-dialog v-model="dialogEducation" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Academic degree" v-model="editedItemEducation.degree"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Course name" v-model="editedItemEducation.course"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Enrollment date" v-model="editedItemEducation.enrollmentDate"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Graduation date" v-model="editedItemEducation.graduationDate"></v-text-field>
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
      <v-data-table
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
    </v-container>
  </v-content>
</template>
<script>
import Vue from "vue";
import ProfileService from "@/services/ProfileService";
import LinkedInButton from "@/components/elements/LinkedInButton";
import FacebookButton from "@/components/elements/FacebookButton";
import defaultUserImg from "@/assets/defaultUser.jpg";

export default {
  name: "Profile",
  components: {
    LinkedInButton,
    FacebookButton
  },
  data: () => ({
    defaultUserImg: defaultUserImg,
    dialogExperience: false,
    dialogEducation: false,
    headersExperience: [
      { text: "Company", value: "company" },
      { text: "Title", value: "title" },
      { text: "Start date", value: "startDate" },
      { text: "End date", value: "endDate" },
      { text: "Actions", value: "name", sortable: false }
    ],
    headersEducation: [
      { text: "Academic Degree", value: "degree" },
      { text: "Course name", value: "cours" },
      { text: "Enrollment date", value: "enrollmentDate" },
      { text: "Graduation date", value: "graduationDate" },
      { text: "Actions", value: "name", sortable: false }
    ],
    itemsExperience: [],
    itemsEducation: [],
    person: {},
    editedIndexExperience: -1,
    editedIndexEducation: -1,
    editedItemExperience: {
      company: 0,
      title: 0,
      startDate: 0,
      endDate: 0
    },
    defaultItemExperience: {
      company: 0,
      title: 0,
      startDate: 0,
      endDate: 0
    },
    editedItemEducation: {
      degree: 0,
      course: 0,
      enrollmentDate: 0,
      graduationDate: 0
    },
    defaultItemEducation: {
      degree: 0,
      course: 0,
      enrollmentDate: 0,
      graduationDate: 0
    }
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
        let student = await ProfileService.getStudentInformation({
          id: this.$route.params.id
        });

        this.person = student.data.person;

        /* Depois de alterado na base de dados deve passar a estar no ciclo for */
        var enrDate = new Date(student.data.student.enrollmentDate);
        var enrollmentDate =
          enrDate.getUTCMonth() + 1 + "/" + enrDate.getUTCFullYear();
        var grdDate = new Date(student.data.student.graduationDate);
        var graduationDate =
          grdDate.getUTCMonth() + 1 + "/" + grdDate.getUTCFullYear();

        for (var i = 0; i < student.data.courses.length; i++) {
          this.itemsEducation.push({
            degree: student.data.courses[i].academicDegree,
            course: student.data.courses[i].name,
            enrollmentDate: enrollmentDate,
            graduationDate: graduationDate
          });
        }

        for (var i = 0; i < student.data.experience.length; i++) {
          var sDate = new Date(student.data.experience[i].job.startDate);
          var startDate =
            sDate.getUTCMonth() + 1 + "/" + sDate.getUTCFullYear();
          var eDate = new Date(student.data.experience[i].job.endDate);
          var endDate = eDate.getUTCMonth() + 1 + "/" + eDate.getUTCFullYear();

          this.itemsExperience.push({
            company: student.data.experience[i].companyName,
            title: student.data.experience[i].job.title,
            startDate: startDate,
            endDate: endDate
          });
        }
      } else if (result.data.type == "staff") {
        let staff = await ProfileService.getStaffInformation({
          id: this.$route.params.id
        });
      }
    },

    editItemExperience(item) {
      this.editedIndexExperience = this.itemsExperience.indexOf(item);
      this.editedItemExperience = Object.assign({}, item);
      this.dialogExperience = true;
    },

    deleteItemExperience(item) {
      const index = this.itemsExperience.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.itemsExperience.splice(index, 1);
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

    saveExperience() {
      if (this.editedIndexExperience > -1) {
        Object.assign(
          this.itemsExperience[this.editedIndexExperience],
          this.editedItemExperience
        );
      } else {
        this.itemsExperience.push(this.editedItemExperience);
      }
      this.closeExperience();
    },

    editItemEducation(item) {
      this.editedIndexEducation = this.itemsEducation.indexOf(item);
      this.editedItemEducation = Object.assign({}, item);
      this.dialogEducation = true;
    },

    deleteItemEducation(item) {
      const index = this.itemsEducation.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.itemsEducation.splice(index, 1);
    },

    closeEducation() {
      this.dialogEducation = false;
      setTimeout(() => {
        this.editedItemEducation = Object.assign({}, this.defaultItemEducation);
        this.editedIndexEducation = -1;
      }, 300);
    },

    saveEducation() {
      if (this.editedIndexEducation > -1) {
        Object.assign(
          this.itemsEducation[this.editedIndexEducation],
          this.editedItemEducation
        );
      } else {
        this.itemsEducation.push(this.editedItemEducation);
      }
      this.closeEducation();
    }
  }
};
</script>

<style scopped>
.primary {
  background-color: #b71c1c !important;
}
.align-img-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.grey-color {
  color: grey;
}

p {
  margin: 0;
}

.bottom-margin {
  margin-bottom: 10px;
}

.text-align-center {
  text-align: center;
}
</style>
