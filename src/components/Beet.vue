<template>
    <div class="beet" >
        <p>{{ beet.id }}</p>
        <p>{{ beet.beat }}</p>
        <font-awesome-icon icon="thumbs-up" @click="Like(beet.id)"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <font-awesome-icon icon="thumbs-down" @click="Unlike(beet.id)"/>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faThumbsUp)
library.add(faThumbsDown)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

export default {
    name: 'Beet',
    props: {
        User:null,
        beet:null
    },
    methods: {
        Like(id) {
            this.$emit('Like', id);
        },
        Unlike(id){
            this.$emit('DisLike',id)
        }
        
    }    
}
</script>

<style scoped>
    .beet{
        border: 1px solid black;
    }
</style>

