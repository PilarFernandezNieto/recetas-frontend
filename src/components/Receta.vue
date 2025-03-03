<script setup>
import { RouterLink } from 'vue-router'
import { computed, inject } from 'vue'
import EditButton from './EditButton.vue'
import DeleteButton from './DeleteButton.vue'
import NewElementLink from './NewElementLink.vue'

const swal = inject('$swal')

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
    props.receta.imagen.startsWith('http')
  }
})
const getImagen = computed(() => (imagen) => `${import.meta.env.VITE_APP_BACKEND_URL}${imagen}`)

// const showAlert = (id) => {
//     swal({
//         icon: 'warning',
//         text: '¿Seguro que desea eliminar el ingrediente',
//         showDenyButton: true,
//         confirmButtonText: "Adelante",
//         denyButtonText: "No"
//     }).then((result) => {
//     if (result.isConfirmed) {
//         ingredienteStore.eliminarIngrediente(id);
//     }
//     })
// }
</script>
<template>
  <div
    class="shadow-md p-4 space-y-4 md:grid md:grid-cols-[65%_35%] items-center bg-white justify-between"
  >
    <div class="space-y-2">
        <RouterLink :to="{ name: 'receta', params: { id: receta.id } }" class="hover:bg-amber-500 font-black hover:text-white text-2xl cursor-pointer hover:px-2 hover:py-1 rounded-md transition duration-150 ease-in-out" title="Ver receta">{{ receta.nombre }}</RouterLink>
      <ul>
        <li v-for="(valor, clave) in filtrados" :key="clave">
          <span v-if="valor != ''" class="font-semibold capitalize">{{ clave }}: </span>
          <span v-if="valor >0 || valor != ''" class="font-medium">{{ valor }}</span>
        </li>
        <li> <span class="font-semibold capitalize">Dificultad: </span class="font-medium"><span>{{ receta.dificultad.nombre }}</span></li>
      </ul>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="flex justify-center lg:mb-0">
        <img
          :src="[imagenServer ? receta.imagen : getImagen(receta.imagen)]"
          :alt="receta.nombre"
          class="w-full lg:w-40 rounded-md"
        />
      </div>
      <div class="flex lg:flex-col justify-between gap-5">
        <EditButton :to="{ name: 'editar-receta', params: { id: receta.id } }">Editar</EditButton>

        <DeleteButton @click="showAlert(receta.id)"> Eliminar </DeleteButton>
      </div>
    </div>
  </div>
</template>
