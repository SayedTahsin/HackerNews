<script setup>
import fallbackLoadingUser from "@/components/fallbackLoadingUser.vue";
import { useAxios } from "@/composables/axios";
import { dhm } from "@/utils/commonFunction";
import { useRoute } from "vue-router";

const route = useRoute()
const id = route.params.username;

const response = await useAxios(`user/${id}.json`);

const time = dhm(response.data.created)
const username = response.data.id
const karma = response.data.karma
const about = response.data.about


</script>
<template>
  <Suspense>
    <template #default>
      <div class="text-black dark:text-white mx-2 lg:mx-auto lg:w-3/5 bg-white dark:bg-gray-600 p-1 lg:p-5 text-sm lg:text-lg rounded-lg mt-5 lg:mt-10">
        <p>Username : {{ username }}</p>
        <p>Karma: {{ karma }}</p>
        <p>Created: {{ time }}</p>
        <p>
          About:
        <div class="border border-black dark:border-white border-opacity-25 p-2 lg:p-4 overflow-auto">{{ about }}</div>
        </p>
      </div>
    </template>
    <template #fallback>
      <fallbackLoadingUser />
    </template>
  </Suspense>
</template>