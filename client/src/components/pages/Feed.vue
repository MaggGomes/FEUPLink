<template>
  <div class="text-lg-center text-md-center text-sm-center">
    <v-card height="410px">
      <v-navigation-drawer permanent absolute v-model="drawer">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://www.w3schools.com/howto/img_avatar.png" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>John Doe</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title" @click="">

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Feed",
  mounted () {
//    if (!this.$store.state.isUserLoggedIn){
//        this.$router.push('/');
//    }
  },
    data () {
        return {
            drawer: true,
            items: [
                { title: 'Feed'},
                { title: 'Events'},
                { title: 'Job opportunities'},
                { title: 'Newsletter'},
                { title: 'News'},
                { title: 'Education'}
            ],
            right: [

            ]
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
