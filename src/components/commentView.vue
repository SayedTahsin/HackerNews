<script setup>
import { useRoute } from "vue-router";
import Content from "./contentCard.vue";
import commentCard from "./commentCard.vue";
import axios from "axios";
import { ref } from "vue";

const route = useRoute();
const id = route.params.id;

let commentIds = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    commentIds.value = response.data.kids;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchData();
</script>
<template>
  <Suspense>
    <template #default>
      <Content :id="id" />
    </template>
    <template #fallback>Loading...</template>
  </Suspense>

  <template v-for="id in commentIds">
    <Suspense>
      <template #default>
        <commentCard :id="id" />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </template>
</template>

<style scoped></style>
