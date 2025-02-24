<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-white tracking-widest hover:bg-red-600 focus:bg-red-700 active:bg-red-700 focus:outline-none transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>
