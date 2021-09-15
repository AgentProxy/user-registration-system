<template>
  <v-app>
    <Navbar v-if="showAppShell" />
    <v-main>
      <AlertBox />
      <router-view />
    </v-main>
    <Footer v-if="showAppShell" />
  </v-app>
</template>

<script>
import AlertBox from "./components/AlertBox.vue";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    AlertBox,
    Footer,
    Navbar,
  },
  computed: {
    /**
     * Show navbar and footer in Home and Verify routes
     */
    showAppShell() {
      const validRouteNames = ["Home", "Verify"];
      return validRouteNames.includes(this.$route.name);
    },
  },
};
</script>
