<script setup>
import FallbackLoading from '@/components/fallbackLoading.vue'
import { useAxios } from '@/composables/axios'
import { dhm } from '@/utils/commonFunction'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['id'])

const response = await useAxios(`item/${props.id}.json`)
let showReply = ref(false)
const toggle = () => {
  showReply.value = !showReply.value
}

const time = dhm(response.data.time)
const username = response.data.by
const text = response.data.text

let comments = response.data.kids ? response.data.kids : []
let numberOfComments = response.data.kids ? response.data.kids.length : 0

let buttonText = computed(() => {
  return showReply.value === false ? 'Show reply ' + numberOfComments + ' [+]' : 'Hide reply ' + '[-]'
})
</script>

<template>
  <div class="comment">
    <div class="head">
      <span class="changeCursor" @click="router.push(`/user/${username}`)">{{ username }}</span>
      | {{ time }} | {{ numberOfComments }} comments
    </div>
    <hr />
    <div>{{ text }}</div>
    <span class="btn changeCursor" v-if="numberOfComments" @click="toggle">{{ buttonText }}</span>
    <div class="subcomment" v-if="numberOfComments && showReply">
      <template v-for="id in comments">
        <Suspense>
          <template #default>
            <commentCard :id="id" />
          </template>
          <template #fallback>
            <FallbackLoading />
          </template>
        </Suspense>
      </template>
    </div>
  </div>
</template>

<style scoped>
.comment {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 2px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
}
.head {
  color: black;
}
.head span {
  color: rgb(255, 115, 0);
}
.btn {
  color: black;
  font-weight: bold;
  font-size: 12px;
}
.changeCursor {
  cursor: pointer;
}
</style>
