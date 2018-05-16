<template>
    <v-list class="feed-content" two-line>
        <post-list :posts="contents"></post-list>
    </v-list>
</template>

<script>
  import FeedService from '@/services/FeedService'
  import PostList from "@/components/elements/PostList";

  export default {
    name: "nav_tab_1",

    components: {
      PostList
    },

    contents: [],
    data() {
      return {
        contents: null
      };
    },
    mounted: async function() {

      try{
        this.contents = (await FeedService.get_posts_by_person (this.$store.state.user.id)).data;

      }catch(error){

      }
    }
  }
</script>

<style scoped>

</style>

