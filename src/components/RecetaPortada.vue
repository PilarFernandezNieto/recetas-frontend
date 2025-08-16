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
const getImagen = (imagen) => {
  if (imagen){
  const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, ''); // quita slash final
  const path = imagen.replace(/^\/+/, ''); // quita slash inicial
  return `${base}/${path}`;
  }
}
</script>

<template>
  <!-- <div class="rounded-md overflow-hidden bg-white shadow mb-4 border border-gray-300"> -->
      <div class="flex flex-col rounded-md overflow-hidden bg-white shadow border border-gray-300 h-full">
    <div class="flex-1 px-6 py-4">
      <div class="font-bold text-xl mb-2 min-h-[56px]">{{ receta.nombre }}</div>
      <ul class="my-4 min-h-[180px]">
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
