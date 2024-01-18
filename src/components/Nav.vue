<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="navbar">
    <RouterLink active-class="active" to="/">HackerNews</RouterLink>
    &nbsp;
    <RouterLink active-class="active" to="/new">New</RouterLink>
    &nbsp;
    <RouterLink active-class="active" to="/best">Best</RouterLink>
    &nbsp;
    <RouterLink active-class="active" to="/show">Show</RouterLink>
    &nbsp;
    <RouterLink active-class="active" to="/ask">Ask</RouterLink>
    &nbsp;
    <RouterLink active-class="active" to="/jobs">Jobs</RouterLink>
  </div>
</template>

<style scoped>
.navbar {
  height: 50px;
  background-color: rgb(243, 89, 0);
  margin: auto;
  width: 100%;
  padding: 10px;
  text-align: center;
}

.active {
  font-weight: bold;
  font-size: 20px;
}
</style>
