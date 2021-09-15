<template>
  <div>
    <PageLoader v-if="isLoading" />
    <HomeContent v-else />
  </div>
</template>

<script>
import PageLoader from "../components/PageLoader.vue";
import HomeContent from "../components/Home/HomeContent";

export default {
  name: "Home",

  components: {
    HomeContent,
    PageLoader,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  created() {
    this.isLoading = true;
    this.$store.dispatch("auth/getUserDetails").then(() => {
      this.isLoading = false;
    });
  },
};
</script>
