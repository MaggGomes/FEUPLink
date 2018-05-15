<template>
  <v-list two-line>
    <post-list :posts="contents"></post-list>
  </v-list>
</template>

<script>
  import PostList from "@/components/elements/PostList"

  export default {
    contents: [],
    data() {
      return {
        contents: null
      };
    }
  }
</script>

<style scoped>

</style>
