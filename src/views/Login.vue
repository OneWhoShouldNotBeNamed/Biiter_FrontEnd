<template>
  <div>
    <h1>Login</h1>
    <div>
      <input type="text" v-model="email" placeholder="email">
      <br>
      <input type="password" v-model="password" placeholder="password">
      <br>
      <button @click="doLogin">Login</button>
      <router-link to="/register">
        <a>Dont have an account?</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { LOGIN_URI } from "@/common/config";
import { post } from "@/common/api.service";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async doLogin() {
      const payload = {
        email: this.email,
        password: this.password
      };
      try {
        const resp = await post(LOGIN_URI, payload);
       // console.log(resp.data.data)
        if (resp && resp.data.msg) {
          // set token and redirect
          localStorage.setItem("usertoken", resp.data.data);
          //.consolelog(resp.data.data)
          this.$router.push("/");
        } else {
          alert(resp.data.msg);
        }
        return;
      } catch (e) {
        console.log("exception -> ", e);
        return
      }
    }
  }
}
</script>

<style scoped>
</style>
