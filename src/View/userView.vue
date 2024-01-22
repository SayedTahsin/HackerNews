<script setup>
import FallbackLoading from "@/components/fallbackLoading.vue";
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
  <div class="profile">
    <p>Username : {{ username }}</p>
    <p>Karma: {{ karma }}</p>
    <p>Created: {{ time }}</p>
    <p>
      About: <div class="about">{{ about }}</div>
    </p>
  </div>
</template>
<template #fallback>
  <FallbackLoading/>
</template>
</Suspense>
</template>

<style scoped>
.profile {
  color: black;
  margin: auto;
  width: 50%;
  background-color: white;
  padding: 20px;
  font-size: 20px;
}
.about {
  border: 2px solid rgba(0, 0, 0, 0.200);
  padding: 10px;
}
</style>