<script setup>
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(["id"]);
const response = await axios.get(
  `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`
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
  else if (h != 0) return `created ${h} hours ago`;
  else return `created ${m} minutes ago`;
}
const time = dhm(response.data.time);
const username = response.data.by;
</script>

<template>
  <div v-if="response.data.type != 'comment'" class="cardDiv">
    <div>
      <div class="score">{{ response.data.score }}</div>
      <div>
        <div class="title">
          <a :href="response.data.url" target="_blank">{{
            response.data.title
          }}</a>
          <span v-if="response.data.url"> ( {{ response.data.url }} )</span>
        </div>
        <span @click="router.push(`/user/${username}`)">{{ username }}</span>
        |
        <RouterLink :to="`/news/${props.id}/details`"
          >{{ response.data.descendants }} comments</RouterLink
        >
        | <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardDiv {
  border: 2px solid black;
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>
