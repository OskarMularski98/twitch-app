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
      <v-spacer></v-spacer>
      <v-btn v-if="getUser.isLoggedIn" text class="button">
        {{ getUser.userName }}
      </v-btn>
      <v-btn v-if="!getUser.isLoggedIn" @click="signIn" text class="button"
        ><v-icon class="mr-2"> {{ "mdi-account" }} </v-icon> Sign In</v-btn
      >
      <v-btn @click="singOut" v-else text class="button">
        <v-icon class="mr-2"> {{ "mdi-account-arrow-left " }} </v-icon> Sign Out
      </v-btn>
    </v-app-bar>

    <v-main class="purple darken-4 background">
      <v-toolbar dark color="purple darken-2">
        <v-btn
          v-if="buttonRoutes.includes($route.name)"
          @click="checkRoute"
          fab
          text
          small
        >
          <v-icon> {{ "mdi-arrow-left" }} </v-icon>
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
      <v-alert
        v-if="$store.getters['moduleUI/getAlert'].isActive"
        :icon="$store.getters['moduleUI/getAlert'].icon"
        :type="$store.getters['moduleUI/getAlert'].type"
        tile
        :color="$store.getters['moduleUI/getAlert'].color"
      >
        {{ $store.getters["moduleUI/getAlert"].text }}
      </v-alert>
      <router-view
        v-if="!$store.getters['moduleUI/getAlert'].isActive"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      name: "",
      buttonRoutes: ["about", "signIn"],
    };
  },
  async created() {},
  computed: {
    getUser: {
      get() {
        return { ...this.$store.getters["moduleUser/getUser"] };
      },
      set(user) {
        this.$store.commit("moduleUser/setUser", user);
      },
    },
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "about" || this.$route.name === "signIn") {
        this.$router.push({ name: "home" });
      }
    },
    signIn() {
      if (this.$route.name !== "signIn") {
        this.$router.push({ name: "signIn" });
      } else {
        return;
      }
    },
    singOut() {
      this.$store.commit("moduleUser/setUser", {
        email: "",
        userName: "",
        isLoggedIn: false,
        idToken: "",
        tokenExpiration: "",
        idUser: "",
      });
    },
  },
  mounted() {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        this.$store.commit("moduleUI/setAlert", {
          text: "Unknown error occurred.",
          type: "error",
          icon: "mdi-alert-circle",
          color: "error darken-2",
          isActive: true,
        });
        return Promise.reject(error);
      }
    );
  },
};
</script>
<style scoped>
.button {
  transition: all 0.3s ease-in;
  text-shadow: 0px 0px 3px;
}
.button:hover {
  text-shadow: 0px 0px 10px;
}
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
