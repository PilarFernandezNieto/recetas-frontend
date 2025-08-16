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
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-amber-500 text-left text-base font-medium text-amber-500  bg-amber-100 focus:outline-none focus:text-amber-500 focus:bg-amber-100 focus:border-amber-500 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-amber-500 hover:bg-amber-100 hover:border-amber-300 focus:outline-none focus:text-amber-500 focus:bg-amber-100 dark:focus:bg-amber-500 focus:border-amber-300 transition duration-150 ease-in-out',
)
</script>

<template>
  <RouterLink :to="to" :class="classes">
    <slot />
  </RouterLink>
</template>
