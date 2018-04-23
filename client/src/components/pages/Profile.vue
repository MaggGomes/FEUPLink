  <template>
    <v-content>
      <v-container>
      </v-container>







      <v-container>
        <v-label>Experiência:</v-label>
        <v-data-table class="experienceTable"
         :headers="experienceHeaders"
      :items="experiences"
      hide-actions
      item-key="name"
    >

      <template  slot="items" slot-scope="props">
        <tr >
          <td class="td">{{ props.item.company }}</td>
          <td class="td">{{ props.item.cargo }}</td>
          <td class="td">{{ props.item.city }}</td>
          <td class="td">{{ props.item.startYear }}</td>
          <td class="td">{{ props.item.endYear }}</td>
        </tr>
      </template>    
    </v-data-table>
      </v-container>




      <v-container>
        <v-label>Educação:</v-label>
        <v-data-table class="experienceTable"
         :headers="studyHeaders"
      :items="studies"
      hide-actions
      item-key="name"
    >

      <template  slot="items" slot-scope="props">
        <tr >
          <td class="td">{{ props.item.course }}</td>
          <td class="td">{{ props.item.enrollmentDate }}</td>
          <td class="td">{{ props.item.graduationDate }}</td>    
           </tr>
      </template>    
    </v-data-table>
      </v-container>

    </v-content>

  </template>
  <script>

  import Vue from 'vue'
  import AuthenticationService from '@/services/AuthenticationService'  
  import LinkedInButton from '@/components/elements/LinkedInButton'
  import FacebookButton from '@/components/elements/FacebookButton'

  export default {
    name: 'Profile',
     components: {
      LinkedInButton,FacebookButton
    },
    data () {
      return {    
        experienceHeaders: [          
          { text: 'Empresa ', value: 'company' },
          { text: 'Cargo', value: 'cargo' },
          { text: 'Localidade', value: 'city'},
          { text: 'Data de Ínicio', value: 'startYear' },
          { text: 'Data de Fim', value: 'endYear' }
        ],
        experiences: [
        {company:'feup', cargo:'professor', city:'Porto', startYear:'2005', endYear:'2010'},
        {company:'microsoft', cargo:'developer', city:' Lisboa', startYear:'2010', endYear:'2014'}
        ],
        studyHeaders: [          
          { text: 'Curso ', value: 'course' },
          { text: 'Data de ínicio', value: 'enrollmentDate' },
          { text: 'Data de Conclusão', value: 'graduationDate'}
        ],
        studies:[
        {course:'MIEIC', enrollmentDate:'2013', graduationDate:'2018'},
        {course:'MIEEC', enrollmentDate:'2008', graduationDate:'2013'}
        ]
      }
    },
    
    methods: {
      
    }
  }
  </script>

  <style scopped>

  .personalInfo{
    background-color: yellow;
  }

  

  .td{
    border: solid 1px darkgrey; 
    background-color: lightgrey;
    height:30px;
  }




  </style>
