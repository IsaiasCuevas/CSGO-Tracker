<template>
  <section class="search">
    <h1>Track Player Stats</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="id">Steam ID</label>
        <input type="text" name="text" id="id" v-model="steamid" placeholder="Steam ID" />
      </div>
      <div class="form-group">
        <input type="submit" value="Submit" class="btn" />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      steamid: ""
    };
  },
  beforeCreate() {
    document.body.className = "body-bg-image";
  },
  methods: {
    onSubmit() {
      if (!this.steamid) {
        this.$toasted.show("Please enter a steam id", {
          duration: 2000,
          icon: "exclamation-circle"
        });
      } else {
        this.$router.push(`profile/${this.steamid}`);
      }
    }
  }
};
</script>

<style>
</style>