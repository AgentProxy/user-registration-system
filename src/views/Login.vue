<template>
  <LoginForm />
</template>

<script>
import LoginForm from "../components/Login/LoginForm.vue";

export default {
  name: "Login",

  components: {
    LoginForm,
  },
  created() {
    // this.$store.dispatch("auth/resumeSession");
  },
};
</script>
