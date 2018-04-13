import Api from '@/services/Api'

export default {
    signup (userInfo) {
        return Api().post('signup_student', userInfo)
    },
    signup_facebook (userInfo) {
        return Api().post('signup_facebook', userInfo)
    },
    signin (userInfo) {
        return Api().post('signin', userInfo)
    },
}