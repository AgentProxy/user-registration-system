<template>
  <div>
    <v-form @submit.prevent="verify" ref="loginForm" v-model="isValidForm">
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
        :disabled="!isValidForm || isLoading"
        color="primary"
        type="submit"
        :loading="isLoading"
      >
        Verify
      </v-btn>
    </v-form>
    <a @click="resendToken"> Resend Verification Code </a>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VerifyForm",
  computed: {
    ...mapState("verify", ["isLoading"]),
  },
  data() {
    return {
      token: "",
      isResendingToken: false,
      isValidForm: false,
      // Validation rules for input fields in form
      rules: {
        token: [(v) => !!v || "Please input your Verification Token"],
      },
    };
  },
  methods: {
    resendToken() {
      // Only proceed to call the endpoint if it is not in the middle of resending
      // to prevent double calls
      if (!this.isResendingToken) {
        this.isResendingToken = true;
        this.$store.dispatch("verify/resendToken").then(() => {
          this.isResendingToken = false;
        });
      }
    },
    verify() {
      // Only proceed to sending data to endpoint if all form fields are valid
      if (this.isValidForm) {
        this.$store.dispatch("verify/verifyUser", this.token);
      }
    },
  },
};
</script>
