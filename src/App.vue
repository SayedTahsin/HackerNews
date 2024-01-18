<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Nav.vue";
</script>

<template>
  <Navbar />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
