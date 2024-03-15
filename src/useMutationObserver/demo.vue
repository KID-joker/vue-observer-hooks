<script setup>
import { ref } from 'vue'
import { useMutationObserver } from 'vue-observer-hooks'

const el = ref(null)
const messages = ref([])
const className = ref({})
const style = ref({})

useMutationObserver(
  el,
  (mutation) => {
    if (!mutation)
      return

    messages.value.push(mutation.attributeName)
  },
  { attributes: true },
)

setTimeout(() => {
  className.value = {
    test: true,
    test2: true,
  }
}, 1000)

setTimeout(() => {
  style.value = {
    color: 'red',
  }
}, 1550)
</script>

<template>
  <div>
    <div ref="el" :class="className" :style="style">
      <div v-for="(text, index) of messages" :key="index">
        Mutation Attribute: {{ text }}
      </div>
    </div>
  </div>
</template>
