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
        <h1 class="display-2 font-weight-bold mb-3">Login Successful!</h1>

        <p class="subheading font-weight-regular">
          Hi {{ userDetails.full_name || "User" }}, thank you for using the app!
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeContent",
  computed: {
    ...mapState("auth", ["userDetails"]),
  },
};
</script>
