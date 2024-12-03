<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@/composables/axios'
import { dhm } from '@/utils/commonFunction'
import FallbackLoadingComment from './loader/FallbackLoadingComment.vue'

const router = useRouter()
const props = defineProps(['id'])

const showReply = ref(false)

const time = computed(() => {
  return dhm(data.value?.time)
})
const username = computed(() => {
  return data.value?.by
})
const text = computed(() => {
  return data.value?.text
})
const comments = computed(() => {
  return data.value?.kids || []
})
const numberOfComments = computed(() => {
  return data.value?.kids ? data.value?.kids.length : 0
})
const buttonText = computed(() => {
  return showReply.value === false ? 'Show reply ' + numberOfComments.value + ' [+]' : 'Hide reply ' + '[-]'
})

const toggle = () => {
  showReply.value = !showReply.value
}
const getComment = async () => {
  const response = await useAxios(`item/${props.id}.json`)
  return response.data
}

const { isLoading, data } = useQuery({
  queryKey: ['comment', props.id],
  queryFn: getComment,
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false
})
</script>

<template>
  <FallbackLoadingComment v-if="isLoading" />
  <div v-else class="px-1 lg:px-3 m-1 lg:m-0 mb-1 lg:mb-1 bg-gray-100 dark:bg-gray-300 rounded-lg">
    <div class="text-black text-sm lg:text-md">
      <span class="cursor-pointer text-blue-700 font-bold" @click="router.push(`/user/${username}`)">{{ username }}</span>
      | {{ time }} | {{ numberOfComments }} comments
    </div>
    <hr class="border-t-1 border-black" />
    <div class="text-sm overflow-auto">{{ text }}</div>
    <span class="text-black font-bold text-xs cursor-pointer" v-if="numberOfComments" @click="toggle">{{ buttonText }}</span>
    <div v-if="numberOfComments && showReply">
      <div v-for="id in comments">
        <CommentCard :id="id" />
      </div>
    </div>
  </div>
</template>
