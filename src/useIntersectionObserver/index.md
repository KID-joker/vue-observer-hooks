# useIntersectionObserver

Observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from 'vue-observer-hooks'

const target = ref(null)

useIntersectionObserver(target, (entry) => {
  // todo...
})
</script>

<template>
  <div ref="target" />
</template>
```
