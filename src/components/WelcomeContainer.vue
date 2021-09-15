<template>
  <v-container id="welcome-container" class="pa-0">
    <div id="logo-container">
      <img id="logo" alt="Vuetify Logo" src="../assets/u-reg-logo.png" />
    </div>
  </v-container>
</template>
<style scoped>
#welcome-container {
  background-image: url("../assets/welcome.png");
  height: 100%;
}

#logo-container {
  top: 80px;
  position: relative;
  z-index: 999;
  width: 100%;
  text-align: center;
}

#logo {
  width: 300px;
}
</style>
