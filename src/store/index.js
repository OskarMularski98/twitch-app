import Vue from "vue";
import Vuex from "vuex";
import moduleUI from "@/store/modules/moduleUI";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moduleUI,
  },
});
