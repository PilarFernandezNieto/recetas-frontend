<script setup>
import { computed } from 'vue'
defineProps({
  receta: {
    type: Object,
    required: true,
  },
})
const getImagen = (imagen) => {
  const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, ''); // quita slash final
  const path = imagen.replace(/^\/+/, ''); // quita slash inicial
  return `${base}/${path}`;
}
</script>

<template>
  <div class="max-w-sm flex flex-col rounded-md overflow-hidden bg-white shadow">
    <!-- card cover -->
    <img class="h-56 w-full object-cover" :src="getImagen(receta.imagen)" alt="" />
    <!-- end card cover -->
    <!-- card content -->
    <div class="flex-1 px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ receta.nombre }}</div>
      <p class="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
      </p>
    </div>
    <!-- end card content -->
    <!-- card footer -->
    <div class="px-6 py-4 bg-gray-100">
      <button
        type="button"
        class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none"
      >
        Action
      </button>
    </div>
    <!-- end card footer -->
  </div>
</template>
