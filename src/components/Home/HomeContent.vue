<template>
  <v-container class="fill-height">
    <v-row class="text-center py-8">
      <v-col cols="12">
        <v-img
          :src="require('../../assets/congrats.gif')"
          class="my-3"
          alt="Congrats!"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 primary--text">
          Login successful!
        </h1>

        <p class="subheading font-weight-regular">
          Hi {{ (userDetails && userDetails.full_name) || "User" }}, thank you
          for using the app!
        </p>
        <DeleteAccountDialog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DeleteAccountDialog from "./DeleteAccountDialog.vue";
export default {
  name: "HomeContent",
  components: {
    DeleteAccountDialog,
  },
  computed: {
    ...mapState("profile", ["userDetails"]),
  },
};
</script>
