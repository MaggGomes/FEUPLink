	<template>
		<div  >
			<div class="text-lg-center text-md-center text-sm-center" id="carousel_homepage" >
				<v-carousel prev-icon="fas fa-caret-left " next-icon="fas fa-caret-right"  >
					<v-carousel-item style="height: 100%"
					v-for="(item,i) in items"
					:src="item.src"
					:key="i"
					transition="fade"
					reverse-transition="fade"
					>
				</v-carousel-item>
			</v-carousel>
			<p>The FEUPLink community encompasses all those who are part of this huge family that is FEUP, from current and former students to teachers and collaborators. <a href="...">Join us!</a></p>
		</div>






<div>
    <v-layout column justify-center align-center>
    </v-layout>
    <v-container
      style="max-height: 400px"
      class="scroll-y"
      id="scroll-target"
    >
    <v-list two-line >
			<v-list-tile style="height: 50px; margin-bottom: 50px; " ripple avatar v-for="content in contents" :key="content.title">
				<v-layout >
					<v-flex xs12  >
						<v-card style="background-color: lightgrey; ">

							<v-card-title primary-title>
								<div style="margin-top: -18px;">
									<h3 class="headline mb-0">{{content.title}}</h3>
									<div class="description">{{content.description}}</div>
								</div>
							</v-card-title>
							<v-card-actions>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-list-tile>
		</v-list>


      <v-layout
        column
        align-center
        justify-center
        v-scroll:#scroll-target="onScroll"
        style="height: 10px"
      >

      </v-layout>
    </v-container>
  </div>




		



	</div>







</template>

<script>

	import FeedService from '@/services/FeedService'

	import homepage_1 from '@/assets/homepage_1.jpg'
	import homepage_2 from '@/assets/homepage_2.jpg'
	import homepage_3 from '@/assets/homepage_3.jpg' 

	export default {
		name: 'Homepage',
		//contents: [],
		data () {
			return {
				contents: [
				{title: 'News 1',date: '12-2-2018' , description: 'Mauris hendrerit tristique mi. Praesent tristique nulla nisi, vitae viverra enim gravida laoreet. Donec condimentum lacus volutpat, laoreet sapien in, congue nunc. Vestibulum commodo suscipit nisi. Proin suscipit diam ac nibh lobortis viverra. Cras placerat pulvinar nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},

				{title: 'News 2',date: '31-7-2018', description: 'Pellentesque semper tempor pulvinar. Curabitur sollicitudin luctus sapien, at ultrices arcu pellentesque sit amet. Pellentesque vitae justo interdum, mollis quam vel, eleifend orci. Aliquam cursus turpis mi, ac ultrices orci lacinia vel. Suspendisse bibendum tellus in dui mattis condimentum non non lectus. Nullam pellentesque, lorem in tristique auctor, metus urna maximus velit, ac tempus nunc lacus vitae ligula. Vestibulum consequat velit vitae cursus pretium.'},

				{title: 'News 3',date: '3-9-2018', description: 'Vivamus eleifend metus semper risus eleifend eleifend. In tristique vel magna eget scelerisque. Cras quis venenatis augue. Nulla facilisi. Sed in feugiat mi, in pretium ante.'},

				{title: 'News 4',date: '8-12-2020', description: 'Integer pulvinar sem a vulputate interdum. Duis in lorem mi. Nullam eu odio sit amet nibh aliquet posuere eget vitae nulla. Integer congue auctor risus, sit amet placerat risus blandit in.'},

				{title: 'News 5',date: '30-5-2018', description: 'Donec bibendum hendrerit velit, ac maximus ex mattis id. In luctus est nec sodales pretium. Nulla bibendum nisi quis mauris tempus, id vulputate turpis venenatis. Nullam eu libero imperdiet, mattis magna in, sollicitudin nisi. Nullam auctor ipsum orci. Sed ac ex erat.'},

				],
				items: [
				{
					src: homepage_1
				},
				{
					src: homepage_2
				},
				{
					src: homepage_3
				}

				],

			}
		},
		/*mounted: async function() {
			try{
				this.contents = (await FeedService.get_posts_by_type('New')).data;

			}catch(error){

			}
		}*/
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#carousel_homepage div.carousel__controls{
	background-color: transparent !important;
}
#carousel_homepage{
	max-width: 100%;
}
p{
	margin-top:10px;
	margin-bottom: 40px;
}
p>a{
	text-decoration: none;
	color:red;
}

.description{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 1000px;
}



</style>

