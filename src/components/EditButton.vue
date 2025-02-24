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
    to="to"
    class="inline-flex items-center justify-center px-4 py-2 bg-cyan-500 border border-transparent rounded-md font-semibold text-white tracking-widest hover:bg-cyan-600 focus:bg-cyan-700 active:bg-cyan-700 focus:outline-none transition ease-in-out duration-150"
  >
    <slot />
  </RouterLink>
</template>
