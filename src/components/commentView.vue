<script setup>
import { useRoute } from "vue-router";
import Content from "./contentCard.vue";
import commentCard from "./commentCard.vue";
import fallbackLoading from "./fallbackLoading.vue";
import Footer from "./footer.vue";
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
    <template #fallback><fallbackLoading /></template>
  </Suspense>
  <br />
  <div class="comments">
    <template v-for="id in commentIds">
      <Suspense>
        <template #default>
          <commentCard :id="id" />
        </template>
        <template #fallback> <fallbackLoading /></template>
      </Suspense>
    </template>
  </div>
  <Footer />
</template>

<style scoped>
.comments {
  margin-left: 450px;
  margin-right: 450px;
}
</style>
