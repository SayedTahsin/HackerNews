<script setup>
import CommentCard from '@/components/commentCard.vue'
import ContentCard from '@/components/contentCard.vue'
import FallbackLoading from '@/components/fallbackLoading.vue'
import Footer from '@/components/footer.vue'
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
  <div class="comments">
    <template v-for="id in commentIds">
      <Suspense>
        <template #default>
          <CommentCard :id="id" />
        </template>
        <template #fallback> <FallbackLoading /></template>
      </Suspense>
    </template>
  </div>
  <Footer />
</template>

<style scoped>
.comments {
  margin-left: 450px;
  margin-right: 450px;
}
</style>
