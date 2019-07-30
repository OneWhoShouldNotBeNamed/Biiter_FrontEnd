<template>
<div>
   <srchusr @search_user="search"></srchusr>
   <div class="user-list" v-if="users">
     <!-- <p>{{users[0].id}}</p> -->
   <ViewUsers v-for="user in users" :key="user['id']" :user="user" @follow_user="follow_user" ></ViewUsers>
  </div>
</div>
</template>
<script>
/* eslint-disable */
import { get } from "@/common/api.service";
import { post } from "@/common/api.service";
import { SEARCH_URI } from "@/common/config";
import { FOLLOW_URI } from "@/common/config";
import srchusr from "@/components/SearchUser.vue";
import ViewUsers from "@/components/ViewUsers.vue";

import jwt from "jwt-decode";
let jwtKey = "secretk3y";

export default {
  name: "SearchFollow",
  components: {
    srchusr,
    ViewUsers
  },
  data() {
    return {
      users:null,
      user: null
    };
  },
  methods:{
    async beforeCreate() {
      //console.log(localStorage.getItem('usertoken'))
      if (!localStorage.getItem("usertoken")||localStorage.getItem("usertoken")=='undifined') {
        this.$router.push("Login");
      }
      let auth_id = localStorage.getItem("usertoken").split(" ")[1];
      console.log(auth_id, jwtKey);
      if (!jwt.verify(auth_id, jwtKey)) {
        this.$router.push("Login");
      }
    },
    async search(user) {
      await get(SEARCH_URI, `${user}`)
        .then(res => {
          console.log(res.data.data);
          this.users=res.data.data;
          //this.$router.push({ name: "AddBeats" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async follow_user(id) {
      console.log(id)
      await post(FOLLOW_URI, {
        id:id,
        uid: jwt(localStorage.getItem("usertoken")).id
      })
        .then(res => {
          console.log(res);
          // this.$router.push({ name: "AddBeats" });
        })
        .catch(err => {
          console.log(err);
        });
    },

  }
}
</script>