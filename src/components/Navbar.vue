<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import DarkModeIcon from './icons/DarkModeIcon.vue'
import LightModeIcon from './icons/LightModeIcon.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isMenuOpen = ref(false)
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

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="h-16 bg-orange-700 dark:bg-black flex justify-between items-center text-white px-2 md:px-96">
    <RouterLink class="no-underline font-bold text-xl" active-class="font-bold text-3xl" to="/"><span>HackerNews</span> </RouterLink>
    <div class="flex justify-between space-x-4">
      <button class="hover:scale-110 transition-all ease-out hover:cursor-pointer" @click="toggleDark()">
        <DarkModeIcon v-if="isDark" />
        <LightModeIcon v-else />
      </button>

      <!-- This div is for hamburger menu in mobile device -->
      <div class="sm:hidden relative">
        <button class="focus:outline-none text-white pt-2" @click="toggleMenu()">
          <HamburgerIcon />
        </button>
        <ul
          v-if="isMenuOpen"
          class="absolute top-full right-0 mt-2 py-1 w-36 bg-opacity-90 dark:bg-opacity-90 dark:bg-gray-900 bg-white text-black dark:text-white shadow-lg rounded-md overflow-hidden list-none"
        >
          <RouterLink v-for="route in routes" class="no-underline" active-class="font-bold underline" :to="route.to">
            <li class="text-right px-2">{{ route.title }}</li>
            <hr />
          </RouterLink>
        </ul>
      </div>
      <!-- Options for desktop -->
      <ul class="hidden sm:flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
        <RouterLink v-for="route in routes" class="no-underline" active-class="font-bold underline" :to="route.to">{{ route.title }}</RouterLink>
      </ul>
    </div>
  </div>
</template>
