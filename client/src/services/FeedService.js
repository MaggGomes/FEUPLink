import Api from '@/services/Api'

export default {
  create_post(postInfo) {
    return Api().post('post', postInfo)
  },
  update_post(postInfo) {
    return Api().put('post', postInfo)
  },
  delete_post (postId) {
    return Api().delete('post', postId)
  },
  get_all_posts () {
    return Api().get('post/')
  },
  get_posts_by_type (postType) {
    return Api().get('post/'+postType)
  }
}
