<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  active: {
    type: Boolean,
  },
})

const classes = computed(() =>
  props.active
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-amber-600 text-left text-base font-medium text-amber-700  bg-amber-50 focus:outline-none focus:text-amber-600 focus:bg-amber-100 focus:border-amber-600 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300 focus:outline-none focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-600 focus:border-amber-300 transition duration-150 ease-in-out',
)
</script>

<template>
  <RouterLink :to="to" :class="classes">
    <slot />
  </RouterLink>
</template>
