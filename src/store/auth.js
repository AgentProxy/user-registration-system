import axios from "axios";
import router from "../router";

const actions = {
  login({ dispatch }, userDetails) {
    return axios({
      url: "/auth/login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: userDetails.email,
        password: userDetails.password,
      },
    })
      .then((response) => {
        if (response.data) {
          // Save access token to local storage
          localStorage.setItem("access-token", response.data.token);
          // Proceed to success page if email has been verified
          if (response.data.email_verified) {
            router.push("/");
          } else if (!response.data.email_verified) {
            // Proceed to verification page if email has not been verified
            router.push("/verify");
          }
        } else {
          // Proceed to catch block if response.data is not available
          throw new Error();
        }
      })
      .catch((err) => {
        // Remove any possible access-token entry
        localStorage.removeItem("access-token");
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
    return axios({
      url: "/auth/register",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: userDetails.email,
        full_name: userDetails.full_name,
        password: userDetails.password,
        password_confirmation: userDetails.password_confirmation,
      },
    })
      .then((response) => {
        // Save access token to local storage
        localStorage.setItem("access-token", response.data.token);
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
        // Remove any possible access-token entry
        localStorage.removeItem("access-token");
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
  logout() {
    router.push("/login");
  },
};

// Export in format that can easily be added as a Vuex module
export default {
  auth: {
    // Set modules to namespaced equals true by default
    namespaced: true,
    actions,
  },
};
