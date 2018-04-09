<template>
  <v-app>
    <div class="text-lg-center text-md-center text-sm-center" id="carousel_homepage">
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
  </v-app>
</template>

<script>
export default {
    name: 'Homepage',
    data () {
        return {
            items: [
                {
                    src: 'https://paginas.fe.up.pt/~feuplink/wp-content/uploads/2016/09/01.jpg'
                },
                {
                    src: 'https://paginas.fe.up.pt/~feuplink/wp-content/uploads/2017/10/1975.jpg'
                },
                {
                    src: 'https://paginas.fe.up.pt/~feuplink/wp-content/uploads/2016/07/01_Af.jpg'
                }

            ]
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #carousel_homepage div.carousel__controls{
        background-color: transparent!important;
    }
    div ::before{
        
    }
    #carousel_homepage{
       height: 1000px;
    }
    p{
       margin-top:10px;
       margin-bottom: 10px;
    }
    p>a{
       text-decoration: none;
        color:red;
    }
</style>

