import Api from '@/services/Api'

export default {
    signup (userInfo) {
        return Api().post('signup', userInfo)
    }
}