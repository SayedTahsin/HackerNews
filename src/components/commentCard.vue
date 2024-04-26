<script setup>
import FallbackLoadingComment from './fallbackLoadingComment.vue'
import { useAxios } from '@/composables/axios'
import { dhm } from '@/utils/commonFunction'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['id'])

const response = await useAxios(`item/${props.id}.json`)
let showReply = ref(false)
const toggle = () => {
  showReply.value = !showReply.value
}

const time = dhm(response.data.time)
const username = response.data.by
const text = response.data.text

let comments = response.data.kids ? response.data.kids : []
let numberOfComments = response.data.kids ? response.data.kids.length : 0

let buttonText = computed(() => {
  return showReply.value === false ? 'Show reply ' + numberOfComments + ' [+]' : 'Hide reply ' + '[-]'
})
</script>

<template>
  <div class="px-1 lg:px-3 m-1 lg:m-0 mb-1 lg:mb-1 bg-gray-100 dark:bg-gray-300 rounded-lg">
    <div class="text-black text-sm lg:text-md">
      <span class="cursor-pointer text-blue-700 font-bold" @click="router.push(`/user/${username}`)">{{ username }}</span>
      | {{ time }} | {{ numberOfComments }} comments
    </div>
    <hr class="border-t-1 border-black"/>
    <div class="text-sm overflow-auto">{{ text }}</div>
    <span class="text-black font-bold text-xs cursor-pointer" v-if="numberOfComments" @click="toggle">{{ buttonText }}</span>
    <div v-if="numberOfComments && showReply">
      <template v-for="id in comments">
        <Suspense>
          <template #default>
            <commentCard :id="id" />
          </template>
          <template #fallback>
            <FallbackLoadingComment />
          </template>
        </Suspense>
      </template>
    </div>
  </div>
</template>