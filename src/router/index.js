import Vue from "vue";
import VueRouter from "vue-router";
import StreamerInfo from "@/views/StreamerInfo.vue";
import StreamersRank from "@/views/StreamersRank.vue";
import GamesRank from "@/views/GamesRank.vue";
import SignIn from "@/views/SignIn";
import RegisterUser from "@/views/RegisterUser";

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
  {
    path: "/sign-in",
    name: "signIn",
    component: SignIn,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser,
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
