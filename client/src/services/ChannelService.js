import Api from '@/services/Api'

export default {
  update_channel (ChannelId, name, description) {
    return Api().put('channel_update', {ChannelId, name, description})
  },
  add_channel_admin (ChannelId, PersonId) {
    return Api().post('add_channel_admin', {ChannelId, PersonId})
  },
  remove_channel_admin (ChannelId, PersonId) {
    return Api().post('remove_channel_admin', {ChannelId, PersonId})
  },
  set_channel_visibility (ChannelId, isVisible) {
    return Api().post('set_channel_visibility', {ChannelId, isVisible})
  },
  get_channel_by_id (ChannelId) {
    return Api().get(`channel_by_id/${ChannelId}`)
  },
  get_admin_channels_in_range (personId, from, numInstances) {
    return Api().get(`list_admin_channels_in_range/${personId}/${from}-${numInstances}`)
  },
  get_admin_channels(personId){
    return Api.get(`list_admin_channels/${personId}`)
  },
  get_admin_channels_count (personId) {
    return Api().get(`num_admin_channels/${personId}`)
  },
  get_enrolled_channels_in_range (personId, from, numInstances) {
    return Api().get(`list_enrolled_channels_in_range/${personId}/${from}-${numInstances}`)
  },
  get_enrolled_channels(personId){
    return Api.get(`list_enrolled_channels/${personId}`)
  },
  get_enrolled_channels_count (personId) {
    return Api().get(`num_enrolled_channels/${personId}`)
  },
  list_channels_in_range (from, numInstances) {
    return Api().get(`list_channels_in_range/${from}-${numInstances}`)
  },
  get_channels_count () {
    return Api().get('count_channels')
  }
}
