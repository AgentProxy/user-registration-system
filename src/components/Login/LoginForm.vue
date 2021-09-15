<template>
  <v-container>
    <h1 class="text-h5 text-md-h2 mb-10 primary--text">Login</h1>
    <v-form
      class="px-5"
      @submit.prevent="login"
      ref="loginForm"
      v-model="isValidForm"
    >
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
        autocomplete
        @click:append="showPassword = !showPassword"
      />
      <!-- Disable the submit button if form is not valid or submitting -->
      <v-btn
        :disabled="!isValidForm || isLoggingIn"
        block
        x-large
        color="primary"
        type="submit"
        :loading="isLoggingIn"
      >
        Login
      </v-btn>
      <p class="mt-5 grey--text lighten-1">
        Don't have an account?
        <a @click.prevent="$router.push('/register')"> Sign Up </a>
      </p>
    </v-form>
  </v-container>
</template>

<script>
// import axios from "axios";
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
      if (this.isValidForm && !this.isLoggingIn) {
        this.isLoggingIn = true;
        this.$store
          .dispatch("auth/login", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.isLoggingIn = false;
          });
      }
    },
  },
};
</script>
