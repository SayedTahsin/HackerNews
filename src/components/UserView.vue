<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();
const response = await axios.get(
  `https://hacker-news.firebaseio.com/v0/user/${route.params.username}.json?print=pretty`
);
function dhm(t) {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000);
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  if (d != 0) return `created ${d} days ago`;
  else return `created ${h} hours ago`;
}
const time = dhm(response.data.created);
</script>
<template>
  <p>username : {{ response.data.id }}</p>
  <p>Karma: {{ response.data.karma }}</p>
  <p>created: {{ time }}</p>
  <p>About: {{ response.data.about }}</p>
</template>

<style scoped></style>
