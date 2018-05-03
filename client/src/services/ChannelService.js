import Api from '@/services/Api'

export default {
    list_channels_in_range (from, numInstances) {
        return Api().get(`list_channels_in_range/${from}-${numInstances}`)
    },
    get_channels_count () {
        return Api().get('count_channels')
    }
}