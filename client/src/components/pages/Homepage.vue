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
        <p v-lang.close><a href="...">Join us!</a></p>
    </div>
  </v-app>
</template>

<script>

import homepage_1 from '@/assets/homepage_1.jpg'
import homepage_2 from '@/assets/homepage_2.jpg'
import homepage_3 from '@/assets/homepage_3.jpg' 

export default {
    messages:{
        en:{
            motivation: 'The FEUPLink community encompasses all those who are part of this huge family that is FEUP, from current and former students to teachers and collaborators.',
        },
        pt:{
            motivation: 'A comunidade FEUPLink abrange toda a gente, desde atuais ou antigos alunos a professores e colaboradores.',
        },
    },
    name: 'Homepage',
    data () {
        return {
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

            ]
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #carousel_homepage div.carousel__controls{
        background-color: transparent !important;
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

