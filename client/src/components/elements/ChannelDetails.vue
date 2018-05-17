<template>
  <v-container fluid>
    <v-layout v-if="channel !== null" row wrap>
      <v-flex xs12>
        <v-tabs v-model="active" color="red darken-4" dark slider-color="white">
          <v-tab ripple>
            {{$t('channel_details')}}
          </v-tab>
          <v-tab ripple>
            {{$t('channel_members')}}
          </v-tab>
          <v-tab ripple>
            {{$t('channel_admin')}}
          </v-tab>

          <!-- details -->
          <v-tab-item style="height: 400px;">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex class="subheading" xs4 mt-2>{{$t('name')}}</v-flex>
                  <v-flex xs8 mt-2>{{channel.name}}</v-flex>

                  <v-flex class="subheading" xs4 mt-2>{{$t('description')}}</v-flex>
                  <v-flex xs8 mt-2>{{channel.description}}</v-flex>

                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- members -->
          <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content  v-for="person in channel.People" :key="person.id">
                <div slot="header">
                  {{person.name}} 
                    <v-spacer> </v-spacer>    
                  {{person.gender}}
                </div>
                <v-card class="grey lighten-3">                
                  <v-card-text>
                    <v-layout row wrap>
                                   
                                
                    </v-layout>
                  </v-card-text>        
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn flat color="red darken-4" router :to="`/profile/${person.id}`"> {{$t('see_profile')}} </v-btn>          
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>

          <!-- admin -->
         <v-tab-item style="height: 400px;">
            <v-expansion-panel>
              <v-expansion-panel-content  v-for="person in channel.People" :key="person.id" v-if="person.ChannelMembers.isAdmin">
                <div slot="header">
                  {{person.name}} 
                    <v-spacer> </v-spacer>    
                  {{person.gender}}
                </div>
                <v-card class="grey lighten-3">                
                  <v-card-text>
                    <v-layout row wrap>
                                   
                                
                    </v-layout>
                  </v-card-text>        
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn flat color="red darken-4" router :to="`/profile/${person.id}`"> {{$t('see_profile')}} </v-btn>          
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>

        </v-tabs>

      </v-flex>
    </v-layout>
  </v-container>
</template>




<script>

export default {
  data () {
      return {
        active: null,
      }
  },
  props: {
    channel: {
      type: Object
    }
  },
}
</script>


