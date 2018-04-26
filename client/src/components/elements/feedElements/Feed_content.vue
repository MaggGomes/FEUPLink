<template>
    <v-list two-line>
        <v-list-tile ripple avatar v-for="content in contents" :key="content.title" @click="">
            <v-list-tile-avatar>
                <img :src="content.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-html="content.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="content.description"></v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "nav_tab_1",
        data () {
            return {
                contents: [
                    {
                        title: 'Post1',
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                        description: 'Mauris hendrerit tristique mi. Praesent tristique nulla nisi, vitae viverra enim gravida laoreet. Donec condimentum lacus volutpat, laoreet sapien in, congue nunc. Vestibulum commodo suscipit nisi. Proin suscipit diam ac nibh lobortis viverra. Cras placerat pulvinar nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                    },

                    {
                        title: 'Post2',
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                        description: 'Pellentesque semper tempor pulvinar. Curabitur sollicitudin luctus sapien, at ultrices arcu pellentesque sit amet. Pellentesque vitae justo interdum, mollis quam vel, eleifend orci. Aliquam cursus turpis mi, ac ultrices orci lacinia vel. Suspendisse bibendum tellus in dui mattis condimentum non non lectus. Nullam pellentesque, lorem in tristique auctor, metus urna maximus velit, ac tempus nunc lacus vitae ligula. Vestibulum consequat velit vitae cursus pretium.'
                    },

                    {
                        title: 'Post3',
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                        description: 'Vivamus eleifend metus semper risus eleifend eleifend. In tristique vel magna eget scelerisque. Cras quis venenatis augue. Nulla facilisi. Sed in feugiat mi, in pretium ante.'
                    },

                    {
                        title: 'Post4',
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                        description: 'Integer pulvinar sem a vulputate interdum. Duis in lorem mi. Nullam eu odio sit amet nibh aliquet posuere eget vitae nulla. Integer congue auctor risus, sit amet placerat risus blandit in.'
                    },

                    {
                        title: 'Post5',
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                        description: 'Donec bibendum hendrerit velit, ac maximus ex mattis id. In luctus est nec sodales pretium. Nulla bibendum nisi quis mauris tempus, id vulputate turpis venenatis. Nullam eu libero imperdiet, mattis magna in, sollicitudin nisi. Nullam auctor ipsum orci. Sed ac ex erat.'
                    },
                ],
            }
        },
    }
</script>

<style scopped>
    .list {
        background-color: rgba(221, 221, 221, 0.75) ;
        padding: 1px 0px;
    }
    .list .list__tile{
        background-color: rgba(188, 188, 188, 0.75) ;
        margin:10px;
    }
</style>
