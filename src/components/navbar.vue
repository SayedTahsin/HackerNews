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
  <div class="navbar">
    <RouterLink class="no-underline box" active-class="active" to="/"><span>HackerNews</span></RouterLink>
    <div class="newBest">
      <RouterLink v-for="route in routes" class="no-underline box" active-class="active" :to="route.to">{{ route.title }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.no-underline {
  color: white;
  text-decoration: none;
  font-size: large;
}

.active {
  font-weight: bold;
  font-size: large;
  text-decoration: underline;
}
.navbar {
  height: 70px;
  background-color: rgb(216, 79, 0);
  width: 100%;
  padding-top: 1%;
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
  justify-content: space-between;
}

.newBest {
  display: flex;
  justify-content: space-between;
}
.box {
  padding-left: 6px;
}

span {
  font-size: 25px;
  font-weight: bold;
}
</style>
