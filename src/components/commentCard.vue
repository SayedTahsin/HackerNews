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
let comments = [];
let numberOfComments = 0;
if (response.data.kids) {
  numberOfComments = response.data.kids.length;
  comments = response.data.kids;
}
</script>

<template>
  <div class="comment">
    <div class="head">
      <span @click="router.push(`/user/${username}`)">{{ username }}</span> |
      {{ time }} | {{ numberOfComments }}
    </div>
    <hr />
    <div>{{ response.data.text }}</div>
    <div class="subcomment" v-if="numberOfComments">
      <template v-for="id in comments">
        <commentCard :id="id"></commentCard>
      </template>
    </div>
  </div>
</template>

<style scoped>
.subcomment {
  background-color: rgb(226, 226, 226);
}
</style>

<!-- https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty -->

<!-- {
    "by" : "norvig",
    "id" : 2921983,
    "kids" : [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ],
    "parent" : 2921506,
    "text" : "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
    "time" : 1314211127,
    "type" : "comment"
  } -->
