<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useAxios } from '@/composables/axios'
import ContentCard from '@/components/ContentCard.vue'
import FallbackLoading from '@/components/loader/FallbackLoading.vue'

const props = defineProps(['url'])

let stories = ref([])
const isLoading = ref(false)
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(stories.value.length / 20))
const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * 20
  const end = start + 20
  return stories.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await useAxios(props.url)
    stories.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  isLoading.value = false
}

onMounted(() => {
  fetchData()
})

watchEffect(() => {
  currentPage.value = 1
  fetchData()
})

</script>

<template>
  <div v-if="isLoading">
    <div v-for="i in 20">
      <FallbackLoading />
    </div>
  </div>
  <div v-else>
    <div v-for="id in displayedItems" :key="id">
      <ContentCard :id="id" />
    </div>
  </div>

  <div class="mx-auto text-black dark:text-white w-full text-center text-md lg:text-lg lg:font-bold px-4 py-2">
    <button :disabled="currentPage == 1" @click="prevPage" class="px-4 cursor-pointer">&lt</button>
    <span class="px-4">{{ currentPage }} / {{ totalPages }}</span>
    <button :disabled="currentPage == totalPages" @click="nextPage" class="px-4 cursor-pointer">&gt</button>
  </div>
</template>
