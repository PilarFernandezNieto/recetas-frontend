<script setup>
import { computed } from 'vue'
import NewElementLink from './NewElementLink.vue'
const props = defineProps({
  receta: {
    type: Object,
    required: true,
  },
})
const filtrados = computed(() => {
  const clavesPermitidas = ['comensales', 'tiempo', 'origen']
  return Object.fromEntries(
    Object.entries(props.receta).filter(([clave]) => clavesPermitidas.includes(clave)),
  )
})
const getImagen = computed(() => (imagen) => `${import.meta.env.VITE_APP_BACKEND_URL}${imagen}`)
</script>

<template>
  <div class="md:grid md:grid-cols-2 rounded-md overflow-hidden bg-white shadow mb-4 border border-gray-300">
    <div class="flex-1 px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ receta.nombre }}</div>
      <p class="text-gray-700 text-base">
        {{ receta.intro }}
      </p>
      <ul class="my-4">
        <li> <span class="font-semibold capitalize">Categoría: </span class="font-medium"><span>{{ receta.categoria?.nombre }}</span></li>
        <li v-for="(valor, clave) in filtrados" :key="clave">
            <span v-if="valor != ''" class="font-semibold capitalize">{{ clave }}: </span>
            <span v-if="valor >0 || valor != ''" class="font-medium">{{ valor }}</span>
        </li>
        <li> <span class="font-semibold capitalize">Dificultad: </span class="font-medium"><span>{{ receta.dificultad?.nombre }}</span></li>
        
      </ul>
      <NewElementLink :to="{ name: 'ver-receta', params: {id: receta.id} }">Ver receta</NewElementLink>
    
    </div>
    <img class="w-full h-full object-cover object-center" :src="getImagen(receta.imagen)" alt="" />
  </div>
</template>
