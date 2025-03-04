<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
})

defineEmits(['update:modelValue'])

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>

<template>
  <input
    class="border-gray-300 focus:border-amber-600 focus:ring-amber-600 rounded-md shadow-sm placeholder-gray-400"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
  />
</template>
