<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import Ingrediente from '@/components/Ingrediente.vue'
import { useIngredienteStore } from '../../../stores/ingredienteStore'

const ingredienteStore = useIngredienteStore()
console.log(ingredienteStore.ingredientes);

onMounted(() => {
  ingredienteStore.fetchIngredientes()
})

const buscar = ref('')

const ingredientesFiltrados = computed(() => {
  if (!buscar.value.trim()) {
    return ingredienteStore.ingredientes // Si no hay búsqueda, mostrar todos los ingredientes
  }
  return ingredienteStore.ingredientes.filter((ingrediente) => {
    return ingrediente.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  })
})
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Ingredientes</h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg py-4 px-8">
          <div class="py-6 text-gray-900 mb-4 text-2xl font-medium">Listado de ingredientes</div>
          <div v-if="ingredienteStore.loading" class="flex justify-center py-6">
            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-amber-500" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center justify-center">
              <input
                type="text"
                class="p-2 border border-amber-500 rounded-l-md focus:outline-none focus:border-amber-500 focus:ring-amber-600"
                placeholder="Buscar ingrediente"
                v-model="buscar"
              />
              <i
                class="fa-solid fa-magnifying-glass bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-r-md border border-amber-500"
              ></i>
            </div>
            <NewElementLink to="/">Nuevo ingrediente</NewElementLink>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <Ingrediente
              v-for="ingrediente in ingredientesFiltrados"
              :key="ingrediente.id"
              :ingrediente="ingrediente"
            />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
