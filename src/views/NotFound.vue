<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-icon id="emoticon"> mdi-emoticon-cry </v-icon>
        <h1 class="text-md-h2 text-h3 text-center">404 Page Not Found</h1>
        <p class="py-5">The requested page was not found</p>
        <v-btn @click="$router.push('/')" large color="primary">
          BACK TO HOME
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
#emoticon {
  font-size: 10em;
}
</style>
