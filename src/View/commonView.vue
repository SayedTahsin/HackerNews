<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useAxios } from '@/composables/axios'
import { useQuery } from '@tanstack/vue-query'
import ContentCard from '@/components/ContentCard.vue'
import FallbackLoading from '@/components/loader/FallbackLoading.vue'

const props = defineProps(['url'])

const itemsPerPage = 20
const stories = ref([])
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(stories.value.length / itemsPerPage))
const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  stories.value = data.value
  return stories.value?.slice(start, end)
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
  const response = await useAxios(props.url)
  return response.data
}

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['stories', props.url],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false
})

watchEffect(() => {
  currentPage.value = 1
  fetchData()
})
</script>

<template>
  <div v-if="isLoading">
    <div v-for="i in itemsPerPage">
      <FallbackLoading />
    </div>
  </div>
  <div v-else-if="isError"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto mt-4 max-w-md" role="alert">
    <strong class="font-bold">Error:</strong>
    <span class="block sm:inline">{{ error.message }}</span>
  </div>
  <div v-else>
    <div v-for="id in displayedItems" :key="id">
      <ContentCard :id="id" />
    </div>
  </div>

  <div v-if="!isError && !isLoading"
    class="mx-auto text-black dark:text-white w-full text-center text-md lg:text-lg lg:font-bold px-4 py-2">
    <button :disabled="currentPage == 1" @click="prevPage" class="px-4 cursor-pointer">&lt</button>
    <span class="px-4">{{ currentPage }} / {{ totalPages }}</span>
    <button :disabled="currentPage == totalPages" @click="nextPage" class="px-4 cursor-pointer">&gt</button>
  </div>
</template>
