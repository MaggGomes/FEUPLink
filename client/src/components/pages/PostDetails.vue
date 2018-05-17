<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title primary-title>
            <div class="mr-3">
              <img class="align-img-center abc" src="https://randomuser.me/api/portraits/men/83.jpg">
            </div>
            <div>
              <p class="post-header-p">John Doe</p>
              <p class="post-header-p" style="color: rgba(104, 104, 104, 0.54)">May 18</p>
            </div>
          </v-card-title>
          <v-card-title>
            <h1 style="font-weight: 600">Um Novo Post</h1>
          </v-card-title>
          <v-card-media class="mb-4" height="300px" src="http://www.gstatic.com/webp/gallery/1.jpg">
          </v-card-media>
          <v-card-text>
            <div>
              <!--<h3 class="headline mb-0">{{post.title}}</h3>
              <div>{{post.description}}</div>
              <div v-html="post.text"></div>-->
              <div><p>Lorem ipsum dolor sit amet, eum te ubique forensibus. Ne usu quas senserit. Liber oratio definitionem quo ne, an eam omnes soluta. Vim quas voluptua cu, has no denique oporteat deseruisse, vis praesent scripserit ei. Liber aliquam in vix. Accusam interesset dissentiunt pro ex, eos cu appellantur accommodare.

                Ne mel oportere consequat, pro aeterno apeirian contentiones ei, consul adipisci has cu. Civibus imperdiet qui ex, officiis vituperata cu duo. Viris ceteros erroribus mea et. Pro an veri omnium invidunt, sed ad omnis mollis scriptorem, ex deleniti facilisi eum. Per laoreet sapientem accusamus ea.

                Ne graece utamur mea, ei mutat labitur has. Sonet maluisset est ea. Suscipit vulputate ea per, est ad inimicus interesset inciderint. Vel in corpora quaerendum, te suas populo aliquip has. An est vivendum elaboraret.

                An eum probo ornatus insolens, mandamus qualisque temporibus cum in. His id ubique intellegat, legere meliore petentium per ea. Nibh officiis eam no, aperiam vituperatoribus in sea, pro habeo voluptatibus at. Sed invidunt legendos ei, ut eum tempor partiendo. Ludus clita postulant et sit.

                In quas aliquip omittantur pro, qui vivendo recusabo te, patrioque consequuntur concludaturque his cu. Ei legere fastidii mei. Doctus honestatis referrentur ea pro, no nostro commodo vim, et his quando propriae. Et pri unum complectitur, brute quando disputationi eu eum. Vim ea sapientem forensibus elaboraret, ea eum novum saepe pertinacia.</p></div>
            </div>
            <div>
              <v-chip color="primary" text-color="white">University</v-chip>
              <v-chip color="primary" text-color="white">Engineering</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import defaultPostImg from "@/assets/defaultPostImage.png";
import defaultUserImg from "@/assets/defaultUser.jpg";
import FeedService from '@/services/FeedService'

export default {

  data() {
    return {
			defaultPostImg: defaultPostImg,
      defaultUserImg: defaultUserImg,
			post: {},
      item: 'Porto'
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
  .post-header-p {
    margin-bottom: 0;
  }
  .abc {
    -webkit-box-shadow: 0px 4px 5px 0px rgba(212,212,212,1);
    -moz-box-shadow: 0px 4px 5px 0px rgba(212,212,212,1);
    box-shadow: 0px 4px 5px 0px rgba(212,212,212,1);
    padding: 2px;
    border-radius: 50%;
    width: 60px;
  }
</style>
