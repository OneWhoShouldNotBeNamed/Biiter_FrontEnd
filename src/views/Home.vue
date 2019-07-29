<template>
  <div>
    <AddBeat @add_beat="addbeat"></AddBeat>
    <div class="beet-list" v-if="beets">
      <Beet
        v-for="beet in beets"
        :key="beet.id"
        :beet="beet"
        @Like="handleLikeBeet"
        @DisLike="handleDislikeBeet"
      ></Beet>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import { BEATS_URI } from "@/common/config";
import { POSTBEATS_URI } from "@/common/config";
import { LIKEBEATS_URI } from "@/common/config";
import { DISLIKEBEATS_URI } from "@/common/config";
import { get } from "@/common/api.service";
import { post } from "@/common/api.service";
import Beet from "@/components/Beet.vue";
import AddBeat from "@/components/AddBeats.vue";

import jwt from "jwt-decode";
let jwtKey = "secretk3y";

export default {
  name: "home",
  components: {
    Beet,
    AddBeat
  },
  data() {
    return {
      beets: null,
      beat: null
    };
  },
  async mounted() {
    await this.getAllBeets();
  },
  methods: {
    async getAllBeets() {
      try {
        const data = await get(BEATS_URI);
        console.log(data.data.data);
        if (data) {
          this.beets = data.data.data;
          console.log(this.beets);
        } else {
          alert("No Beats Found");
        }
        return;
      } catch (e) {
        console.log("exp -> ", e);
        return;
      }
    },

    async addbeat(beat) {
      await post(POSTBEATS_URI, {
        beat: beat,
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

    //Like Beat

    async handleLikeBeet(params) {
      //console.log('Like'+params);
      await post(LIKEBEATS_URI, {
        beat: params,
        uid: jwt(localStorage.getItem("usertoken")).id,
        sts:'Like'
      })
        .then(res => {
          console.log(res);
          // this.$router.push({ name: "AddBeats" });
        })
        .catch(err => {
          console.log(err);
        });
    },
  

  //Dislike Beat

  async handleDislikeBeet(params) {
    await post(LIKEBEATS_URI, {
        beat: params,
        uid: jwt(localStorage.getItem("usertoken")).id,
        sts:'Dislike'
      })
        .then(res => {
          console.log(res);
          // this.$router.push({ name: "AddBeats" });
        })
        .catch(err => {
          console.log(err);
        });
  },
  async beforeCreate() {
    //console.log(localStorage.getItem('usertoken'))
    if (
      !localStorage.getItem("usertoken") ||
      localStorage.getItem("usertoken") == "undifined"
    ) {
      this.$router.push("Login");
    }
    let auth_id = localStorage.getItem("usertoken").split(" ")[1];
    console.log(auth_id, jwtKey);
    if (!jwt.verify(auth_id, jwtKey)) {
      this.$router.push("Login");
    }
  }
}};
</script>
