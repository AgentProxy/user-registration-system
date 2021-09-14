<template>
  <div>
    <HomeContent />
    <Footer />
  </div>
</template>

<script>
import HomeContent from "../components/Home/HomeContent";
import Footer from "../components/Footer";

export default {
  name: "Home",

  components: {
    Footer,
    HomeContent,
  },
};
</script>
