<script setup>
import { RouterLink } from 'vue-router'
import { computed, inject } from 'vue'
import { useIngredienteStore } from '../stores/ingredienteStore'
import EditButton from './EditButton.vue'
import DeleteButton from './DeleteButton.vue'

const ingredienteStore = useIngredienteStore()
const swal = inject('$swal')

const props = defineProps({
  ingrediente: {
    type: Object,
    required: true,
  },
})
const imagenServer = computed(() => props.ingrediente.imagen.startsWith('http'))
const getImagen = computed(() => (imagen) => `${import.meta.env.VITE_APP_BACKEND_URL}${imagen}`)

const showAlert = (id) => {
    swal({
        icon: 'warning',
        text: '¿Seguro que desea eliminar el ingrediente',
        showDenyButton: true,
        confirmButtonText: "Adelante",
        denyButtonText: "No"
    }).then((result) => {
    if (result.isConfirmed) {
        ingredienteStore.eliminarIngrediente(id);
    }
    })
}

</script>
<template>
  <div
    class="shadow-md p-4 space-y-4 md:grid md:grid-cols-[65%_35%] items-center bg-white justify-between"
  >
    <div class="space-y-2">
      <p class="font-black text-2xl">
        {{ ingrediente.nombre }}
      </p>
      <p class="text-lg">{{ ingrediente.descripcion }}</p>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="flex justify-center lg:mb-0">
        <img
          :src="[imagenServer ? ingrediente.imagen : getImagen(ingrediente.imagen)]"
          :alt="ingrediente.nombre"
          class="w-full lg:w-40 rounded-md"
        />
      </div>
      <div class="flex lg:flex-col justify-between gap-5">
        <EditButton :to="{name: 'editar-ingrediente', params: {id: ingrediente.id}}">Editar</EditButton>
        <DeleteButton @click="showAlert(ingrediente.id)" > Eliminar </DeleteButton>
      </div>
    </div>
  </div>
</template>
