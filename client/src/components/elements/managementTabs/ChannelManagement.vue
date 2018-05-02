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


      <v-flex xs12 pt-4>
        <v-pagination :length="numPages" v-model="currentPage" ></v-pagination>
      </v-flex>

    </v-layout>
  </v-container>
</template>



<script>
import ChannelService from '@/services/ChannelService'


export default {
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
      // pagination
      numPages: 1,
      numPagesOptions: [5,10,15,20],
      currentPage: 1,
      itemsPerPage: 5,
      itemsCount: null,
    }
  },
  methods: {

  },     
  mounted: async function (){
     
  },
   watch: {
   
  },
}
</script>

<style scoped>


</style>
