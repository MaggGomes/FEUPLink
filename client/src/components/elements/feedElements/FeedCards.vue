<template>
  <v-list two-line>
    <v-list-tile ripple avatar v-for="content in contents" :key="content.title">
      <v-list-tile-avatar>
        <img :src="content.title">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="content.title"></v-list-tile-title>
        <v-list-tile-sub-title v-html="content.description"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>

  export default {
    contents: [],
    data() {
      return {
        contents: null
      };
    }
  }
</script>

<style scopped>
  .list {
    background-color: rgba(221, 221, 221, 0.75) ;
    padding: 1px 0;
  }
  .list .list__tile{
    background-color: rgba(188, 188, 188, 0.75) ;
    margin:10px;
  }
</style>
