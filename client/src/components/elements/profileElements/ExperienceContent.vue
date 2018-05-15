<template>
  <v-card flat raised class="short-width" style="margin-bottom: 20px;">
    <v-container class="minimum-side-padding">
      <v-layout row>
        <v-flex xs11>
          <v-toolbar-title class="center-text">Experience</v-toolbar-title>
        </v-flex>
        <v-flex v-if="person.id == this.$store.state.user.id">
          <v-dialog v-model="dialogExperience" max-width="500px">
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
                      <v-text-field label="Company" v-model="editedItemExperience.company"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                      <v-text-field label="Title" v-model="editedItemExperience.title"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn-toggle v-model="editedItemExperience.title_visibility ? 0 : 1">
                        <v-btn flat>
                          <v-icon>visibility</v-icon>
                        </v-btn>
                        <v-btn flat>
                          <v-icon>visibility_off</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-flex>
                    <v-flex xs9>
                      <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" 
                        transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                        <v-text-field slot="activator" label="Start date"
                        v-model="editedItemExperience.startDate" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker ref="picker" v-model="editedItemExperience.startDate" @change="save" 
                        min="1950-01-01" :max="new Date().toISOString().substr(0, 10)" type="month"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn-toggle v-model="editedItemExperience.startDate_visibility ? 0 : 1">
                        <v-btn flat>
                          <v-icon>visibility</v-icon>
                        </v-btn>
                        <v-btn flat>
                          <v-icon>visibility_off</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-flex>
                    <v-flex xs9>
                      <v-menu ref="menu2" lazy :close-on-content-click="false" v-model="menu2"
                        transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px">
                        <v-text-field slot="activator" label="End date" v-model="editedItemExperience.endDate" 
                        prepend-icon="event" readonly></v-text-field>
                        <v-date-picker ref="picker" v-model="editedItemExperience.endDate" @change="save" min="1950-01-01" 
                        :max="new Date().toISOString().substr(0, 10)" type="month"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn-toggle v-model="editedItemExperience.endDate_visibility ? 0 : 1">
                        <v-btn flat>
                          <v-icon>visibility</v-icon>
                        </v-btn>
                        <v-btn flat>
                          <v-icon>visibility_off</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-flex>
                    <v-flex xs9>
                      <v-select :items="jobOptions" v-model="editedItemExperience.isCurrent" 
                      label="Current job" prepend-icon="person"></v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn-toggle v-model="editedItemExperience.isCurrent_visibility ? 0 : 1">
                        <v-btn flat>
                          <v-icon>visibility</v-icon>
                        </v-btn>
                        <v-btn flat>
                          <v-icon>visibility_off</v-icon>
                        </v-btn>
                      </v-btn-toggle>
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
      <v-layout>
        <v-list class="full-width" three-line>
          <template v-for="(item, index) in itemsExperience">
            <v-divider v-if="index !== 0" :key="index"></v-divider>
            <v-list-tile :key="index + 'tile'">
              <v-list-tile-avatar>
                <img :src="defaultCompanyImg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.company }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <p>{{ item.ttle }}</p>
                  <p>{{ item.startDate }} - {{ item.endDate }}</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-layout row class="hidden-sm-and-down">
                <v-flex v-if="person.id == userId" lg12 md12>
                  <v-list-tile-action>
                    <v-btn icon class="mx-0" @click="editItemExperience(item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItemExperience(item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-flex>
                </v-layout>
            </v-list-tile>
            <v-layout row class="hidden-md-and-up" :key="index + 'layout'" justify-center style="margin-bottom: 5px;">
              <v-flex lg6 md6 style="text-align: center;">
                <v-btn icon class="mx-0" @click="editItemExperience(item)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-flex>
              <v-flex lg6 md6 style="text-align: center;">
                <v-btn icon class="mx-0" @click="deleteItemExperience(item)">
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
import defaultCompanyImg from "@/assets/defaultCompany.png";
import ProfileService from "@/services/ProfileService";

export default {
  name: "profile-experience-content",

  props: ["person", "itemsExperience"],

  data() {
    return {
      defaultCompanyImg: defaultCompanyImg,
      menu: false,
      menu2: false,
      jobOptions: ["Yes", "No"],
      defaultItemExperience: {
        company: "",
        title: "",
        title_visibility: true,
        startDate: null,
        startDate_visibility: true,
        endDate: null,
        endDate_visibility: true,
        isCurrent: null,
        isCurrent_visibility: true
      },
      editedIndexExperience: -1,
      editedItemExperience: {
        company: "",
        title: "",
        title_visibility: true,
        startDate: null,
        startDate_visibility: true,
        endDate: null,
        endDate_visibility: true,
        isCurrent: null,
        isCurrent_visibility: true
      },
      dialogExperience: false,
      userId: this.$store.state.user.id
    };
  },

  methods: {
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
          title_visibility: ((this.editedItemExperience.title_visibility == 0) ? true : false),
          startDate: this.editedItemExperience.startDate,
          startDate_visibility: ((this.editedItemExperience.startDate_visibility == 0) ? true : false),
          endDate: this.editedItemExperience.endDate,
          endDate_visibility: ((this.editedItemExperience.endDate_visibility == 0) ? true : false),
          isCurrent: this.editedItemExperience.isCurrent,
          isCurrent_visibility: ((this.editedItemExperience.isCurrent_visibility == 0) ? true : false),
          personId: this.$store.state.user.id
        });
      } else {
        this.itemsExperience.push(this.editedItemExperience);
        await ProfileService.insertExperience({
          company: this.editedItemExperience.company,
          title: this.editedItemExperience.title,
          title_visibility: ((this.editedItemExperience.title_visibility == 0) ? true : false),
          startDate: this.editedItemExperience.startDate,
          startDate_visibility: ((this.editedItemExperience.startDate_visibility == 0) ? true : false),
          endDate: this.editedItemExperience.endDate,
          endDate_visibility: ((this.editedItemExperience.endDate_visibility == 0) ? true : false),
          isCurrent: this.editedItemExperience.isCurrent,
          isCurrent_visibility: ((this.editedItemExperience.isCurrent_visibility == 0) ? true : false),
          personId: this.$store.state.user.id
        });
      }
      this.closeExperience();
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    close() {
      this.dialogExperience = false;
      setTimeout(() => {
        this.editedItemExperience = Object.assign({}, this.defaultItemExperience);
        this.editedIndexExperience = -1;
      }, 300);
    }
  },

  computed: {
    formTitle() {
      return this.editedIndexExperience === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialogExperience(val) {
      val || this.close();
    },
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

