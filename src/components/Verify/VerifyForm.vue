<template>
  <div>
    <v-form @submit.prevent="login" ref="loginForm" v-model="isValidForm">
      <!-- Email field with validation -->
      <v-text-field
        autofocus
        name="token"
        v-model="token"
        :rules="rules.token"
        label="Token"
        outlined
        required
      />
      <!-- Disable the submit button if form is not valid or submitting -->
      <v-btn
        :disabled="!isValidForm || isVerifying"
        color="primary"
        type="submit"
        :loading="isVerifying"
      >
        Verify
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VerifyForm",
  data() {
    return {
      token: "",
      isVerifying: false,
      isValidForm: false,
      // Validation rules for input fields in form
      rules: {
        token: [(v) => !!v || "Verification Token is required"],
      },
    };
  },
  methods: {
    login() {
      // Only proceed to sending data to endpoint if all form fields are valid
      if (this.isValidForm && !this.isVerifying) {
        // Toggle loading before sending data to endpoint
        this.isVerifying = true;
        axios({
          url: "/auth/verification/verify",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            token: "12345",
            via: "email",
          },
        })
          .then((response) => {
            if (response.data && response.data.email_verified) {
              // Display success message and redirect to verification page
              this.$store.dispatch("alert/displaySuccessAlert", {
                body: "Your email address is now verified.",
              });
              // Proceed to success page if email has been verified
              this.$router.push("/");
            } else {
              // Proceed to catch block if response.data is not available
              throw new Error();
            }
          })
          .catch((err) => {
            // Display error message
            this.$store.dispatch("alert/displayErrorAlert", {
              body:
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                "Unable to verify token",
            });
          })
          .then(() => {
            // Set the `isVerifying` to false to stop the submit button from
            // showing the loading state and being disabled
            this.isVerifying = false;
          });
      }
    },
  },
};
</script>
