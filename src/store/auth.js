import router from "../router";

const state = () => {
  return {
    message: {},
    showAlert: false,
  };
};

const mutations = {
  SET_MESSAGE: function (state, message) {
    state.message = message;
  },
  SHOW_ALERT: function (state, showAlert) {
    state.showAlert = showAlert;
  },
};

const actions = {
  logout() {
    router.push("/login");
  },
};

// Export in format that can easily be added as a Vuex module
export default {
  auth: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    state,
    mutations,
    actions,
  },
};
