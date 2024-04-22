<script setup>
import { RouterLink } from 'vue-router'
const routes = [
  {
    title: 'New',
    to: '/new'
  },
  {
    title: 'Best',
    to: '/best'
  },
  {
    title: 'Show',
    to: '/show'
  },

  {
    title: 'Ask',
    to: '/ask'
  },

  {
    title: 'Jobs',
    to: '/jobs'
  }
]
</script>

<template>
  <div class="h-16 bg-orange-700 flex justify-between items-center text-white px-96">
    <RouterLink class="no-underline font-bold text-xl" active-class="font-bold text-3xl" to="/"><span>HackerNews</span></RouterLink>
    <div class="flex justify-between space-x-4">
      <RouterLink v-for="route in routes" class="no-underline" active-class="font-bold underline" :to="route.to">{{ route.title }}</RouterLink>
    </div>
  </div>
</template>
