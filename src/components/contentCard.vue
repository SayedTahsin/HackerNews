<script setup>
import { useAxios } from '@/composables/axios'
import { dhm, extractDomain } from '@/utils/commonFunction'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['id'])
const response = await useAxios(`item/${props.id}.json`)

const domain = response.data.url ? extractDomain(response.data.url) : ''
const time = dhm(response.data.time)
const username = response.data.by
const score = response.data.score
const title = response.data.title
const numberOfComments = response.data.descendants
const isJob = response.data.type === 'job'
</script>

<template>
  <div class="cardDiv">
    <div class="score">{{ score }}</div>
    <div class="content">
      <div class="title">
        <a class="no-underline underline-on-hover" :href="response.data.url" target="_blank">{{ title }}</a>
        <span v-if="response.data.url"> ( {{ domain }} )</span>
      </div>
      by
      <span class="underline-on-hover" @click="router.push(`/user/${username}`)">{{ username }}</span>

      <span v-if="!isJob">
        |
        <RouterLink class="no-underline underline-on-hover" :to="`/news/${props.id}/details`">{{ numberOfComments }} comments</RouterLink>
      </span>
      | <span>{{ time }}</span>
    </div>
  </div>
</template>

<style scoped>
.cardDiv {
  margin: auto;
  width: 50%;
  padding: 10px;
  display: flex;
  background-color: rgb(240, 240, 240);
  margin-bottom: 3px;
  border-radius: 10px;
}
.content {
  padding-left: 20px;
  margin-left: 20px;
}
.score {
  width: 50px;
  font-size: larger;
  color: rgb(255, 115, 0);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 10px;
}
.title {
  font-size: large;
}
.title > span {
  font-size: small;
}
.no-underline {
  color: black;
  text-decoration: none;
}
.underline-on-hover:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
