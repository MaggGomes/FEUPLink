<template>
	<v-card-text style="height: 100%; padding-top: 10em;">
    <v-layout row justify-center>
      <v-icon large>close</v-icon>
    </v-layout>
    <v-layout row justify-center style="color: #BDBDBD; font-size: 1.5em;">
      No Content Yet!
    </v-layout>
  </v-card-text>
</template>

<script>
import defaultPostImg from "@/assets/defaultPostImage.png";

export default {

  data() {
    return {
      defaultPostImg: defaultPostImg
		}
	},
};
</script>

<style scopped>
</style>
