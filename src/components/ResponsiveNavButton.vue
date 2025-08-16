<script setup>
import { computed } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
  },
})

const classes = computed(() =>
  props.active
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-amber-400 text-left text-base font-medium text-green-800 bg-amber-50 focus:outline-none focus:text-green-800 focus:bg-amber-50 focus:border-green-800 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-green-800  hover:bg-amber-50 hover:border-amber-300 focus:outline-none focus:text-green-800 focus:bg-amber-50 focus:border-amber-300 transition duration-150 ease-in-out',
)
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
