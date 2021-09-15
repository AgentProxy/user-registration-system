import axios from "axios";
import router from "../router";

const state = () => {
  return {
    isLoading: false,
    userDetails: null,
  };
};

const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_USER_DETAILS(state, userDetails) {
    state.userDetails = userDetails;
  },
};

const actions = {
  getUserDetails({ state, commit, dispatch }) {
    // Retrieve user details if it doesn't exists yet
    if (!state.userDetails) {
      // To toggle page loading while retrieving data
      commit("SET_LOADING", true);
      // Get authenticated user details
      // Added verification if user is still authenticated
      axios
        .get("/auth/me", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Save the user details if available
          if (response.data && response.data.data) {
            const responseData = response.data.data;
            commit("SET_USER_DETAILS", {
              full_name: responseData.full_name || "",
              email: responseData.email || "",
              avatar: responseData.avatar || "",
              email_verified: responseData.email_verified || false,
            });
            // Redirect to verification page if email hasn't been verified
            if (
              !responseData.email_verified &&
              router.currentRoute.name !== "Verify"
            ) {
              router.push("/verify");
            }
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          // Display error message
          dispatch(
            "alert/displayErrorAlert",
            {
              body:
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                "Unable to get user details. Please login again.",
            },
            { root: true }
          );
          // Logout user
          dispatch("auth/logout", null, { root: true });
        })
        .then(() => {
          commit("SET_LOADING", false);
        });
    }
  },
};

// Export in format that can easily be added as a Vuex module
export default {
  profile: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    state,
    actions,
    mutations,
  },
};
