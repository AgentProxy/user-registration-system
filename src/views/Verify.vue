<template>
  <div>
    <PageLoader v-if="isLoading" />
    <VerifyForm v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageLoader from "../components/PageLoader.vue";
import VerifyForm from "../components/Verify/VerifyForm.vue";

export default {
  components: {
    PageLoader,
    VerifyForm,
  },

  computed: {
    ...mapState("profile", ["isLoading", "userDetails"]),
  },
};
</script>
