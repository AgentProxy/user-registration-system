<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row class="fill-height" align="center">
      <v-col class="fill-height pa-0 d-none d-md-block" lg="7" md="6" cols="12">
        <WelcomeContainer />
      </v-col>
      <v-col class="fill-height text-center pa-0" lg="5" md="6" cols="12">
        <div class="py-5 d-md-none d-flex align-center justify-center">
          <v-img
            alt="U-Reg Logo"
            class="shrink"
            contain
            src="../assets/u-reg-logo-primary.png"
            transition="scale-transition"
            min-width="200"
            max-width="350"
          />
        </div>
        <RegisterForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegisterForm from "../components/Register/RegisterForm.vue";
import WelcomeContainer from "../components/WelcomeContainer.vue";

export default {
  name: "Register",

  components: {
    RegisterForm,
    WelcomeContainer,
  },
  created() {
    // this.$store.dispatch("auth/resumeSession");
  },
};
</script>
