<template>
  <v-alert
    id="alert-box"
    v-model="showAlert"
    :type="message.type"
    elevation="5"
    dismissible
  >
    <div class="text-h6 mt-0">{{ message.title }}</div>
    <div class="text-subtitle-1">{{ message.body }}</div>
  </v-alert>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("alert", ["message", "showAlert"]),
    // Toggles the display status of the alert box
    showAlert: {
      get() {
        return this.$store.state.alert.showAlert;
      },
      set(alertState) {
        this.$store.commit("alert/SHOW_ALERT", alertState);
      },
    },
  },
};
</script>

<style scoped>
#alert-box {
  position: fixed;
  right: 10px;
  top: 20px;
  z-index: 999;
  width: 400px;
}

@media screen and (max-width: 600px) {
  #alert-box {
    width: 300px;
  }
}
</style>
