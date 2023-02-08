<template>
  <div class="container mx-auto">
    <footer class="footer footer-center p-10 bg-base-100 text-base-content border-t-primary border-t-2 my-8">
      <div class="grid grid-flow-col gap-4">
        <router-link to="/contact" class="link link-hover">Contact</router-link>
        <router-link to="/feedback" class="link link-hover">Feedback</router-link>
      </div>
      <div>
        <p class="font-mono">
          Anicha
        </p>
        <p class="font-mono">
          anime and manga challenges tracking made easy ... probably
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footerComponent"
}
</script>

<style scoped>

</style>