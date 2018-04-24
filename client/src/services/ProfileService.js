import Api from '@/services/Api'

export default {
    getTypeOfPerson (userInfo) {
        return Api().get('getTypeOfPerson', userInfo);
    },
    getStudentInformation (userInfo) {
        return Api().get('getStudent', userInfo);
    },
    getStaffInformation (userInfo) {
        return Api().get('getStaff', userInfo);
    },
}