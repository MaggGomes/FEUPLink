<template>
  <div>
    <v-card v-if="contents.length === 0" height="30em">
      <v-card-text>
        <v-layout row style="margin-left: 3.5em; margin-top: -0.6em;">
          <v-flex xs12 md6>
            <!-- @keyup.enter.native  maybe use this event-->
            <v-text-field autofocus append-icon="search" v-model="postSearch" @input="updateContent" label="Search for Post's"></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <no-posts></no-posts>
    </v-card>
    <v-list v-else class="feed-content" two-line>
      <v-list-tile style="margin-left: 3.5em;">
        <v-layout row>
          <v-flex xs12 md6>
            <!-- @keyup.enter.native  maybe use this event-->
            <v-text-field autofocus append-icon="search" v-model="postSearch" @input="updateContent" label="Search for Post's"></v-text-field>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <post-list :posts="contents"></post-list>
    </v-list>
  </div>
</template>

<script>
  import FeedService from '@/services/FeedService'
  import PostList from '@/components/elements/PostList'
  import NoPosts from '@/components/elements/NoPosts'

  export default {
    name: "nav_tab_2",

    components: {
      PostList,
      NoPosts
    },

    data() {
      return {
        contents: [],
        postSearch: ''
      };
    },

    mounted: async function() {
      try{
        this.contents = this.updateContent()

      }catch(error){

      }
    },

    methods: {
      async updateContent () {
        let searchString = ''
        this.postSearch === '' ? searchString = '_' : searchString = this.postSearch
        this.contents = (await FeedService.get_posts_by_person_and_type(this.$store.state.user.id, 'Event', searchString)).data;
      }
    }
  }
</script>

<style scoped>

</style>

