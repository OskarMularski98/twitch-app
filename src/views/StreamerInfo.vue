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
            <v-toolbar>
              <v-spacer></v-spacer>
              <v-toolbar-title> Thumbnail From Stream 📸 </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
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
            <v-toolbar class="">
              <v-spacer></v-spacer>
              <v-toolbar-title class="justify-center"
                >Most Popular Clips 🎬</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-carousel
              hide-delimiters
              style="width: 500px"
              class="carousel"
              height="auto"
            >
              <v-carousel-item v-for="(item, i) in carouselItems" :key="i">
                <iframe
                  :src="`${item.embed_url}&parent=twitch-app-om.herokuapp.com`"
                  allowfullscreen="true"
                  autoplay="false"
                  height="300"
                  width="500"
                ></iframe>
              </v-carousel-item>
            </v-carousel>
            <v-btn
              block
              tile
              target="_blank"
              :href="link"
              color="purple darken-3"
            >
              Click To Watch Stream!
            </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script>
import moment from "moment";
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
          width: 300,
        },
      ],
      items: [],
      carouselItems: [],
    };
  },
  async created() {
    this.isLoading = true;
    await this.loadStreamer();
    await this.loadClips();
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
            name: "Started at (CET)",
            value: moment(this.streamerInfo.started_at).format("HH:mm"),
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
    async loadClips() {
      try {
        const response = await axios.get(
          `https://api.twitch.tv/helix/clips?broadcaster_id=${this.id}`,
          {
            headers: {
              Authorization: "Bearer n8y2uezpvxa0uavp73bye42mk7c43k",
              "Client-Id": "cauml8m858lhojpgwkhkk3a4ohx071",
            },
          }
        );
        // console.log(response.data.data);
        this.carouselItems = response.data.data;
        // this.carouselItems.forEach((item) => {
        //   item.content = `<iframe src=${item.url}+output=embed </iframe>`;
        //   console.log(item.content);
        // });
        console.log(this.carouselItems);
      } catch (error) {
        console.log(error);
      }
    },
    moment(value) {
      return moment(value);
    },
  },
};
</script>

<style scoped>
.carousel {
  /* position: absolute;
  width: 300px;
  top: 50%; */
}
</style>
