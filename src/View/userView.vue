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
      <div class="text-black mx-auto w-3/5 bg-white p-5 text-lg">
        <p>Username : {{ username }}</p>
        <p>Karma: {{ karma }}</p>
        <p>Created: {{ time }}</p>
        <p>
          About:
        <div class="border border-black border-opacity-25 p-4">{{ about }}</div>
        </p>
      </div>
    </template>
    <template #fallback>
      <fallbackLoadingUser />
    </template>
  </Suspense>
</template>