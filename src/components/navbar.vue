<script setup>
import { RouterLink } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
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
  <div class="h-16 bg-orange-700 dark:bg-black flex justify-between items-center text-white px-96">
    <RouterLink class="no-underline font-bold text-xl" active-class="font-bold text-3xl" to="/"><span>HackerNews</span></RouterLink>
    <div class="flex justify-between space-x-4">
      <label class="switch">
        <input type="checkbox" @click="toggleDark()" :checked="isDark" />
        <span class="slider round"></span>
      </label>
      <RouterLink v-for="route in routes" class="no-underline" active-class="font-bold underline" :to="route.to">{{ route.title }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 0.5px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
