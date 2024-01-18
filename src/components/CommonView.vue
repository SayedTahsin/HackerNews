<script setup>
import Content from "./contentCard.vue";
import axios from "axios";
import { ref, computed, watchEffect } from "vue";
import fallbackLoading from "./fallbackLoading.vue";

const props = defineProps(["url"]);

let stories = ref([]);
const fetchData = async () => {
  try {
    const response = await axios.get(props.url);
    stories.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchData();

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(stories.value.length / 20));

const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * 20;
  const end = start + 20;
  return stories.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watchEffect(() => {
  currentPage.value = 1;
  fetchData();
});
</script>

<template>
  <template v-for="id in displayedItems" :key="id">
    <Suspense>
      <template #default>
        <Content :id="id" />
      </template>
      <template #fallback>
        <fallbackLoading />
      </template>
    </Suspense>
  </template>

  <div class="button">
    <button @click="prevPage">&lt</button>
    <button @click="nextPage">&gt</button>
    <p>{{ currentPage }} / {{ totalPages }}</p>
  </div>
</template>

<style scoped>
.button {
  margin: auto;
  width: 100%;
  text-align: center;
  padding: 10px;
}
</style>
