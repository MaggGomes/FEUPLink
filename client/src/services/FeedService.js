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
  // Returns all post from the channels in which a user is enrolled
  get_posts_by_person (personId, postSearch) {
    return Api().get(`/post/person/${personId}/search/${postSearch}`)
  },
  get_posts_by_type (postType) {
    return Api().get('post/'+postType)
  },
  // Returns all post from the channels in which a user is enrolled
  get_posts_by_person_and_type (personId, postType, postSearch) {
    return Api().get(`/post/person/${personId}/type/${postType}/search/${postSearch}`)
  },
  get_post_by_id (postId) {
    return Api().get(`post/${postId}`)
  },
}
