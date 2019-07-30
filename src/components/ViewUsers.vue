<template>
    <div class="user" >
        <p>{{ user.id }}</p>
        <!-- <input type="hidden" id="userId" name="userId" v-text={{ user.id }}> -->
        <p>{{ user.name }}</p>
        <button @click ="Follow(user.id)">Follow</button>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'ViewUsers',
    props: {
        user:null
    },
    methods: {
        Follow(id) {
            // console.log(id)
            this.$emit('follow_user', id);
        }
        
    }    
}
</script>

<style scoped>
    .user{
        border: 1px solid black;
    }
</style>

