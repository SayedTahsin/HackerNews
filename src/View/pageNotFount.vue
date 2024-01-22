<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const gotoHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <p class="four">404</p>
    <p>Page Not Found</p>
    <button @click="gotoHome">Back to Home</button>
  </div>
</template>

<style scoped>
div {
  margin: auto;
  text-align: center;
  font-size: 50px;
  justify-content: center;
  align-items: center;
}
.four {
  font-size: 100px;
  font-weight: bold;
}
</style>
