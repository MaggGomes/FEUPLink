<template>
  <div>
		<template v-for="(post, index) in posts">
			<v-divider v-if="index !== 0" :key="index" inset></v-divider>
			<v-list-tile ripple avatar :key="post.title" route :to="'/post/' + post.id">
				<v-list-tile-avatar>
						<img :src="defaultPostImg" width="40px" height="40px">
				</v-list-tile-avatar>
				<v-list-tile-content>
						<v-list-tile-title>{{post.title}}</v-list-tile-title>
						<v-list-tile-sub-title>{{post.description}}</v-list-tile-sub-title>
				</v-list-tile-content>
			</v-list-tile>
		</template>
	</div>
</template>

<script>
import defaultPostImg from "@/assets/defaultPostImage.png";

export default {

  data() {
    return {
      defaultPostImg: defaultPostImg
		}
	},

	props: {
		posts: Array
	}
};
</script>

<style scopped>
</style>
