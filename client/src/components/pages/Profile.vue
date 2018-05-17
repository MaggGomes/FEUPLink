<template>
  <div>

    <profile-header class="cards-width" :personObj="person" :personType="personType">
    </profile-header>

    <profile-experience-content v-if="getRoleIndex(this.$store.state.user.role) >= getVisibleIndex(person.experienceVisible)" class="cards-width" :person="person" :itemsExperience="itemsExperience">
    </profile-experience-content>

    <profile-education-content v-if="getRoleIndex(this.$store.state.user.role) >= getVisibleIndex(student.educationVisible)" class="cards-width" :person="person" :student="student" :itemsEducation="itemsEducation">
    </profile-education-content>

  </div>
</template>
<script>
import Vue from "vue";
import ProfileService from "@/services/ProfileService";
import ProfileHeader from "@/components/elements/profileElements/Header";
import ProfileExperienceContent from "@/components/elements/profileElements/ExperienceContent";
import ProfileEducationContent from "@/components/elements/profileElements/EducationContent";

export default {
  name: "profile",

  components: {
    ProfileHeader,
    ProfileExperienceContent,
    ProfileEducationContent
  },
  
  data: () => ({
    itemsExperience: [],
    itemsEducation: [],
    person: {},
    student: {},
    personType: "",
    visibleOptions: ['All Users', 'Channel Admins', 'Super Admins'],
    roles: ['User', 'Channel Admin', 'Super Admin']
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let result = await ProfileService.getTypeOfPerson({
        id: this.$route.params.id
      });

      if (result.data.type == "student") {
        this.personType = this.$i18n.messages[this.$i18n.locale]["student"];
        let student = await ProfileService.getStudentInformation({
          id: this.$route.params.id
        });
        this.student = student.data.student;
        this.person = student.data.person;
        
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
          if (student.data.experience[i].job.isCurrent) current = this.$i18n.messages[this.$i18n.locale]["yes"];
          else current = this.$i18n.messages[this.$i18n.locale]["no"];

          this.itemsExperience.push({
            company: student.data.experience[i].companyName,
            title: student.data.experience[i].job.title,
            startDate: startDate,
            endDate: endDate,
            isCurrent: current
          });
        }
      } else if (result.data.type == "staff") {
        this.personType = this.$i18n.messages[this.$i18n.locale]["staff"];
        let staff = await ProfileService.getStaffInformation({
          id: this.$route.params.id
        });
      }
    },
    getVisibleIndex(str) {
      console.log("visible " + str);
      for(var i = 0; i < this.visibleOptions.length; i++) {
        if(str == this.visibleOptions[i])
          return i;
      }
    },
    getRoleIndex(str) {
      console.log("role " + str);
      for(var i = 0; i < this.roles.length; i++) {
        if(str == this.roles[i])
          return i;
      }
    }
  }
};
</script>

<style scopped>
.primary {
  background-color: #b71c1c !important;
}

@media screen and (max-width: 960px) {
  .cards-width {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
