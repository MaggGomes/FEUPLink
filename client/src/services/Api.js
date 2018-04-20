import axios from 'axios'
import store from '@/store/store'


let baseURL;

if(process.env.NODE_ENV === 'https'){
    baseURL = 'https://82e2df57.ngrok.io'
}
else if(process.env.NODE_ENV !== 'production'){
    baseURL = 'http://localhost:8081/'
}
else {
    baseURL = 'https://feup-link-dev-api.herokuapp.com/'
}

export default () => {
    return axios.create({
        baseURL: baseURL,
        timeout: 500,
        headers: {auth: store.state.token},
    })
}