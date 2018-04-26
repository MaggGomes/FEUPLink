import Api from '@/services/Api'

export default {
    signup_student (userInfo) {
        return Api().post('signup_student', userInfo)
    },
    signup_facebook (userInfo) {
        return Api().post('signup_facebook', userInfo)
    },
    signup_linkedin (userInfo) {
        return Api().post('signup_linkedin', userInfo)
    },
    continue_signup_linkedin (userInfo) {
        return Api().post('continue_signup_linkedin', userInfo)
    },
    continue_signup_facebook (userInfo) {
        return Api().post('continue_signup_facebook', userInfo)
    },
    signup_staff (userInfo) {
        return Api().post('signup_staff', userInfo)
    },
    signin (userInfo) {
        return Api().post('signin', userInfo)
    },
}