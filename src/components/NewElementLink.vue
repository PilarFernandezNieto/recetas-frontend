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
    class="inline-flex items-center justify-center px-4 py-2 bg-amber-700 border border-transparent rounded-md font-semibold text-sm text-white tracking-widest hover:bg-amber-800 focus:bg-amber-800 active:bg-amber-700 focus:outline-none transition ease-in-out duration-150"
  >
    <slot />
  </RouterLink>
</template>
