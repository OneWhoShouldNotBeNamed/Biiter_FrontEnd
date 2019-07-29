<template>
  <form v-on:submit.prevent="addbeat">
    <h1 class>Add Beats</h1>
    <label for="Beat"></label>
    <input
      type="text"
      v-model="beat"
      class="form-control"
      name="beat"
      placeholder="Beat it!!! Just Beat it!!!"
    >
    <button type="submit" class="btn btn-lg btn-primary btn-block">Beat it!</button>
  </form>
</template>
<script>
/* eslint-disable */

export default {
  name: 'postbeat',
  data() {
    return{
        beat: null
    // uid:'',
    //CreatedAt:Date.now
    }
    
  },

  methods: {
    addbeat() {
      // console.log(this)
      this.$emit("add_beat", this.beat);
    }
  }
};
</script>
