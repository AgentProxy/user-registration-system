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
  deleteAccount({ commit, dispatch }, password) {
    commit("SET_LOADING", true);
    // Will retrieve verification token first which is needed for the
    // delete account endpoint
    axios
      .post(
        "/auth/account/verification-token",
        { password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Proceed if verification token is available from the response
        if (response.data && response.data.data && response.data.data.token) {
          return axios
            .delete(
              "/auth/account",
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Verification-Token": response.data.data.token,
                },
              },
              null
            )
            .catch(() => {
              // Will trigger parent catch block
              throw new Error();
            });
        } else {
          // Will trigger catch block to display error message
          throw new Error();
        }
      })
      .then(() => {
        // Display success message
        dispatch(
          "alert/displaySuccessAlert",
          {
            body: "Your account was successfully deleted.",
          },
          { root: true }
        );
        // Remove user token manually, no need to call logout endpoint
        dispatch("auth/removeUserToken", null, { root: true });
        // Redirect user back to login page
        router.push("/login");
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
              err.message ||
              "Unable to delete user account. Please try again.",
          },
          { root: true }
        );
      })
      .then(() => {
        commit("SET_LOADING", false);
      });
  },
  getUserDetails({ commit, dispatch }, toRouteName) {
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
          // Check if user was verified
          dispatch("checkIfVerified", toRouteName);
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
  },

  checkIfVerified({ state }, toRouteName) {
    const isVerified = state.userDetails && state.userDetails.email_verified;
    // If user hasn't been verified, return user to Verify page
    if (!isVerified && toRouteName !== "Verify") {
      router.push("/verify");
    } else if (isVerified && toRouteName === "Verify") {
      // If user has been verified and visited the Verify page, redirect
      // user to Home page
      router.push("/");
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
