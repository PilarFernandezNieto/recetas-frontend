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
    class="inline-flex items-center justify-center px-4 py-2 bg-white  border border-amber-700 rounded-md font-semibold text-xs text-amber-700 hover:text-white uppercase tracking-widest shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2  disabled:opacity-25 transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>
