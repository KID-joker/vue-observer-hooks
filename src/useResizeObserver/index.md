# useResizeObserver

Reports changes to the dimensions of an Element's content or border box.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { useResizeObserver } from 'vue-observer-hooks'

const el = ref(null)

useResizeObserver(el, (entry) => {
  // todo...
})
</script>

<template>
  <div ref="el" />
</template>
```
