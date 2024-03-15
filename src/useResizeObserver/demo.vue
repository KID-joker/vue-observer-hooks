<script setup>
import { ref } from 'vue'
import { useResizeObserver } from 'vue-observer-hooks'

const el = ref(null)
const text = ref('')

useResizeObserver(el, (entry) => {
  const { width, height } = entry.contentRect
  text.value = `width: ${width}\nheight: ${height}`
})
</script>

<template>
  <div>
    <div class="note">
      Resize the box to see changes
    </div>
    <textarea ref="el" class="resizer" disabled v-text="text" />
  </div>
</template>

<style scoped>
.note {
  margin-bottom: 0.5rem;
  opacity: .7;
  font-size: .9rem;
}
.resizer {
  display: block;
  resize: both;
  margin: 0.5rem 0;
  padding: 1rem;
  min-width: 20rem;
  width: 200px;
  height: 200px;
  border: 1px solid #e2e2e3;
  box-shadow: #e2e2e3 0 0 0 1px;
  border-radius: 4px;
  background: #fff;
  outline: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow: hidden;
  font-size: 1rem;
}
</style>
