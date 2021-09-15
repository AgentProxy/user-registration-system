import axios from "axios";
import router from "../router";

const state = () => {
  return {
    token: null,
    userDetails: null,
  };
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_DETAILS(state, userDetails) {
    state.userDetails = userDetails;
  },
};

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  },
};

const actions = {
  getUserDetails({ commit, dispatch }) {
    // Get authenticated user details
    // Added verification if user is still authenticated
    return axios
      .get("/auth/me", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.data) {
          const responseData = response.data.data;
          commit("SET_USER_DETAILS", {
            full_name: responseData.full_name || "",
            email: responseData.email || "",
            avatar: responseData.avatar || "",
          });
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
              "Unable to register",
          },
          { root: true }
        );
        // Logout user
        dispatch("logout");
      });
  },
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
        dispatch("removeUserToken");
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
        console.log(response.data);
        // Save access token to be used for requests
        dispatch("saveUserToken", response.data.access_token);
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
  logout({ state, dispatch }) {
    if (state.token) {
      axios
        .post("/auth/logout", null, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          dispatch("removeUserToken");
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
                "Unable to register",
            },
            { root: true }
          );
        })
        .then(() => {
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
  },
  removeUserToken({ commit }) {
    commit("SET_TOKEN", null);
    localStorage.removeItem("token");
    // Remove the Authorization token from the axios default header
    delete axios.defaults.headers.common["Authorization"];
  },
  saveUserToken({ commit }, token) {
    token = "Bearer " + token;
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
