<template>
  <v-app>
    <v-app-bar clipped-left dark color="purple darken-3" app>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <a href>
        <img
          style="height: 60px"
          src="./assets/twitch-logo.png"
          class="d-block"
        />
      </a>
    </v-app-bar>

    <v-main class="purple darken-4 background">
      <v-toolbar dark color="purple darken-2">
        <v-btn v-if="$route.name === 'about'" fab text small :to="{name: 'home'}">
          <v-icon> {{'mdi-arrow-left'}} </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title style="text-shadow: 0px 0px 3px"
          >Rank 100 Live Streamers</v-toolbar-title
        >
        <div class="ml-2 mt-1 rec-background-class">
          <div class="rec-class"></div>
        </div>
        <v-spacer></v-spacer>
      </v-toolbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      name: "",
    };
  },
  async created() {},
  methods: {},
};
</script>
<style scoped>
.background {
  background-image: url("./assets/twitch-background-logo.png");
  background-size: cover;
}
.rec-background-class .rec-class {
  background-color: red;
  padding: 5px;
  border-radius: 50%;
  z-index: 1000;
  opacity: 1;
}
.rec-background-class {
  background-color: rgba(255, 0, 0, 0.288);
  padding: 8px;
  /* opacity: 0.5; */
  border-radius: 50%;
  animation-name: rec;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes rec {
  0% {
    /* opacity: 0.5; */
    transform: scale(1);
  }
  50% {
    /* opacity: 1; */
    transform: scale(0.6);
  }
  100% {
    /* opacity: 0.5; */
    transform: scale(1);
  }
}
</style>
