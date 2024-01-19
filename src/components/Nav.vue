<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="navbar">
    <div class="hackernews">
      <RouterLink class="no-underline" active-class="active" to="/"
        >HackerNews</RouterLink
      >
    </div>
    <div class="newBest">
      <RouterLink class="no-underline box" active-class="active" to="/new"
        >New</RouterLink
      >
      <RouterLink class="no-underline box" active-class="active" to="/best"
        >Best</RouterLink
      >
      <RouterLink class="no-underline box" active-class="active" to="/show"
        >Show</RouterLink
      >
      <RouterLink class="no-underline box" active-class="active" to="/ask"
        >Ask</RouterLink
      >
      <RouterLink class="no-underline box" active-class="active" to="/jobs"
        >Jobs</RouterLink
      >
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
</style>
