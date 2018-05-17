<template>
  <div>
    <v-card class="short-width" flat raised style="margin-bottom: 20px; margin-top: 20px;">
      <v-container>
        <v-layout style="margin-bottom: 20px;" row>
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

          <!-- Start region of mobile screen -->
          <v-flex hidden-md-and-up>
            <v-layout v-if="person.id == this.$store.state.user.id" row justify-end>
              <v-btn icon class="mx-0" @click.stop="editPersonDialog = true">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-layout>
  
            <v-layout row>
              <v-flex xs12>
                <v-avatar class="align-img-center" size="150px">
                  <img class="align-img-center" :src="defaultUserImg">
                </v-avatar>
              </v-flex>
            </v-layout>
            <v-layout style="margin-bottom: 15px;margin-top: 15px;" row>
              <v-flex xs9 wrap>
                <h2 class="text-align-center">{{ person.name }}</h2>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 wrap>
                <p class="grey-color text-align-center">{{ personType }}</p>
              </v-flex>
            </v-layout>
            <v-layout v-if="locationString.length !== 0" row>
              <v-flex xs12 wrap>
                <p class="grey-color text-align-center">{{ locationString }}</p>
              </v-flex>
            </v-layout>
            <v-layout row style="margin-top: 15px;" justify-center>
              <v-flex v-if="person.facebookProfile !== null && person.facebookProfile !== undefined" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-facebook</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.linkedInProfile !== null && person.linkedInProfile !== undefined" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-linkedin</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.whatsAppProfile !== null && person.whatsAppProfile !== undefined" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-whatsapp</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.instagramProfile !== null && person.instagramProfile !== undefined" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-instagram</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.email !== null && person.email !== undefined" xs2>
                <v-layout justify-center>
                  <v-icon>email</v-icon>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- End region of mobile screen -->
  
          <!-- Start region of Small, medium, large and extra-large screen -->
          <v-flex hidden-sm-and-down>
  
            <v-layout v-if="person.id == this.$store.state.user.id" row justify-end>
              <v-btn icon class="mx-0" @click.stop="editPersonDialog = true">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-layout>
  
            <v-layout row>
              <v-flex lg12 md12>
                <v-avatar class="align-img-center" size="150px">
                  <img :src="defaultUserImg">
                </v-avatar>
              </v-flex>
            </v-layout>
  
            <v-layout class="bottom-margin top-margin" row>
              <v-flex lg12 md12>
                <h3 class="text-align-center">{{ person.name }}</h3>
              </v-flex>
            </v-layout>
  
            <v-layout class="bottom-margin" row>
              <v-flex lg12 md12>
                <p class="grey-color text-align-center">{{ personType }}</p>
              </v-flex>
            </v-layout>
  
            <v-layout v-if="locationString.length !== 0" class="bottom-margin" row>
              <v-flex lg12 md12>
                <p class="grey-color text-align-center">{{ locationString }}</p>
              </v-flex>
            </v-layout>
  
            <v-layout row justify-center>
              <v-flex v-if="person.facebookProfile !== null && person.facebookProfile !== undefined" lg1 md1>
                <v-layout justify-center>
                  <v-icon large>fab fa-facebook</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.linkedInProfile !== null && person.linkedInProfile !== undefined" lg1 md1>
                <v-layout justify-center>
                  <v-icon large>fab fa-linkedin</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.whatsAppProfile !== null && person.whatsAppProfile !== undefined" lg1 md1>
                <v-layout justify-center>
                  <v-icon large>fab fa-whatsapp</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.instagramProfile !== null && person.instagramProfile !== undefined" lg1 md1>
                <v-layout justify-center>
                  <v-icon large>fab fa-instagram</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.email !== null  && person.email !== undefined" 2 lg1 md1>
                <v-layout justify-center>
                  <v-icon large>email</v-icon>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- End regionf of Small, medium, large and extra-large screen -->
        </v-layout>
      </v-container>
    </v-card>
    
    <v-dialog v-if="person.id == this.$store.state.user.id" v-model="editPersonDialog" max-width="600px">
      <profile-edit @personEdited="updatePersonObj" @closeDialog="editPersonDialog = false" :person="person"></profile-edit>
    </v-dialog>
  </div>
</template>

<script>
import defaultUserImg from "@/assets/defaultUser.jpg";
import ProfileEdit from "@/components/elements/profileElements/EditProfile";

export default {
  name: "profile-header",

  components: {
    ProfileEdit
  },

  props: ["personObj", "personType"],

  data() {
    return {
      editPersonDialog: false,
      defaultUserImg: defaultUserImg,
      active: null,
      person: this.personObj,
	    showingFeedback: false,
      feedbackColor: 'error',
      error: null,
      success: null
    };
  },

  methods: {
    updatePersonObj(editedPerson) {
      this.person = editedPerson[0]
      this.success = editedPerson[1]
      this.error = editedPerson[2]
      this.editPersonDialog = false
    }
  },

  computed: {
    locationString() {
      if (this.person.city === undefined && this.person.country === undefined)
        return ''
        
      return this.person.country !== null && this.person.city !== null
        ? this.person.city + ", " + this.person.country
        : [this.person.city, this.person.country].join("");
    }
  },

  watch: {
    personObj(val) {
      this.person = val;
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

.top-margin {
  margin-top: 10px;
}

.text-align-center {
  text-align: center;
}
</style>

