import axios from "axios";
import router from "../router";

const state = () => {
  return {
    isLoading: false,
  };
};

const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  resendToken({ dispatch }) {
    axios
      .post(
        "/auth/verification/resend",
        {
          via: "email",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        // Display success message
        dispatch(
          "alert/displaySuccessAlert",
          {
            body: "Successfully resent verification code. Please check your email.",
          },
          { root: true }
        );
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
              "Unable to resend verification code",
          },
          { root: true }
        );
      });
  },
  // For now set token to `000000` by default
  verifyUser({ rootState, commit, dispatch }, token = "00000") {
    commit("SET_LOADING", true);
    // Toggle loading before sending data to endpoint
    axios
      .post(
        "/auth/verification/verify",
        {
          token,
          via: "email",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.email_verified
        ) {
          // Display success message
          dispatch(
            "alert/displaySuccessAlert",
            {
              body: "Your email address is now verified.",
            },
            { root: true }
          );
          // Update user details in profile module
          // to indicate that user has been verified
          commit(
            "profile/SET_USER_DETAILS",
            {
              ...rootState.profile.userDetails,
              email_verified: true,
            },
            { root: true }
          );
          // Proceed to success page if email has been verified
          router.push("/");
        } else {
          // Proceed to catch block if response.data is not available
          throw new Error();
        }
      })
      .catch((err) => {
        // Display error message
        this.$store.dispatch("alert/displayErrorAlert", {
          body:
            (err.response && err.response.data && err.response.data.message) ||
            "Unable to verify account. Please try again.",
        });
      })
      .then(() => {
        commit("SET_LOADING", false);
      });
  },
};

// Export in format that can easily be added as a Vuex module
export default {
  verify: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    state,
    mutations,
    actions,
  },
};
