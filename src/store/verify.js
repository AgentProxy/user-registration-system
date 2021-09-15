// import axios from "axios";

const state = () => {
  return {
    isLoading: false,
    userDetails: null,
  };
};

// Export in format that can easily be added as a Vuex module
export default {
  verify: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    state,
  },
};
