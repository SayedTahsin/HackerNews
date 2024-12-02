<script setup>
import { useAxios } from '@/composables/axios'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import CommentCard from '@/components/CommentCard.vue'
import ContentCard from '@/components/ContentCard.vue'

const route = useRoute()
const id = route.params.id

let commentIds = computed(() => {
  return data.value
})
const fetchData = async () => {
  const response = await useAxios(`item/${id}.json`)
  return response.data?.kids
}

const { data } = useQuery({
  queryKey: ['commentView', id],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false
})
</script>

<template>
  <ContentCard :id="id" />
  <br />
  <div class="mx-auto max-w-5xl">
    <div v-for="id in commentIds">
      <CommentCard :id="id" />
    </div>
  </div>
</template>
