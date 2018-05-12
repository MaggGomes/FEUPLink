<template>
  <v-content id="createContent">
    <v-container fluid v-if="loading">
      <buffering-wheel />
    </v-container>
    <v-container fluid v-else>
      <v-toolbar style='color: white; background-color: #8c2d19' height="40px">
        <v-toolbar-title style="font-size: 15px">Create a post</v-toolbar-title>
      </v-toolbar>
      <v-stepper v-model="e1" >
        <v-stepper-header>
          <v-stepper-step step="1" :complete="e1 > 1">Description</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">Text</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card color="grey lighten-3" class="mb-5">
              <v-form v-model="valid" ref="form" autocomplete="off" lazy-validation>
                <v-container fluid>
                  <v-layout row wrap align-center>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-text-field
                        name="title"
                        label="Title"
                        v-model="title"
                        required>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-center>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-text-field
                        name="description"
                        label="Description"
                        v-model="description"
                        required>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout align-center>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-select
                        :items="postTypes"
                        v-model="postType"
                        label="Type"
                        required
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout align-center>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-select
                        :items="channels"
                        v-model="selectedChannels"
                        item-text="name"
                        item-value="id"
                        label="Channel"
                        multiple
                        max-height="400"
                        hint="Select one or more channels"
                        persistent-hint
                        chips
                        required
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout align-center>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-text-field
                        name="link"
                        label="Link"
                        v-model="link">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-center>
                    <v-flex xs12 sm5 text-xs-left>
                      <v-select
                        v-model="selectedTags"
                        :items="tags"
                        label="Tags"
                        chips
                        tags
                      >
                        <template slot="selection" slot-scope="data">
                          <v-chip
                            :selected="data.selected"
                            :disabled="data.disabled"
                            :key="JSON.stringify(data.item)"
                            class="chip--select-multi"
                            @input="data.parent.selectItem(data.item)"
                          >
                            <v-avatar class="tagUppercase">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                            {{ data.item }}
                          </v-chip>
                        </template>
                      </v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
            <v-flex xs12 sm12 text-right class="text-xs-right">
              <v-btn style='color: white; background-color: #8c2d19'  border-radius="0px" @click.native="e1 = 2">Continue</v-btn>
            </v-flex>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card color="white lighten-3" class="mb-5">
              <v-form v-model="valid" ref="form" autocomplete="off" lazy-validation>
                <v-container fluid>
                </v-container>
                  <vue-editor v-model="text"></vue-editor>
              </v-form>
            </v-card>
            <v-flex xs12 sm12 text-right class="text-xs-right">
              <v-btn  @click.native="e1 = 1" flat>Back</v-btn>
              <v-btn
                color="primary"
                v-on:click="submitData"
                :disabled="!valid">
                Finish
              </v-btn>
            </v-flex>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-alert xs12 type="error" :value="showingError">
        {{this.errorMessage}}
      </v-alert>
    </v-container>
  </v-content>
</template>

<script>

  import FeedService from '@/services/FeedService'
  import ChannelService from '@/services/ChannelService'
  import BufferingWheel from '@/components/elements/BufferingWheel'
  import InputTag from 'vue-input-tag'
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      BufferingWheel, InputTag, VueEditor
    },
    data () {
      return {
        valid: false,
        showingError: false,
        errorMessage: '',
        // form-fields
        loading: false,
        e1: 0,
        title: null,
        description: null,
        text: '<p>Some initial content</p>',
        postType: null,
        postTypes: ['New', 'Job', 'Event', 'Education'],
        link: '',
        tags: ['Porto', 'University', 'Engineering', 'Informatics'],
        selectedTags: [],
        channels: [],
        selectedChannels: []
      }
    },
    watch: {
      menu (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    created() {
      this.initialize();
    },

    methods: {
      async initialize() {
        try{
          let response = await ChannelService.get_admin_channels_in_range(2, 0, 2);

          this.channels = response.data;
          console.log(this.channels[0].name);
        }catch(error){
          console.log(error);
        }
      },
      async submitData () {
        try{
          if (this.$refs.form.validate()) {
            await FeedService.create_post({
              title: this.title,
              description: this.description,
              text: this.text,
              date: this.date,
              link: this.link,
              type: this.postType,
              tags: this.selectedTags,
              channels: this.selectedChannels,
              PersonId: this.$store.state.user.id
            });

            this.$router.push('Feed');
          }
        }catch(error){
          this.e1=1;
          this.showingError=true;
          this.errorMessage=error.response.data.error;
        }
      },
      save (date) {
        this.$refs.menu.save(date)
      }
    }
  }
</script>

<style scopped>
  .v-select .dropdown-menu {
    display:block;
  }

  .primary {
    background-color: #8c2d19 !important;
  }

  .cc-selector input {
    margin:0;padding:0;
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
  }

  .student{background-image:url(https://cdn3.iconfinder.com/data/icons/school-and-education-2/56/education_icons_IF-02-512.png);}
  .staff{background-image:url(https://cdn4.iconfinder.com/data/icons/hr-recruitment-management-part-2/400/hr-07-2-512.png);}

  .cc-selector input:active +.drinkcard-cc{opacity: .9;}
  .cc-selector input:checked +.drinkcard-cc{
    -webkit-filter: none;
    -moz-filter: none;
    filter: none;
  }
  .drinkcard-cc {
    cursor:pointer;
    background-size:contain;
    background-repeat:no-repeat;
    display:inline-block;
    width:400px;height:280px;
    -webkit-transition: all 100ms ease-in;
    -moz-transition: all 100ms ease-in;
    transition: all 100ms ease-in;
    -webkit-filter: brightness(1.8) grayscale(1) opacity(.7);
    -moz-filter: brightness(1.8) grayscale(1) opacity(.7);
    filter: brightness(1.8) grayscale(1) opacity(.7);
  }
  .drinkcard-cc:hover{
    -webkit-filter: brightness(1.2) grayscale(.5) opacity(.9);
    -moz-filter: brightness(1.2) grayscale(.5) opacity(.9);
    filter: brightness(1.2) grayscale(.5) opacity(.9);
  }

  .tagUppercase {
    background-color: #8c2d19;
    border-color: #8c2d19;
    color: white;
  }

  /* Extras */
  a:visited{color:#888}
  a{color:#444;text-decoration:none;}
  p{margin-bottom:.3em;}

  @media only screen and (max-width: 720px) {
    #createContent {
      padding: 0 !important;
    }
    .stepper__content {
      padding: 0;
    }
    .drinkcard-cc {
      width:240px;height:180px;
    }
    .to {
      display: none;
    }
  }
</style>
