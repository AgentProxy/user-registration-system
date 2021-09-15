<template>
  <div>
    <v-form @submit.prevent="login" ref="loginForm" v-model="isValidForm">
      <!-- Email field with validation -->
      <v-text-field
        autofocus
        name="email"
        v-model="email"
        :rules="rules.email"
        label="E-mail"
        outlined
        required
      />
      <!-- Password field with validation, hint label and show toggle -->
      <v-text-field
        name="password"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Password"
        :rules="rules.password"
        :type="showPassword ? 'text' : 'password'"
        outlined
        required
        @click:append="showPassword = !showPassword"
      />
      <!-- Disable the submit button if form is not valid or submitting -->
      <v-btn
        :disabled="!isValidForm || isLoggingIn"
        color="primary"
        type="submit"
        :loading="isLoggingIn"
      >
        Login
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      isLoggingIn: false,
      isValidForm: false,
      // Toggle showing of password field
      showPassword: false,
      // Validation rules for input fields in form
      rules: {
        // Validation to check if email is present
        // and should be a valid email string
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        // Validation to check if password is present
        password: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    login() {
      // Only proceed to sending data to endpoint if all form fields are valid
      if (this.isValidForm && !this.isLoggingIn) {
        // Toggle loading before sending data to endpoint
        this.isLoggingIn = true;
        axios({
          url: "/auth/login",
          method: "POST",
          body: {
            username: this.email,
            password: this.password,
          },
        })
          .then((response) => {
            if (response.data) {
              // Save access token to local storage
              localStorage.setItem("access-token", response.data.token);
              // Proceed to success page if email has been verified
              if (response.data.email_verified) {
                this.$router.push("/");
              } else if (!response.data.email_verified) {
                // Proceed to verification page if email has not been verified
                this.$router.push("/verify");
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
            this.$store.dispatch("alert/displayErrorAlert", {
              body:
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                "Unable to login",
            });
          })
          .then(() => {
            // Set the `isLoggingIn` to false to stop the submit button from
            // showing the loading state and being disabled
            this.isLoggingIn = false;
          });
      }
    },
  },
};
</script>
