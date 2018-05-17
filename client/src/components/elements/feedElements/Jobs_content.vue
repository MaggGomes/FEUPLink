<template>
  <div>
    <v-card v-if="contents.length === 0" height="30em">
      <no-posts></no-posts>
    </v-card>
    <v-list v-else class="feed-content" two-line>
      <v-list-tile style="margin-left: 3.5em;">
        <v-layout row>
          <v-flex xs6>
            <v-text-field append-icon="search" v-model="postSearch" label="Search for Post's"></v-text-field>
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
    name: "nav_tab_3",
    
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
        this.contents = (await FeedService.get_posts_by_person_and_type(this.$store.state.user.id, 'Job')).data;

      }catch(error){

      }
    }
  }
</script>

<style scoped>

</style>

