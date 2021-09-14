<template>
  <div>
    <v-form @submit.prevent="submit" ref="registerForm" v-model="isValidForm">
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
      <!-- Email field with validation -->
      <v-text-field
        name="full_name"
        v-model="full_name"
        label="Full Name"
        :rules="rules.full_name"
        outlined
        required
      />
      <!-- Password field with validation, hint label and show toggle -->
      <v-text-field
        name="password"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Password"
        hint="Password should be at least be 8 character"
        persistent-hint
        :rules="rules.password"
        :type="showPassword ? 'text' : 'password'"
        outlined
        required
        @click:append="showPassword = !showPassword"
      />
      <!-- Confirm Password field with validation and show toggle -->
      <v-text-field
        name="password_confirmation"
        v-model="password_confirmation"
        :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
        label="Confirm Password"
        :rules="rules.password_confirmation"
        :type="showPasswordConfirmation ? 'text' : 'password'"
        outlined
        required
        @click:append="showPasswordConfirmation = !showPasswordConfirmation"
      />
      <!-- Disable the submit button if form is not valid or submitting -->
      <v-btn
        :disabled="!isValidForm || isSubmittingForm"
        color="primary"
        type="submit"
        :loading="isSubmittingForm"
      >
        Sign up
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegistrationForm",
  data() {
    return {
      full_name: "",
      email: "",
      isValidForm: false,
      password: "",
      password_confirmation: "",
      isSubmittingForm: false,
      // Toggle showing of password field
      showPassword: false,
      // Toggle showing of password confirmation field
      showPasswordConfirmation: false,
      // Validation rules for input fields in form
      rules: {
        // Validation to check if email is present
        // and should be a valid email string
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        // Validation to check if full name is present
        full_name: [(v) => !!v || "Full Name is required"],
        // Validation to check if password is present and should
        // have at least 8 characters
        password: [
          (v) => !!v || "Password is required",
          (v) => v.length > 7 || "Password must be at least 8 characters",
        ],
        // Validation to check if password_confirmation is present and should
        // match password field
        password_confirmation: [
          (v) => !!v || "Please confirm your password",
          (v) =>
            (this.password &&
              this.password.length &&
              v.length === this.password.length) ||
            "Passwords do not match",
        ],
      },
    };
  },
  methods: {
    submit() {
      // Only proceed to sending data to endpoint if all form fields are valid
      if (this.isValidForm && !this.isSubmittingForm) {
        // Toggle loading before sending data to endpoint
        this.isSubmittingForm = true;
        // "https://api.baseplate.appetiserdev.tech/api/v1/auth/register",
        axios
          .post(
            "https://api.baseplate.appetiserdev.tech/api/v1/auth/register",
            {
              full_name: this.full_name,
              email: this.email,
              password: this.password,
              password_confirmation: this.password_confirmation,
            }
          )
          .then((response) => {
            console.log(response.data);
            this.$store.dispatch("alert/displaySuccessAlert", {
              body: "Your registration has been successfully completed. You have just been sent an email containing the verification code.",
            });
            this.$router.push("/verify");
          })
          .catch((err) => {
            this.$store.dispatch("alert/displayErrorAlert", {
              body:
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                "Unable to register",
            });
          })
          .then(() => {
            // Set the `isSubmittingForm` to false to stop the submit button from
            // showing the loading state and being disabled
            this.isSubmittingForm = false;
          });
      }
    },
  },
};
</script>
