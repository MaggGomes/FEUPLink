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
    insertExperience (userInfo) {
        return Api().post('create_job', userInfo)
    },
    insertCourseStudent (userInfo) {
        return Api().post('create_course_student', userInfo)
    },
    updateJobExperience (userInfo) {
        return Api().post('update_job', userInfo)
    },
    updateCourseStudent (userInfo) {
        return Api().post('update_course_student', userInfo)
    },
    deleteJobExperience (userInfo) {
        return Api().post('delete_job', userInfo)
    },
    deleteCourseStudent (userInfo) {
        return Api().post('delete_course_student', userInfo)
    },
    updatePerson (personInfo) {
        return Api().post('update_person', personInfo)
    },
    updateExperienceVisibility (userInfo) {
        return Api().post('update_experience_visibility', userInfo)
    },
}