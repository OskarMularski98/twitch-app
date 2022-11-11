<template>
  <v-app>
    <v-navigation-drawer app clipped dark v-model="drawer">
      <v-list>
        <v-list-item link :to="{ name: 'home' }">
          <v-list-item-icon>
            <v-icon>{{ "mdi-format-list-numbered" }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Rank 100</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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

    <v-main class="purple darken-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    };
  },
  async created() {},
  methods: {},
};
</script>
