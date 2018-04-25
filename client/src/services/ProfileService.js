import Api from '@/services/Api'

export default {
    getTypeOfPerson (userInfo) {
        return Api().get('getTypeOfPerson', {params:  userInfo});
    },
    getStudentInformation (userInfo) {
        return Api().get('getStudent', {params:  userInfo});
    },
    getStaffInformation (userInfo) {
        return Api().get('getStaff', {params:  userInfo});
    },
}