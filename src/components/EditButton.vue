<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center justify-center p-1 bg-blue-800 border border-transparent rounded-md font-semibold text-white tracking-widest hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-800 focus:outline-none transition ease-in-out duration-150"
  >
    <slot />
  </RouterLink>
</template>
