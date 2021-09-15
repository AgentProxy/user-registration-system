<template>
  <RegisterForm />
</template>

<script>
import RegisterForm from "../components/Register/RegisterForm.vue";

export default {
  name: "Register",

  components: {
    RegisterForm,
  },
  created() {
    // this.$store.dispatch("auth/resumeSession");
  },
};
</script>
