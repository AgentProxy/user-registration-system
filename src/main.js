import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import axios from "axios";

Vue.config.productionTip = false;
// Check if there was a previous token saved
const token = localStorage.getItem("token");
// Save previous token to header for succeeding requests
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

//Set base url for use globally
axios.defaults.baseURL = "https://baseplate-api.appetiserdev.tech/api/v1";

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
