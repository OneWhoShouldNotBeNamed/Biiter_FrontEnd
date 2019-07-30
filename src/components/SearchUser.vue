<template>
    <div>        
    <form v-on:submit.prevent="searchuser">
<h1>Search User</h1>
<input
      type="text"
      v-model="user"
      class="form-control"
      name="user"
      placeholder="Search User!!!!!">
    <button type="submit" class="btn btn-lg btn-primary btn-block">Search</button>
  </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'srchusr',
  data() {
    return{
        user: null
    }   
  },
  methods: {
    searchuser() {
      // console.log(this)
      this.$emit("search_user", this.user);
    }
  }
};
</script>
