<template>
  <nav-bar />
  <router-view />
  <footer-component />
</template>

<script>

import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/footer.vue";

export default {
  name: 'App',
  components: {
    FooterComponent,
    NavBar
  },

}
</script>

<style>

</style>
