<script setup>
import { RouterLink } from 'vue-router'
import { computed, inject } from 'vue'
import EditButton from './EditButton.vue'
import DeleteButton from './DeleteButton.vue'
import { useUsuarioStore } from '../stores/usuarioStore'

const usuarioStore = useUsuarioStore()
const swal = inject('$swal')

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
  },
})

const showAlert = (id) => {
  swal({
    icon: 'warning',
    text: '¿Seguro que desea eliminar el usuario',
    showDenyButton: true,
    confirmButtonText: 'Adelante',
    denyButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      usuarioStore.eliminarUser(id)
    }
  })
}
const is_admin = computed(() => {
  return props.usuario.is_admin ? "Admin" : "User"
})
</script>
<template>
  <div class="shadow-md p-4 space-y-4 grid md:grid-cols-12 gap-4 items-center bg-white justify-center md:justify-between">
    <p class="text-base col md:col-span-4">
      {{ usuario.name }}
    </p>
    <p class="text-base col md:col-span-4">
      {{ usuario.email }}
    </p>
    <p class="col md:col-span-2 uppercase">{{ is_admin }}</p>

    <div class="flex lg:flex-col justify-center gap-5 col md:col-span-2">
      <EditButton :to="{ name: 'editar-usuario', params: { id: usuario.id } }">Editar</EditButton>
      <DeleteButton @click="showAlert(usuario.id)"> Eliminar </DeleteButton>
    </div>
  </div>
</template>
