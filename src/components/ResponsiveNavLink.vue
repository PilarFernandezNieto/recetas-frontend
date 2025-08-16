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
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-green-800 text-left text-base font-medium text-green-800  bg-amber-100 focus:outline-none focus:text-green-800 focus:bg-amber-100 focus:border-green-800 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-green-800 hover:bg-amber-100 hover:border-amber-300 focus:outline-none focus:text-green-800 focus:bg-amber-100 dark:focus:bg-green-800 focus:border-amber-300 transition duration-150 ease-in-out',
)
</script>

<template>
  <RouterLink :to="to" :class="classes">
    <slot />
  </RouterLink>
</template>
