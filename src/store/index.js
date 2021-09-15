import Vue from "vue";
import Vuex from "vuex";

import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import verify from "./verify";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...alert,
    ...auth,
    ...profile,
    ...verify,
  },
});
