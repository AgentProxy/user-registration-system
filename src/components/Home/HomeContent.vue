<template>
  <v-container>
    <v-row class="text-center">
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
        <h1 class="display-2 font-weight-bold mb-3">Login successful!</h1>

        <p class="subheading font-weight-regular">
          Hi {{ (userDetails && userDetails.full_name) || "User" }}, thank you
          for using the app!
        </p>
        <DeleteAccountButton />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DeleteAccountButton from "./DeleteAccountButton.vue";
export default {
  name: "HomeContent",
  components: {
    DeleteAccountButton,
  },
  computed: {
    ...mapState("profile", ["userDetails"]),
  },
};
</script>
