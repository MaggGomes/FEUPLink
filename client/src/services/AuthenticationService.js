import Api from '@/services/Api'

export default {
    signup_student (userInfo) {
        return Api().post('signup_student', userInfo)
    },
    signup_staff (userInfo) {
        return Api().post('signup_staff', userInfo)
    },
    signin (userInfo) {
        return Api().post('signin', userInfo)
    },
    fbsignin (userInfo) {
        return Api().post('fbsignin', userInfo)
    }
}