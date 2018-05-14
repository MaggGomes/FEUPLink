<template>
  <div>
    <v-card class="short-width" flat raised style="margin-bottom: 20px; margin-top: 20px;">
      <v-container>
        <v-layout style="margin-bottom: 20px;" row>
          <!-- Start region of mobile screen -->
          <v-flex hidden-md-and-up>
            <v-layout row justify-end>
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
              <v-flex xs12 wrap>
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
              <v-flex v-if="person.facebookProfile !== null" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-facebook</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.linkedInProfile !== null" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-linkedin</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.whatsAppProfile !== null" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-whatsapp</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.instagramProfile !== null" xs2>
                <v-layout justify-center>
                  <v-icon>fab fa-instagram</v-icon>
                </v-layout>
              </v-flex>
              <v-flex v-if="person.email !== null" xs2>
                <v-layout justify-center>
                  <v-icon>email</v-icon>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- End region of mobile screen -->
  
          <!-- Start region of Small, medium, large and extra-large screen -->
          <v-flex hidden-sm-and-down>
  
            <v-layout row justify-end>
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
    
    <profile-edit :person="person" :editDialog="editPersonDialog"></profile-edit>
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

  props: ["person", "personType", "locationString"],

  data() {
    return {
      editPersonDialog: false,
      defaultUserImg: defaultUserImg,
      active: null
    };
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

