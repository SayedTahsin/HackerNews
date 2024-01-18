<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Nav.vue";
import fallbackLoading from "./components/fallbackLoading.vue";
</script>

<template>
  <Navbar />
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback> <fallbackLoading /></template>
  </Suspense>
</template>

<style scoped></style>
