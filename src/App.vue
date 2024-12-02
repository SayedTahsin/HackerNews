<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar class="sticky top-0 z-50" />
    <div class="flex-grow bg-gray-300 dark:bg-gray-800">
      <RouterView />
    </div>
    <Footer class="mt-auto" />
  </div>
  <VueQueryDevtools />
</template>
