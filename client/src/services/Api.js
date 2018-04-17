import axios from 'axios'

let baseURL;

if(process.env.NODE_ENV !== 'production'){
    baseURL = 'http://localhost:8081'
}
else {
    baseURL = 'https://feup-link-dev-api.herokuapp.com/'
}

export default () => {
    return axios.create({
        baseURL: baseURL
    })
}