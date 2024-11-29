<script setup>
import CommentCard from '@/components/CommentCard.vue'
import ContentCard from '@/components/ContentCard.vue'
import FallbackLoading from '@/components/loader/FallbackLoading.vue'
import FallbackLoadingComment from '@/components/loader/FallbackLoadingComment.vue'
import { useAxios } from '@/composables/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

let commentIds = ref([])

const fetchData = async () => {
  try {
    const response = await useAxios(`item/${id}.json`)
    commentIds.value = response.data.kids
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
fetchData()
</script>
<template>
  <Suspense>
    <template #default>
      <ContentCard :id="id" />
    </template>
    <template #fallback><FallbackLoading /></template>
  </Suspense>
  <br />
  <div class="mx-auto max-w-5xl">
    <template v-for="id in commentIds">
      <Suspense>
        <template #default>
          <CommentCard :id="id" />
        </template>
        <template #fallback> <FallbackLoadingComment /></template>
      </Suspense>
    </template>
  </div>
</template>
