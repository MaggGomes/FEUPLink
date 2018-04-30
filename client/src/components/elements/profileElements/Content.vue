<template>
  <v-card flat raised class="short-width" style="margin-bottom: 20px;">
    <v-container class="minimum-side-padding">
      <v-layout row>
        <v-flex xs12>
          <v-toolbar-title class="center-text">{{ title }}</v-toolbar-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-list class="full-width" three-line>
          <template v-for="(item, index) in itemsExperience">
            <v-divider v-if="index !== 0" :key="index"></v-divider>
            <v-list-tile :key="index">
              <v-list-tile-avatar>
                <img :src="defaultCompanyImg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <p>{{ item.company }}</p>
                  <p>{{ item.startDate }} - {{ item.endDate }}</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-layout row class="hidden-sm-and-down">
                <v-flex lg12 md12>
                  <v-list-tile-action>
                    <v-icon>mode edit</v-icon>
                    <v-icon>delete</v-icon>
                  </v-list-tile-action>
                </v-flex>
              </v-layout>
            </v-list-tile>
            <v-layout row class="hidden-sm-and-up" :key="index" justify-center style="margin-bottom: 5px;">
              <v-flex lg6 md6 style="text-align: center;">
                <v-icon>edit</v-icon>
              </v-flex>
              <v-flex lg6 md6 style="text-align: center;">
                <v-icon>delete</v-icon>
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

export default {
  name: "profile-content",
  props: ["title", "person", "itemsExperience"],
  data() {
    return {
      defaultCompanyImg: defaultCompanyImg
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

