import Vue from "vue";
import VueRouter from "vue-router";
import DetailInfo from "@/views/DetailInfo.vue";
import TableInfo from "@/views/TableInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: TableInfo,
  },
  {
    path: "/about",
    name: "about",
    component: DetailInfo,
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
