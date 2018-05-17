<template>
  <div>
    <v-card v-if="contents.length === 0" height="30em">
      <no-posts></no-posts>
    </v-card>
    <v-list two-line>
      <post-list :posts="contents"></post-list>
    </v-list>
  </div>
</template>

<script>
  import PostList from '@/components/elements/PostList'
  import NoPosts from '@/components/elements/NoPosts'

  export default {
    
    components: {
      PostList,
      NoPosts
    },

    data() {
      return {
        contents: null
      };
    }
  }
</script>

<style scoped>

</style>
