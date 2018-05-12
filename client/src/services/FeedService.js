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
  get_posts_by_person (personId) {
    return Api().get('/post/person/'+personId)
  },
  get_posts_by_type (postType) {
    return Api().get('post/'+postType)
  },
  // Returns all post from the channels in which a user is enrolled
  get_posts_by_person_and_type (personId, postType) {
    return Api().get('/post/person/'+personId+'/type/'+postType)
  },
}
