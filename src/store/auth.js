import axios from "axios";
import router from "../router";

const state = () => {
  return {
    token: null,
  };
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
};

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  },
};

const actions = {
  login({ dispatch }, userDetails) {
    return axios
      .post(
        "/auth/login",
        {
          username: userDetails.email,
          password: userDetails.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.data) {
          const responseData = response.data.data;
          // Save access token to be used for requests
          dispatch("saveUserToken", responseData.access_token);
          // Proceed to success page if email has been verified
          if (responseData.email_verified) {
            router.push("/");
          } else if (!responseData.email_verified) {
            // Proceed to verification page if email has not been verified
            router.push("/verify");
          }
        } else {
          // Proceed to catch block if response.data is not available
          throw new Error();
        }
      })
      .catch((err) => {
        // Remove any possible token entries
        dispatch("logout");
        // Display error message
        dispatch(
          "alert/displayErrorAlert",
          {
            body:
              (err.response &&
                err.response.data &&
                err.response.data.message) ||
              "Unable to login",
          },
          { root: true }
        );
      });
  },
  register({ dispatch }, userDetails) {
    return axios
      .post(
        "/auth/register",
        {
          email: userDetails.email,
          full_name: userDetails.full_name,
          password: userDetails.password,
          password_confirmation: userDetails.password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.data) {
          const responseData = response.data.data;
          // Save access token to be used for requests
          dispatch("saveUserToken", responseData.access_token);
          // Display success message and redirect to verification page
          dispatch(
            "alert/displaySuccessAlert",
            {
              body: "Your registration has been successfully completed. You have just been sent an email containing the verification code.",
            },
            { root: true }
          );
          // Redirect to verification page
          router.push("/verify");
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        // Remove any possible token entries
        dispatch("removeUserToken");
        // Display error message
        dispatch(
          "alert/displayErrorAlert",
          {
            body:
              (err.response &&
                err.response.data &&
                err.response.data.message) ||
              "Unable to register",
          },
          { root: true }
        );
      });
  },
  logout({ state, commit, dispatch }) {
    // If token is available previously, logout the user by calling the logout
    // endpoint and removing user details and token. Else, redirect to login page directly
    if (state.token || localStorage.getItem("token")) {
      axios
        .post("/auth/logout", null, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          // Clear user details
          commit("profile/SET_USER_DETAILS", null, { root: true });
          // Clear and remove user token from header
          dispatch("removeUserToken");
          // Redirect user back to login page
          router.push("/login");
        })
        .catch((err) => {
          // Clear and remove user token from header
          dispatch("removeUserToken");
          // Display error message
          dispatch(
            "alert/displayErrorAlert",
            {
              body:
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                "An error occured while logging out",
            },
            { root: true }
          );
        });
    } else {
      // Clear and remove user token from header
      dispatch("removeUserToken");
      // Redirect user back to login page
      router.push("/login");
    }
  },
  removeUserToken({ commit }) {
    // Remove token to state and local storage
    commit("SET_TOKEN", null);
    localStorage.removeItem("token");
    // Remove the Authorization token from the axios default header
    delete axios.defaults.headers.common["Authorization"];
  },
  saveUserToken({ commit }, token) {
    token = "Bearer " + token;
    // Save token to state and local storage
    commit("SET_TOKEN", token);
    localStorage.setItem("token", token);
    // Save to default header of axios to be used for requests
    axios.defaults.headers.common["Authorization"] = token;
  },
};

// Export in format that can easily be added as a Vuex module
export default {
  auth: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  },
};
