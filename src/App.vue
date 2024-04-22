<script setup>
import FallbackLoading from '@/components/fallbackLoading.vue'
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-screen">
  <Navbar class="sticky top-0 z-50"/>
  <div class="flex-grow">
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <FallbackLoading />
      </template>
    </Suspense>
  </div>
  <Footer class="mt-auto"/>
</div>
  
</template>
