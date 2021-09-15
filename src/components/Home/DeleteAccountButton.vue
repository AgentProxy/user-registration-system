<template>
  <button @click="deleteAccount">Delete Account</button>
</template>
<script>
export default {
  name: "DeleteAccountButton",
  methods: {
    deleteAccount() {
      const password = prompt(
        "Are you sure you want to delete your account? Please enter your password to confirm."
      );
      if (password) {
        this.$store.dispatch("profile/deleteAccount", password);
        alert("Account Deleted");
      }
    },
  },
};
</script>
