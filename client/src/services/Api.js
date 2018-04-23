import axios from 'axios'
import store from '@/store/store'


let baseURL;

if(process.env.NODE_ENV !== 'production'){
    baseURL = 'http://localhost:8081'
}
else if(process.env.API_ENV === 'staging') { // checking if deploy env is staging or production
    baseURL = 'https://feup-link-dev-api.herokuapp.com/'
}
else if(process.env.API_ENV === 'production') {
    baseURL = 'https://feup-link-prod-api.herokuapp.com/'
}

export default () => {
    return axios.create({
        baseURL: baseURL,
        headers: {auth: store.state.token},
    })
}