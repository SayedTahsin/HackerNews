<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Nav.vue";
import fallbackLoading from "./components/fallbackLoading.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <Navbar />
  <div>
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback> <fallbackLoading /></template>
    </Suspense>
  </div>
  <Footer />
</template>

<style scoped>
div {
  background-color: rgb(250, 250, 250);
}
</style>
