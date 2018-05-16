<template>
    <div>
		<v-list-tile ripple avatar v-for="post in posts" :key="post.title" route :to="'/post/' + post.id">
			<v-list-tile-avatar>
					<img :src="post.title">
			</v-list-tile-avatar>
			<v-list-tile-content>
					<v-list-tile-title v-html="post.title"></v-list-tile-title>
					<v-list-tile-sub-title v-html="post.description"></v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
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
    posts: {
      type: Array,
      default: []
    }
	}
};
</script>

<style scopped>
</style>
