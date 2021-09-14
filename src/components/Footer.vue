<template>
  <v-footer dark padless>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat tile class="primary text-center">
          <v-card-text>
            <v-btn
              v-for="link in links"
              :key="link.icon"
              :href="link.url"
              target="_blank"
              class="mx-4 white--text"
              icon
              outlined
            >
              <v-icon size="24px">
                {{ link.icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            U-Reg is a user registration system designed and developed
            exclusively for Appetiser Apps
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            Created by <strong>Eric Joseph P. Flores</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        icon: "mdi-linkedin",
        url: "https://www.linkedin.com/in/eric-joseph-flores-b3a36a153/",
      },
      {
        icon: "mdi-github",
        url: "https://github.com/AgentProxy",
      },
      {
        icon: "mdi-gitlab",
        url: "https://gitlab.com/AgentProxy",
      },
      {
        icon: "mdi-email",
        url: "mailto:ericjoseph.flores1@gmail.com",
      },
    ],
  }),
};
</script>
