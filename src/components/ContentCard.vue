<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useQuery } from '@tanstack/vue-query'
import { dhm, extractDomain } from '@/utils/commonFunction'
import FallbackLoading from '@/components/loader/FallbackLoading.vue'

const router = useRouter()
const props = defineProps(['id'])

const domain = computed(() => {
  return data.value?.url ? extractDomain(data.value?.url) : ''
})
const time = computed(() => {
  return dhm(data.value?.time)
})
const username = computed(() => {
  return data.value?.by
})
const score = computed(() => {
  return data.value?.score
})
const title = computed(() => {
  return data.value?.title
})
const numberOfComments = computed(() => {
  return data.value?.descendants
})
const isJob = computed(() => {
  return data.value?.type === 'job'
})

const getContent = async () => {
  const response = await useAxios(`item/${props.id}.json`)
  return response.data
}

const { isLoading, data } = useQuery({
  queryKey: ['content', props.id],
  queryFn: getContent,
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false
})
</script>

<template>
  <FallbackLoading v-if="isLoading" />
  <div v-else class="lg:mx-auto m-2 lg:w-3/5 p-4 flex bg-gray-100 dark:bg-gray-300 rounded-lg">
    <div
      class="mx-1 my-auto lg:mx-0 px-2 w-10 lg:w-12 h-10 lg:h-12 text-sm lg:text-lg font-bold flex justify-center items-center border border-gray-200 dark:border-gray-400 rounded-lg text-orange-500 dark:text-black"
    >
      {{ score }}
    </div>
    <div class="lg:pl-5 ml-2 lg:ml-5">
      <div class="lg:text-lg">
        <a class="text-black font-bold text-sm lg:text-lg hover:text-black hover:underline" :href="data?.url" target="_blank">{{ title }}</a>
        <span v-if="data?.url" class="hidden lg:inline-block text-sm"> ( {{ domain }} )</span>
      </div>
      by
      <span class="cursor-pointer text-blue-700 font-bold text-sm lg:text-lg" @click="router.push(`/user/${username}`)">{{ username }}</span>
      <span v-if="!isJob">
        |
        <RouterLink class="text-black hover:text-black hover:underline text-sm lg:text-lg" :to="`/news/${props.id}/details`">{{ numberOfComments }} comments</RouterLink>
      </span>
      <span class="hidden lg:inline-block"> | {{ time }}</span>
    </div>
  </div>
</template>
