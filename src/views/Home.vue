<template>
  <div>
    <PageLoader v-if="isLoading" />
    <HomeContent v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageLoader from "../components/PageLoader.vue";
import HomeContent from "../components/Home/HomeContent";

export default {
  name: "Home",

  components: {
    HomeContent,
    PageLoader,
  },

  computed: {
    ...mapState("profile", ["isLoading"]),
  },
};
</script>
