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
  displayErrorAlert({ commit }, message) {
    if (message && message.body) {
      commit("SET_MESSAGE", {
        body: message.body,
        title: message.title || "Error",
        type: "error",
      });
      commit("SHOW_ALERT", true);
    }
  },
  displaySuccessAlert({ commit }, message) {
    if (message && message.body) {
      commit("SET_MESSAGE", {
        body: message.body,
        title: message.title || "Success",
        type: "success",
      });
      commit("SHOW_ALERT", true);
    }
  },
};

// Export in format that can easily be added as a Vuex module
export default {
  alert: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    state,
    mutations,
    actions,
  },
};
