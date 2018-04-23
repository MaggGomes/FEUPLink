import Api from '@/services/Api'

export default {
    create_course (courseInfo) {
        return Api().post('create_course', courseInfo)
    },
    update_course (courseInfo) {
        return Api().post('update_course', courseInfo)
    },
    delete_course (courseId) {
        return Api().post('delete_course', {
          courseId: courseId,
        })
    },
    list_all_courses () {
        return Api().get('list_all_courses')
    }
}