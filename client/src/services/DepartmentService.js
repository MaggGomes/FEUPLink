import Api from '@/services/Api'

export default {
    create_department (departmentInfo) {
        return Api().post('create_department', departmentInfo)
    },
    update_department (departmentInfo) {
        return Api().post('update_department', departmentInfo)
    },
    delete_department (departmentId) {
        return Api().post('delete_department', departmentId)
    },
    list_all_departments () {
        return Api().get('list_all_departments')
    }
}