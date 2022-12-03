import Vue from "vue";
import Vuex from "vuex";
import moduleUI from "@/store/modules/moduleUI";
import moduleUser from "@/store/modules/moduleUser";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["moduleUser"],
    }),
  ],
  modules: {
    moduleUI,
    moduleUser,
  },
});
