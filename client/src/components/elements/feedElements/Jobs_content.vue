<template>
  <div>
    <v-card v-if="contents.length === 0" height="30em">
      <no-posts></no-posts>
    </v-card>
    <v-list v-else class="feed-content" two-line>
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
        contents: null
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

