<script setup>
import FallbackLoading from '@/components/fallbackLoading.vue'
import Navbar from '@/components/navbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Navbar />
  <div>
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <FallbackLoading />
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
div {
  background-color: rgb(250, 250, 250);
}
</style>

<!-- 
Changes Needed in Your Final Project
- Use a composable called useAxios and use that axios
-->
