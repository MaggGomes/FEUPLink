<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media>
					<img :src="defaultPostImg">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{post.title}}</h3>
            <div>{{post.description}}</div>
						<div>{{post.text}}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import defaultPostImg from "@/assets/defaultPostImage.png";
import FeedService from '@/services/FeedService'

export default {
 
  data() {
    return {
			defaultPostImg: defaultPostImg,
			post: {}
		}
	},
	
	mounted () {
		this.getPost()
	},

	methods: {
		async getPost () {
			try {
				this.post = (await FeedService.get_post_by_id(this.$route.params.id)).data
				console.log(this.post)
			}
			catch (err) {
				console.log(err)
			}
		}
	}
};
</script>

<style scopped>
</style>
