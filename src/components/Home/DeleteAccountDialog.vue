<template>
  <v-row justify="center" class="mt-5">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="error" v-bind="attrs" v-on="on">Delete Account</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Delete Account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <p>Enter your password to confirm deletion of account</p>
              <v-col cols="12">
                <v-text-field
                  name="password"
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password"
                  :rules="rules.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  outlined
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-1" text @click="closeDialog">
            Close
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteAccount">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "DeleteAccountDialog",
  data() {
    return {
      password: "",
      showDialog: false,
      // Toggle showing of password field
      showPassword: false,
      // Validation rules for input fields in form
      rules: {
        // Validation to check if password is present
        password: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    closeDialog() {
      this.password = "";
      this.showDialog = false;
    },
    deleteAccount() {
      if (this.password && this.password.length) {
        this.$store.dispatch("profile/deleteAccount", this.password);
        this.closeDialog();
      }
    },
  },
};
</script>
