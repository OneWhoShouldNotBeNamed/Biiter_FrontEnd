<template>
    <div class="user" >
        <p>{{ user.id }}</p>
        <!-- <input type="hidden" id="userId" name="userId" v-text={{ user.id }}> -->
        <p>{{ user.name }}</p>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'ViewUsers',
    props: {
        user:null
    },
    // methods: {
    //     Follow(id) {
    //         // console.log(this)
    //         this.$emit('follow_user', id);
    //     }
        
    // }    
}
</script>

<style scoped>
    .user{
        border: 1px solid black;
    }
</style>

