<template>
  <v-data-table :items="games" :headers="headers" dark>
    <template #[`item.profile`]>
      <v-img
        :src="categoryImg"
        lazy-src="../assets/twitch-logo-lazy-src.png"
        max-height="50"
        max-width="50"
      >
        <template #placeholder>
          <v-progress-circular
            class="justify-center"
            indeterminate
            color="purple lighten-2"
          ></v-progress-circular>
        </template>
      </v-img>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      games: [
        {
          id: "",
          name: "",
          box_art_url: "box_art_url",
          igdb_id: "",
        },
      ],
      headers: [
        {
          text: "Category",
          value: "box_art_url",
        },
        {
          text: "Name",
          value: "name",
        },
      ],
    };
  },
  async created() {
    await this.loadGames();
  },
  methods: {
    async loadGames() {
      try {
        const response = await axios.get(
          `https://api.twitch.tv/helix/games/top?first=100`,
          {
            headers: {
              Authorization: process.env.VUE_APP_AUTH,
              "Client-Id": process.env.VUE_APP_CLIENT_ID,
            },
          }
        );
        this.games = response.data.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    replaceUrlString(string) {
      const url = string.replace("{width}", 50).replace("{height}", 50);
      console.log(1);
      return url;
    },
  },
  computed: {
    categoryImg() {
      return this.games.forEach((game) => {
        const url = game.box_art_url
          .replace("{width}", 50)
          .replace("{height}", 50);
        console.log(url);
        return url;
      });
    },
  },
};
</script>

<style></style>
