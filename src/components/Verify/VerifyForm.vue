<template>
  <v-card max-width="70%" class="mx-auto">
    <v-row align="center" justify="center" class="py-5">
      <v-col class="text-center" cols="12" sm="8" md="8">
        <v-icon class="emoticon primary--text"> mdi-email </v-icon>
        <h2 class="text-h5 text-md-h2 my-4 primary--text">
          Verify Your Account
        </h2>
        <p>
          Please enter the verification code <br />sent to your email to verify
          your account.
        </p>
        <v-form @submit.prevent="verify" ref="loginForm" v-model="isValidForm">
          <!-- Email field with validation -->
          <v-text-field
            autofocus
            name="token"
            v-model="token"
            :rules="rules.token"
            label="Verification Token"
            outlined
            required
          />
          <!-- Disable the submit button if form is not valid or submitting -->
          <v-btn
            :disabled="!isValidForm || isLoading"
            color="primary"
            type="submit"
            large
            :loading="isLoading"
          >
            Verify
          </v-btn>
        </v-form>
        <div class="mt-5">
          <a @click="resendToken"> Resend Verification Code </a>
        </div>
      </v-col>
    </v-row>
  </v-card>
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
<style scoped>
.emoticon {
  font-size: 7em;
}
</style>
