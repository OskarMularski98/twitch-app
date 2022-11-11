<template>
  <v-app>
    <v-app-bar dark color="purple darken-3" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Twitch TV</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main class="purple darken-4">
      <table-info :items="streamsDetails" :headers="headers"> </table-info>
    </v-main>
  </v-app>
</template>

<script>
import TableInfo from "./components/TableInfo.vue";
import axios from "axios";
export default {
  components: {
    TableInfo,
  },
  data() {
    return {
      drawer: null,
      streams: [],
      streamsDetails: [],
      streamerProfile: [],
      headers: [
        {
          text: "Streamer",
          value: "user_name",
        },
        {
          text: "Game",
          value: "game_name",
        },
        {
          text: "Viewers",
          value: "viewer_count",
        },
        {
          text: "Language",
          value: "language",
        },
      ],
      streamersId: [],
    };
  },
  async created() {
    await this.loadStreams();
    await this.loadStreamer();
    this.refreshStreams();
  },
  methods: {
    async loadStreams() {
      this.streamersId = [];
      try {
        const response = await axios.get(
          "https://api.twitch.tv/helix/streams?first=100",
          {
            headers: {
              Authorization: "Bearer n8y2uezpvxa0uavp73bye42mk7c43k",
              "Client-Id": "cauml8m858lhojpgwkhkk3a4ohx071",
            },
          }
        );
        this.streams = response.data.data;
        this.streams.forEach((stream) => {
          this.streamersId.push(stream.user_id);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadStreamer() {
      try {
        const response = await axios.get(
          `https://api.twitch.tv/helix/users?${this.streamersId
            .map((id) => `id=${id}`)
            .join("&")}`,
          {
            headers: {
              Authorization: "Bearer n8y2uezpvxa0uavp73bye42mk7c43k",
              "Client-Id": "cauml8m858lhojpgwkhkk3a4ohx071",
            },
          }
        );
        this.streamsDetails = response.data.data;
        console.log(this.streamsDetails);
        this.streams.forEach((stream) => {
          this.streamsDetails.forEach((details) => {
            if (stream.user_id === details.id) {
              details.user_name = stream.user_name;
              details.game_name = stream.game_name;
              details.viewer_count = stream.viewer_count;
              details.language = stream.language;
            }
          });
        });
        console.log(this.streams);
      } catch (error) {
        console.log("error", error);
      }
    },
    refreshStreams() {
      const timeOut = 5000;
      this.isCleared = setInterval(async () => {
        await this.loadStreams();
        await this.loadStreamer();
      }, timeOut);
    },
  },
};
</script>
