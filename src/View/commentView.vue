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
const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await useAxios(`item/${id}.json`)
    commentIds.value = response.data.kids
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  isLoading.value = false
}
fetchData()
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
