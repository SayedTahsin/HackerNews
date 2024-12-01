<script setup>
import fallbackLoadingUser from "@/components/loader/FallbackLoadingUser.vue";
import { useAxios } from "@/composables/axios";
import { dhm } from "@/utils/commonFunction";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const id = route.params.username;

const responseObject = ref({})

const time = computed(() => {
  return dhm(responseObject.value.created)
})
const username = computed(() => {
  return responseObject.value.id
})
const karma = computed(() => {
  return responseObject.value.karma
})
const about = computed(() => {
  return responseObject.value.about

})

const getUserInfo = async () => {
  try {
    const resp = await useAxios(`user/${id}.json`);
    responseObject.value = resp.data
  } catch (e) {
    console.log(e)
  }
}
onMounted(() => {
  getUserInfo()
})

</script>
<template>
  <div
    class="text-black dark:text-white mx-2 lg:mx-auto lg:w-3/5 bg-white dark:bg-gray-600 p-1 lg:p-5 text-sm lg:text-lg rounded-lg mt-5 lg:mt-10">
    <div v-if="username">
      <p>Username : {{ username }}</p>
      <p>Karma: {{ karma }}</p>
      <p>Created: {{ time }}</p>
      <p>
        About:
      <div class="border border-black dark:border-white border-opacity-25 p-2 lg:p-4 overflow-auto">{{ about }}</div>
      </p>
    </div>
    <fallbackLoadingUser v-else />
  </div>
</template>