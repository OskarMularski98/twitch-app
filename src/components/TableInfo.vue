<template>
  <div>
    <v-toolbar dark color="purple darken-2">
      <v-spacer></v-spacer>
        <v-toolbar-title>Rank 100 Live Streamers</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <v-row class="justify-center">
        <v-data-table
          dark
          class="elevation-12 grey darken-3"
          :items="items"
          :headers="headers"
          :search="search"
        >
          <template #top>
            <v-text-field
              class="pa-4"
              label="Search"
              v-model="search"
            ></v-text-field>
          </template>
          <template #[`item.user_name`]="{ item }">
            <v-img
              :src="item.profile_image_url"
              max-height="50"
              max-width="50"
            ></v-img>
            {{ item.user_name }}
          </template>
        </v-data-table>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["items", "headers"],
  data() {
    return {
      search: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style></style>
