<script setup>
import { RouterLink } from 'vue-router'
import { computed, inject } from 'vue'
import EditButton from './EditButton.vue'
import DeleteButton from './DeleteButton.vue'
import { useCategoriaStore } from '../stores/categoriaStore'

const categoriaStore = useCategoriaStore()
const swal = inject('$swal')

const props = defineProps({
  categoria: {
    type: Object,
    required: true,
  },
})

const showAlert = (id) => {
  swal({
    icon: 'warning',
    text: '¿Seguro que desea eliminar la categoría',
    showDenyButton: true,
    confirmButtonText: 'Adelante',
    denyButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      categoriaStore.eliminarCategoria(id);
    }
  })
}
</script>
<template>
  <div class="shadow-md p-4 space-y-4 flex items-center bg-white justify-between">
    <h4 class="font-black text-2xl">
      {{ categoria.nombre }}
    </h4>

    <div class="flex lg:flex-col justify-between gap-5">
      <EditButton :to="{ name: 'editar-categoria', params: { id: categoria.id } }"
        >Editar</EditButton
      >
      <DeleteButton @click="showAlert(categoria.id)"> Eliminar </DeleteButton>
    </div>
  </div>
</template>
