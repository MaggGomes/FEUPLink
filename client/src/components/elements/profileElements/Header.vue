<template>
  <div>
    <v-card flat raised style="margin-bottom: 20px;">
      <v-container align-center>
        <v-layout style="margin-bottom: 20px;" row>
          <!-- Start region of mobile screen -->
          <v-flex hidden-md-and-up>
            <v-layout row>
              <v-flex xs12>
                <img class="align-img-center" :src="defaultUserImg" width="150" height="150">
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
              <v-flex xs1>
                <v-icon>fab fa-facebook</v-icon>
              </v-flex>
              <v-flex xs1>
                <v-icon>fab fa-linkedin</v-icon>
              </v-flex>
              <!--<v-flex xs1>
                <v-icon>fab fa-instagram</v-icon>
              </v-flex>
              <v-flex xs1>
                <v-icon>fab fa-skype</v-icon>
              </v-flex> -->
            </v-layout>
          </v-flex>
          <!-- End region of mobile screen -->

          <!-- Start region of Small, medium, large and extra-large screen -->
          <v-flex hidden-sm-and-down lg2 md3>
            <img :src="defaultUserImg" width="150" height="150">
          </v-flex>
          <v-flex hidden-sm-and-down lg2 md2 justify-start style="margin: auto;">
            <v-layout class="bottom-margin" row>
              <v-flex lg12 md12>
                <h3>{{ person.name }}</h3>
              </v-flex>
            </v-layout>
            <v-layout class="bottom-margin"  row>
              <v-flex lg12 md12>
                <p class="grey-color">{{ personType }}</p>
              </v-flex>
            </v-layout>
            <v-layout v-if="locationString.length !== 0" class="bottom-margin" row>
              <v-flex lg12 md12>
                <p class="grey-color">{{ locationString }}</p>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex hidden-sm-and-down lg3 md3 style="margin: auto;">
            <v-layout row>
              <v-flex lg2 md2>
                <v-icon large>fab fa-facebook</v-icon>
              </v-flex>
              <v-flex lg2 md2>
                <v-icon large>fab fa-linkedin</v-icon>
              </v-flex>
              <!--<v-flex lg2 md2>
                <v-icon large>fab fa-instagram</v-icon>
              </v-flex>
              <v-flex lg2 md2>
                <v-icon large>fab fa-skype</v-icon>
              </v-flex>-->
            </v-layout>
          </v-flex>
          <!-- End regionf of Small, medium, large and extra-large screen -->
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import defaultUserImg from "@/assets/defaultUser.jpg";

export default {
  name: "profile-header",
	props: [
		'person',
		'personType',
		'locationString'
	],
	data () {
		return {
			defaultUserImg: defaultUserImg
		}
	}
};
</script>

<style scopped>
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

