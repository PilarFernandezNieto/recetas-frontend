<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
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
    class="border-gray-300 focus:border-amber-700 focus:ring-amber-700 rounded-md shadow-sm placeholder-gray-400"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
  />
</template>
