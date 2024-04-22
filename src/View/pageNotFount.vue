<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const gotoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="mx-auto text-center text-4xl flex flex-col justify-center items-center" >
  <p class="text-6xl font-bold">404</p>
  <div>
    <p class="mb-2">Page Not Found</p>
    <button @click="gotoHome" class="hover:bg-gray-200 hover:text-gray-800 hover:border-gray-400 px-4 py-2 rounded-md border border-gray-300" >Back to Home</button>
  </div>
</div>
</template>