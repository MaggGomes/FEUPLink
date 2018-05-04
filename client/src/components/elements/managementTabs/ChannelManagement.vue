<template>
  <v-container fluid pa-0>
    <v-layout row wrap>

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

      <!-- warning dialog -->
      <v-dialog v-model="warningDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Be Careful!</v-card-title>
          <v-card-text>
            {{warningTitle}}
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="red" @click="warningDialog=false"> Cancel </v-btn>
            <v-spacer> </v-spacer>
            <v-btn flat color="green" @click="() => { warningDialog=false, warningAction() }"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!-- dialog new channel -->
      <v-dialog v-model="itemDialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline"> Update channel information </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValid" ref="form" autocomplete="off">
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-flex xs12 md9>
                    <v-text-field label="Course name" hint="This must be unique" v-model="name" :rules="[v => !!v || 'Course name is required']"
                      required></v-text-field>
                  </v-flex>               

                  <v-flex xs12>
                    <v-text-field label="Description" v-model="description" multi-line></v-text-field>
                  </v-flex>                 

                </v-layout>
              </v-container>
            </v-form>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="() => {
                    showConfirmDialog(updateChannel, 'Are you sure you want to update the channel?')
                }" :disabled="!formValid">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- channel details dialog -->
      <v-dialog scrollable v-model="showItemDetails">
        <v-card>
          <v-card-title v-if="currentItem !== null" class="headline">{{currentItem.Channel.name}}</v-card-title>
          <v-card-text>
           <!-- <channel-details :channel="currentItem"> </channel-details> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="blue darken-1" @click="showItemDetails=false"> Dismiss </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>



      <!-- Page Content -->
      <v-flex>
        <v-layout>
          <v-flex xs7>
            <span class="display-1"> Manage Channels </span>
          </v-flex>

          <v-flex xs2 offset-xs2>
            <v-select
              :items="numPagesOptions"
              v-model="itemsPerPage"
              label="Items"
              class="input-group--focused"
              item-value="pa"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-flex>

      

      <v-flex xs12>
        <!-- list of items -->
        <v-toolbar v-for="item in items" :key="item.Channel.id">
          <v-toolbar-title class="hidden-sm-and-down">{{item.Channel.name}}</v-toolbar-title>
          <v-toolbar-title class="hidden-md-and-up">{{item.Channel.id}}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn fab flat @click="() => {
                      currentItem=item  
                      showItemDetails=true                    
                  }">
              <v-icon> remove_red_eye </v-icon>
            </v-btn>
            <v-btn fab flat @click="openUpdateItemDialog(item)">
              <v-icon> mode_edit </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 pt-4>
        <v-pagination :length="numPages" v-model="currentPage" ></v-pagination>
      </v-flex>

    </v-layout>
  </v-container>
</template>



<script>
import ChannelService from '@/services/ChannelService'
import ChannelDetails from '@/components/elements/ChannelDetails'

export default {
  components:{
    ChannelDetails
  },
  data () {
    return {    
      // warning dialog
      warningDialog: false,
      warningTitle: null,
      // feedback
      showingFeedback: false,
      feedbackColor: 'error',
      error: null,
      success: null,
      // form
      itemDialog: false,
      currentItem: null,
      // channels data
      items: [],
      // pagination
      numPages: 1,
      numPagesOptions: [5,10,15,20],
      currentPage: 1,
      itemsPerPage: 5,
      itemsCount: null,
      // channel dialog fields
      name: null,
      description: null,
      channelAdmins: [],
      //show channel details dialog
      showItemDetails: false,
      //form-validation
      formValid:false,
    }
  },
  methods: {
    showConfirmDialog(action, title){
        this.warningDialog=true
        this.warningAction=action 
        this.warningTitle=title
    },
    warningAction(){ // function to be ovewritten by the correct action
    },
    closeDialog(){
      this.itemDialog=false     
    },    
    getItemObject(){
      // returns the object with a channel based on the dialog fields
      return {
          name: this.name,
          description: this.academicDegree,
          channelAdmins: this.channelAdmins,          
        }
    },
    openUpdateItemDialog(item){
      // update dialog fields
      this.name=item.name
      this.description=item.description
     
      this.itemDialog=true
      this.currentItem=item
    },
    async updateChannel(){
      
      try{
       
      }catch(error){
        this.error=error
      }
    
    },
    async getItems(){      
      try{
        const personId = this.$store.state.user.id;
        this.itemsCount = (await ChannelService.get_admin_channels_count(personId)).data.count
        this.numPages = Math.ceil(this.itemsCount / this.itemsPerPage)
        const from = (this.currentPage - 1) * this.itemsPerPage
        this.items = (await ChannelService.get_admin_channels_in_range(personId, from, this.itemsPerPage)).data
      }catch(error){
        this.error=error
      }
    },
  },     
  mounted: async function (){
      await this.getItems()
  },
   watch: {
    itemDialog (val) {
      // to clear red fields and form data
      if(val)
        this.$refs.form.reset()
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
    },
    currentPage(val){
      this.getCourses();
    },
    itemsPerPage(val){
      this.getCourses()
    }
  },
}
</script>

<style scoped>


</style>
