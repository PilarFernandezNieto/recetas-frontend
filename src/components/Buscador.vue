<script setup>
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue']) // Para emitir el cambio de valor al padre

// Cuando el valor cambie, emitimos el nuevo valor al componente padre
const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

</script>
<template>
  <div class=" w-72 mx-auto flex justify-center py-5">
    <input
      type="text"
      class="w-full p-2 border border-amber-500 rounded-l-md focus:outline-none focus:border-amber-500 focus:ring-amber-600 placeholder-gray-500"
      placeholder="Buscar"
      :v-model="modelValue"
      @input="onInput"
    />
    <i
      class="fa-solid fa-magnifying-glass bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-r-md border border-amber-500"
    ></i>
  </div>
</template>
