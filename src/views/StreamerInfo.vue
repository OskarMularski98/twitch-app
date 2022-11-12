<template>
  <div class="justify-center">
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
      <v-container v-if="!isLoading" class="fill-height justify-center">
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="items"
          dark
        >
          <template #top>
            <v-img
              lazy-src="../assets/twitch-logo-lazy-src.png"
              aspect-ratio="1"
              contain
              max-height="500"
              max-width="500"
              :src="thumbnail_url"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </template>
          <template #[`item.value`]="{ item }">
            <div v-if="item.name === 'Language'">
              <v-btn fab text small class="mr-4">
                <lang-flag
                  style="transform: scale(1.5)"
                  class="flag-scale"
                  :squared="false"
                  :iso="item.value"
                ></lang-flag>
              </v-btn>
            </div>
            <div v-else>
              {{ item.value }}
            </div>
          </template>
          <template #footer>
            <v-btn
              block
              tile
              target="_blank"
              :href="link"
              color="purple darken-3"
            >
              Click To Watch!
            </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      isLoading: false,
      streamerInfo: {},
      thumbnail_url: "",
      link: "",
      headers: [
        {
          text: "#",
          value: "name",
          sortable: false,
        },
        {
          text: "#",
          value: "value",
          sortable: false,
        },
      ],
      items: [],
    };
  },
  async created() {
    this.isLoading = true;
    await this.loadStreamer();
    this.isLoading = false;
  },
  methods: {
    async loadStreamer() {
      try {
        const response = await axios.get(
          `https://api.twitch.tv/helix/streams?user_id=${this.id}`,
          {
            headers: {
              Authorization: "Bearer n8y2uezpvxa0uavp73bye42mk7c43k",
              "Client-Id": "cauml8m858lhojpgwkhkk3a4ohx071",
            },
          }
        );
        this.streamerInfo = response.data.data[0];
        this.items = [
          {
            name: "Name",
            value: this.streamerInfo.user_name,
          },
          {
            name: "Game",
            value: this.streamerInfo.game_name,
          },
          {
            name: "Language",
            value: this.streamerInfo.language,
          },
          {
            name: "Title",
            value: this.streamerInfo.title,
          },
          {
            name: "Started at",
            value: this.streamerInfo.started_at,
          },
        ];
        this.thumbnail_url = this.streamerInfo.thumbnail_url
          .replace("{width}", "200")
          .replace("{height}", "200");
        this.link = `https://www.twitch.tv/${this.streamerInfo.user_login}`;
        console.log(this.streamerInfo);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
