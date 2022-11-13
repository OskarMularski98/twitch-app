<template>
  <div>
    <v-container v-if="isLoading" class="text-center mt-10">
      <v-row>
        <v-col cols="12">
          <v-progress-circular
            color="purple lighten-1"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-fade-transition hide-on-leave>
      <div v-if="!isLoading">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12" xl="10">
              <v-data-table
                dark
                class="elevation-12 grey darken-3"
                :items="streamsDetails"
                :headers="headers"
                :search="search"
              >
                <template #top>
                  <v-col cols="12" class="pa-0">
                    <v-text-field
                      class="pa-4"
                      label="Search"
                      v-model="search"
                      append-icon="mdi-magnify"
                    ></v-text-field>
                  </v-col>
                </template>
                <template #[`item.number`]="{ item }">
                  {{ item.number }}
                </template>
                <template #[`item.profile`]="{ item }">
                  <v-img
                    :src="item.profile_image_url"
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
                <template #[`item.user_name`]="{ item }">
                  {{ item.user_name }}
                </template>
                <template #[`item.viewer_count`]="{ item }">
                  <v-chip dark :color="getColor(item.viewer_count)">
                    {{ item.viewer_count }}
                  </v-chip>
                </template>
                <template #[`item.language`]="{ item }">
                  <v-btn fab text small class="mr-4">
                    <lang-flag
                      class="flag-scale"
                      :squared="false"
                      :iso="item.language"
                    ></lang-flag>
                  </v-btn>
                </template>
                <template #[`item.details`]="{ item }">
                  <v-btn fab text small @click="details(item.id)"
                    ><v-icon>{{ "mdi-account-details" }}</v-icon></v-btn
                  >
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      isLoading: false,
      drawer: null,
      streams: [],
      streamsDetails: [],
      streamerProfile: [],
      headers: [
        {
          text: "#",
          value: "number",
        },
        {
          text: "Profile",
          value: "profile",
          sortable: false,
        },
        {
          text: "Name",
          value: "user_name",
        },
        {
          text: "Game",
          value: "game_name",
          width: 400,
        },
        {
          text: "Viewers",
          value: "viewer_count",
        },
        {
          text: "Language",
          value: "language",
          align: "center",
        },
        {
          text: "Details",
          value: "details",
          sortable: false,
        },
      ],
      streamersId: [],
    };
  },
  async created() {
    this.isLoading = true;
    await this.loadStreams();
    await this.loadStreamer();
    this.isLoading = false;
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
        this.streams.forEach((stream) => {
          this.streamsDetails.forEach((details, index) => {
            if (stream.user_id === details.id) {
              details.user_name = stream.user_name;
              details.game_name = stream.game_name;
              details.viewer_count = stream.viewer_count;
              details.language = stream.language;
              details.number = index + 1;
            }
          });
        });
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
    getColor(viewers) {
      if (viewers > 50000) return "green";
      else if (viewers > 10000) return "red";
      else if (viewers > 5000) return "orange";
      else if (viewers < 5000) return "yellow";
    },
    details(value) {
      this.$router.push({ name: "about", params: { id: value } });
    },
  },
};
</script>

<style scoped>
.flag-scale {
  transform: scale(1.5);
}
</style>
