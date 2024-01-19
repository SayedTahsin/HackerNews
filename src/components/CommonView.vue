<script setup>
import Content from "./contentCard.vue";
import axios from "axios";
import { ref, computed, watchEffect } from "vue";
import fallbackLoading from "./fallbackLoading.vue";
import Footer from "./footer.vue";
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
    <button :disabled="currentPage == 1" @click="prevPage" class="prev-next">
      &lt
    </button>
    <span class="pages">{{ currentPage }} / {{ totalPages }}</span>
    <button
      :disabled="currentPage == totalPages"
      @click="nextPage"
      class="prev-next"
    >
      &gt
    </button>
  </div>
  <Footer />
</template>

<style scoped>
.button {
  margin: auto;
  width: 100%;
  text-align: center;
  padding: 10px;
}
.prev-next {
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: black;
  cursor: pointer;
}

.pages {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
}

.underline-on-hover:hover {
  text-decoration: underline;
}
</style>
