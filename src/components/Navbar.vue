<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="U-Reg Logo"
        class="shrink"
        contain
        src="../assets/u-reg-logo.png"
        transition="scale-transition"
        width="140"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn @click="logout" text>
      <span class="mr-2">Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
