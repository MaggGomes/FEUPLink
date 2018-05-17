<template>
  <div>
    <v-card v-if="contents.length === 0" height="30em">
      <no-posts></no-posts>
    </v-card>
    <v-list v-else two-line>
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
  import PostList from '@/components/elements/PostList'
  import NoPosts from '@/components/elements/NoPosts'

  export default {
    
    components: {
      PostList,
      NoPosts
    },

    data() {
      return {
        contents: [],
        postSearch: ''
      };
    }
  }
</script>

<style scoped>

</style>
