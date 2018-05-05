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
        <v-btn flat dark @click="showingFeedback=false"> <p v-lang.close></p> </v-btn>
      </v-snackbar>

      <!-- warning dialog -->
      <v-dialog v-model="warningDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline"><p v-lang.warning></p></v-card-title>
          <v-card-text>
            {{warningTitle}}
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="red" @click="warningDialog=false"><p v-lang.cancel></p></v-btn>
            <v-spacer> </v-spacer>
            <v-btn flat color="green" @click="() => { warningDialog=false, warningAction() }"><p v-lang.confirm></p></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!-- dialog new channel -->
      <v-dialog v-model="itemDialog" v-if="currentItem !== null" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline"> Update channel information </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValid" ref="form" autocomplete="off">
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-flex xs12 md9>
                    <v-text-field label="Channel name" hint="This must be unique" v-model="name" :rules="[v => !!v || 'Channel name is required']"
                      required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="Description" v-model="description" multi-line></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-card class="elevation-0">
                      <v-card-text>
                        <v-card-title>
                          <span class="title"> Channel administrators </span>
                        </v-card-title>
                        <v-layout row wrap>
                          <v-flex xs9>
                            <v-select
                              :items="channelPeople"
                              v-model="newAdminId"
                              item-text="email" 
                              item-value="id"
                              label="Add new Admin"
                              autocomplete
                            ></v-select>
                          </v-flex>

                          <v-flex xs2>
                            <v-btn color="blue darken-1" flat @click.native="() => {
                                    if(newAdminId !== null)
                                      showConfirmDialog(addChannelAdmin, 'Are you sure you want to add a new admin?')
                                }">
                              <v-icon color="green"> add </v-icon>
                            </v-btn>
                          </v-flex>

                          <v-flex xs12>                                       
                            <v-toolbar v-for="person in channelPeople" :key="person.id" v-if="person.ChannelMembers.isAdmin">
                              <v-toolbar-title >{{person.name}}</v-toolbar-title>                             

                              <v-spacer></v-spacer>
                              <v-toolbar-items>                               
                                <v-btn fab flat @click.native="() => {
                                    deleteAdminId=person.id
                                    showConfirmDialog(removeChannelAdmin, `Are you sure you want to delete ${person.name} admin?`)
                                }">
                                  <v-icon> delete </v-icon>
                                </v-btn>
                              </v-toolbar-items>
                            </v-toolbar>
                          </v-flex>

                        </v-layout>
                      </v-card-text>                     
                    </v-card>

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
        <v-card v-if="currentItem !== null">
          <v-card-title class="headline">{{currentItem.name}}</v-card-title>
          <v-card-text>
            <channel-details :channel="currentItem"> </channel-details>
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
            <v-select :items="numPagesOptions" v-model="itemsPerPage" label="Items" class="input-group--focused" item-value="pa"></v-select>
          </v-flex>
        </v-layout>
      </v-flex>



      <v-flex xs12>
        <!-- list of items -->
        <v-toolbar v-for="item in items" :key="item.id">
          <v-toolbar-title class="hidden-sm-and-down">{{item.name}}</v-toolbar-title>
          <v-toolbar-title class="hidden-md-and-up">{{item.id}}</v-toolbar-title>

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
        <v-pagination :length="numPages" v-model="currentPage"></v-pagination>
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
      channelPeople: [],
      newAdminId: null,
      deleteAdminId: null,
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
      this.name = item.name
      this.description = item.description
      this.channelPeople = item.People 
     
      this.itemDialog=true
      this.currentItem=item
    },
    async updateChannelPeople(){
      try{
        let updatedItem = (await ChannelService.get_channel_by_id(this.currentItem.id)).data
        this.channelPeople = updatedItem.People
       }catch(error){
        this.error=error
      }
    },
    async removeChannelAdmin(personId){
      try{     
        this.success = (await ChannelService.remove_channel_admin(this.currentItem.id, this.deleteAdminId)).data
        this.updateChannelPeople()
      }catch(error){
        this.error=error
      }
    },
    async addChannelAdmin(personId){
      try{        
        this.success = (await ChannelService.add_channel_admin(this.currentItem.id, this.newAdminId)).data
        this.updateChannelPeople()
      }catch(error){
        this.error=error
      }
    },
    async updateChannel(){
      try{        
        this.success = (await ChannelService.update_channel(this.currentItem.id, this.name, this.description)).data
        this.closeDialog()
        this.getItems()
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
      (await this.getItems())
  },
   watch: {
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
      this.getItems();
    },
    itemsPerPage(val){
      this.getItems()
    }
  },
}
</script>

<style scoped>


</style>
