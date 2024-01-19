<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import {dhm} from "../commonFunction.js";

const route = useRoute();
const response = await axios.get(
  `https://hacker-news.firebaseio.com/v0/user/${route.params.username}.json?print=pretty`
);

const time = dhm(response.data.created);
const username = response.data.id;
const karma = response.data.karma;
const about = response.data.about;
</script>
<template>
  <div class="profile">
    <p>Username : {{ username }}</p>
    <p>Karma: {{ karma }}</p>
    <p>Created: {{ time }}</p>
    <p>
      About: <div class="about">{{ about }}</div>
    </p>
  </div>
</template>

<style scoped>
.profile {
  color: black;
  margin: auto;
  width: 50%;
  background-color: white;
  padding: 20px;
  font-size: 20px;
}
.about {
  border: 2px solid rgba(0, 0, 0, 0.200);
  padding: 10px;
}
</style>
