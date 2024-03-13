# useMutationObserver

Watch for changes being made to the DOM tree.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { useMutationObserver } from 'vue-observer-hooks'

const el = ref(null)

useMutationObserver(el, (mutation) => {
  // todo...
}, { attributes: true })
</script>

<template>
  <div ref="el" />
</template>
```
