<script setup>
import { RouterLink } from 'vue-router'
import { computed, inject } from 'vue'
import EditButton from './EditButton.vue'
import DeleteButton from './DeleteButton.vue'
import NewElementLink from './NewElementLink.vue'
import { useRecetaStore } from '../stores/recetaStore'

const swal = inject('$swal')
const recetaStore = useRecetaStore();

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
const imagenServer = computed(() => {
  if (props.receta.imagen !== null) {
    props.receta.imagen.startsWith('https')
  }
})
const getImagen = (imagen) => {
if(imagen){
  const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, ''); // quita slash final
  const path = imagen.replace(/^\/+/, ''); // quita slash inicial
  return `${base}/${path}`;
}
}
const showAlert = (id) => {
    swal({
        icon: 'warning',
        text: '¿Seguro que desea eliminar esta receta?',
        showDenyButton: true,
        confirmButtonText: "Adelante",
        denyButtonText: "No"
    }).then((result) => {
    if (result.isConfirmed) {
      recetaStore.eliminarReceta(id);
    }
    })
}
</script>
<template>
  <div
    class="shadow-md p-4 space-y-4 flex flex-col items-center bg-white justify-between rounded-md"
  >
    <div class="space-y-2 w-full">
        <RouterLink :to="{ name: 'receta', params: { id: receta.id } }" class="hover:bg-amber-700 font-black hover:text-white text-2xl cursor-pointer hover:px-2 hover:py-1 rounded-md transition duration-150 ease-in-out" title="Ver receta">{{ receta.nombre }}</RouterLink>
        <p class="text-lg">{{ receta.intro }}</p>
      <ul>
        <li v-for="(valor, clave) in filtrados" :key="clave">
          <span v-if="valor != ''" class="font-semibold capitalize">{{ clave }}: </span>
          <span v-if="valor >0 || valor != ''" class="font-medium">{{ valor }}</span>
        </li>
        <li> <span class="font-semibold capitalize">Dificultad: </span class="font-medium"><span>{{ receta.dificultad.nombre }}</span></li>
        <li> <span class="font-semibold capitalize">Categoría: </span class="font-medium"><span>{{ receta.categoria.nombre }}</span></li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <img :src="[imagenServer ? receta.imagen : getImagen(receta.imagen)]" :alt="receta.nombre" class="w-full rounded-md object-cover"/>
      <div class="flex flex-col gap-4 w-full">
          <EditButton :to="{ name: 'editar-receta', params: { id: receta.id } }" >
            <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-6 h-6 stroke-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
          </EditButton>
          <DeleteButton @click="showAlert(receta.id)">  <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-6 h-6 stroke-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
       </DeleteButton>
      </div>
    </div>
    
  </div>
</template>
