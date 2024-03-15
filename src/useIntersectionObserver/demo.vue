<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from 'vue-observer-hooks'

const root = ref(null)
const target = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  target,
  ({ isIntersecting }) => {
    isVisible.value = isIntersecting
  },
  { root },
)
</script>

<template>
  <div>
    <div ref="root" class="root">
      <p class="notice">
        Scroll me down!
      </p>
      <div ref="target" class="target">
        <p>Hello world!</p>
      </div>
    </div>
    <div class="text-center">
      Element
      <span :class="isVisible ? 'inside' : 'outside'">
        {{ isVisible ? 'inside' : 'outside' }}
      </span>
      the viewport
    </div>
  </div>
</template>

<style scoped>
.root {
  border: 2px dashed #ccc;
  height: 200px;
  margin: 2rem 1rem;
  overflow-y: scroll;
}
.notice {
  text-align: center;
  padding: 2em 0;
  margin-bottom: 300px;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.8;
}
.target {
  border: 2px dashed #44bd87;
  padding: 10px;
  max-height: 150px;
  margin: 0 2rem 400px;
}
.text-center {
  text-align: center;
}
.inside {
  font-weight: 700;
  color: rgb(62, 175, 124);
}
.outside {
  font-weight: 700;
  color: rgb(251, 146, 60)
}
</style>
