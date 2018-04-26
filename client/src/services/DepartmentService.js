import Api from '@/services/Api'

export default {
    create_department (departmentInfo) {
        return Api().post('create_department', departmentInfo)
    },
    update_department (departmentInfo) {
        return Api().put('update_department', departmentInfo)
    },
    delete_department (departmentId) {
        return Api().delete('delete_department',  { 
            data: {
                departmentId: departmentId,
            }
        })
    },
    list_all_departments () {
        return Api().get('list_all_departments')
    }
}