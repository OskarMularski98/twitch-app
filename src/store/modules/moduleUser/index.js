import state from "./state";
import mutations from "./mutations";
import action from "./action";
import getters from "./getters";

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  action,
};
