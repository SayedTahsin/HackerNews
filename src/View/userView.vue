<script setup>
import fallbackLoadingUser from "@/components/loader/FallbackLoadingUser.vue";
import { useAxios } from "@/composables/axios";
import { dhm } from "@/utils/commonFunction";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from '@tanstack/vue-query';


const route = useRoute()
const id = route.params.username;

const time = computed(() => {
  return dhm(data.value?.created)
})
const username = computed(() => {
  return data.value?.id
})
const karma = computed(() => {
  return data.value?.karma
})
const about = computed(() => {
  return data.value?.about

})

const getUserInfo = async () => {
  const resp = await useAxios(`user/${id}.json`);
  return resp.data
}

const { data, isLoading } = useQuery({
  queryKey: ['user', id],
  queryFn: getUserInfo,
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
})
</script>
<template>
  <div
    class="text-black dark:text-white mx-2 lg:mx-auto lg:w-3/5 bg-white dark:bg-gray-600 p-1 lg:p-5 text-sm lg:text-lg rounded-lg mt-5 lg:mt-10">
    <fallbackLoadingUser v-if="isLoading" />
    <div v-else>
      <p>Username : {{ username }}</p>
      <p>Karma: {{ karma }}</p>
      <p>Created: {{ time }}</p>
      <p>
        About:
      <div class="border border-black dark:border-white border-opacity-25 p-2 lg:p-4 overflow-auto">{{ about }}</div>
      </p>
    </div>
  </div>
</template>