<template>
  <section>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-if="error">
       <h3>
        {{error}}
        <br />Please make sure your steam profile is public to use this website.
        <br />Currently you must use your "steamID64" to get stats!
      </h3>
      <router-link to="/">Go Back</router-link>
    </div>
    <div v-if="profileData" class="container">
      <h1 class="steamname">
        <img :src="profileData.platformInfo.avatarUrl" alt class="steam-profile-picture" />
        {{profileData.platformInfo.platformUserHandle}}
      </h1>
      <div class="grid">
        <ul>
          <li>
            <h2>{{profileData.segments[0].stats.headshotPct.displayName}}</h2>
            <h3>{{profileData.segments[0].stats.headshotPct.displayValue}}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <h2>{{profileData.segments[0].stats.damage.displayName}}</h2>
            <h3>{{profileData.segments[0].stats.damage.displayValue}}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <h2>{{profileData.segments[0].stats.wlPercentage.displayName}}</h2>
            <h3>{{profileData.segments[0].stats.wlPercentage.displayValue}}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <h2>{{profileData.segments[0].stats.kd.displayName}}</h2>
            <h3>{{profileData.segments[0].stats.kd.displayValue}}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <h2>{{profileData.segments[0].stats.mvp.displayName}}</h2>
            <h3>{{profileData.segments[0].stats.mvp.displayValue}}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <h2>{{profileData.segments[0].stats.wins.displayName}}</h2>
            <h3>{{profileData.segments[0].stats.wins.displayValue}}</h3>
          </li>
        </ul>
      </div>
      <router-link to="/">Go Back</router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      loading: false,
      error: null,
      profileData: null
    };
  },
  beforeCreate() {
    document.body.className = "body-bg-no-image";
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(
        `/api/v1/profile/${this.$route.params.steamid}`
      );

      this.profileData = res.data.data;
      console.log(this.profileData);
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
  }
};
</script>

<style scoped>
.container {
  background: rgb(0, 0, 0, 0.5);
  border-radius: 5%;
  margin: auto;
}
.steamname {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  font-size: auto;
}
.steam-profile-picture {
  border-radius: 50%;
  margin: 5%;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(48, 48, 48, 0.5);
  margin: 5%;
}
ul {
  padding: 10px;
  margin: 10px;
  background: rgba(102, 102, 102, 0.5);
  border-radius: 5%;
}
</style>
