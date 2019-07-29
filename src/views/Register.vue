<template>
    <div>
        <h1>Register</h1>
        <div>
            <input type="text" v-model="name" placeholder="Name"/>
            <br>
            <input type="email" v-model="email" placeholder="Email"/>
            <br>
            <input type="password" v-model="password" placeholder="Password"/>
            <br>
            <button @click="doRegister">Register</button>
            <router-link to="/login">
                <a>Already registered?</a>
            </router-link>
        </div>
    </div>
</template>

<script>
import { REGISTER_URI } from '@/common/config';
import { post } from '@/common/api.service';

export default {
    name: 'register',
    data() {
        return {
            name: '',
            password: '',
            email:''
        }
    },
    methods: {
        async doRegister() {
            const payload = {
                name: this.name,
                email:this.email,
                password: this.password
            }
            try {
                const resp = await post(REGISTER_URI, payload)
                if (resp) {
                    alert(resp.data.msg)
                    this.$router.push('/login')
                } else {
                    console.log(resp)
                    alert(resp.data.error.detail);
                }
                return;
            } catch (e) {
                console.log('exception -> ',e)
                return;
            }
        }
    }
}
</script>

<style scoped>

</style>
