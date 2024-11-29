<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { dhm, extractDomain } from '@/utils/commonFunction'

const router = useRouter()
const props = defineProps(['id'])

const responseObject = ref({})

const domain = computed(() => {
  return responseObject.value.url ? extractDomain(responseObject.value.url) : ''
})
const time = computed(() => {
  return dhm(responseObject.value.time)
})
const username = computed(() => {
  return responseObject.value.by
})
const score = computed(() => {
  return responseObject.value.score
})
const title = computed(() => {
  return responseObject.value.title
})
const numberOfComments = computed(() => {
  return responseObject.value.descendants
})
const isJob = computed(() => {
  return responseObject.value.type === 'job'
})

const getContent = async () => {
  try {
    const response = await useAxios(`item/${props.id}.json`)
    responseObject.value = response.data
  } catch (e) {
    console.log(e)
  }
}
onMounted(() => {
  getContent()
})
</script>

<template>
  <div class="lg:mx-auto m-2 lg:w-3/5 p-4 flex bg-gray-100 dark:bg-gray-300 rounded-lg">
    <div
      class="mx-1 my-auto lg:mx-0 px-2 w-10 lg:w-12 h-10 lg:h-12 text-sm lg:text-lg font-bold flex justify-center items-center border border-gray-200 dark:border-gray-400 rounded-lg text-orange-500 dark:text-black"
    >
      {{ score }}
    </div>
    <div class="lg:pl-5 ml-2 lg:ml-5">
      <div class="lg:text-lg">
        <a class="text-black font-bold text-sm lg:text-lg hover:text-black hover:underline" :href="responseObject.value?.url" target="_blank">{{ title }}</a>
        <span v-if="responseObject.value?.url" class="hidden lg:inline-block text-sm"> ( {{ domain }} )</span>
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
