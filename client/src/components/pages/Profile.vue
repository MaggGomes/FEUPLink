<template>
  <div>

    <profile-header class="cards-width" :person="person" :personType="personType" :locationString="locationString">
    </profile-header>

    <profile-experience-content class="cards-width" :person="person" :itemsExperience="itemsExperience">
    </profile-experience-content>

    <profile-education-content class="cards-width" :person="person" :itemsEducation="itemsEducation">
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
    locationString: "",
    personType: ""
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
        this.personType = "Student";
        let student = await ProfileService.getStudentInformation({
          id: this.$route.params.id
        });

        this.person = student.data.person;

        this.locationString =
          this.person.country !== null && this.person.city !== null
            ? this.person.city + ", " + this.person.country
            : [this.person.city, this.person.country].join("");

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
      } else if (result.data.type == "staff") {
        this.personType = "Staff";
        let staff = await ProfileService.getStaffInformation({
          id: this.$route.params.id
        });
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
