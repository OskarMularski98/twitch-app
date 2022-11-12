import Vue from "vue";
import VueRouter from "vue-router";
import StreamerInfo from "@/views/StreamerInfo.vue";
import StreamersRank from "@/views/StreamersRank.vue";
import GamesRank from "@/views/GamesRank.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: StreamersRank,
  },
  {
    path: "/about/:id",
    name: "about",
    component: StreamerInfo,
    props: true,
  },
  {
    path: "/games",
    name: "games",
    component: GamesRank,
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
