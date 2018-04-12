import Api from '@/services/Api'

export default {
    signup (userInfo) {
        return Api().post('signup_student', userInfo)
    },
    signin (userInfo) {
        return Api().post('signin', userInfo)
    },
    fbsignin (userInfo) {
        return Api().post('fbsignin', userInfo)
    }
}