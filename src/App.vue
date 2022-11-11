<template>
  <v-app>
    <v-app-bar dark color="purple darken-3" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Twitch TV</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer dark v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

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
