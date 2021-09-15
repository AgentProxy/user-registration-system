<template>
  <v-alert
    @input="toggleAlert"
    id="alert-box"
    :type="message.type"
    elevation="5"
    dismissible
    :value="showAlert"
  >
    <div class="text-h6 mt-0">{{ message.title }}</div>
    <div class="text-subtitle-1">{{ message.body }}</div>
  </v-alert>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      timer: null,
    };
  },
  props: {
    // Default timeout to auto-close is 3 seconds
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  watch: {
    showAlert(oldValue, newValue) {
      // Start auto close feature once alert box was shown
      if (oldValue && !newValue) {
        this.timer = setTimeout(() => {
          this.toggleAlert();
        }, this.timeout);
      }
    },
  },
  computed: {
    ...mapState("alert", ["message", "showAlert"]),
  },
  methods: {
    toggleAlert() {
      // Clear the timeout on close
      if (this.showAlert && this.timer) {
        clearTimeout(this.timer);
      }
      this.$store.commit("alert/SHOW_ALERT", !this.showAlert);
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
