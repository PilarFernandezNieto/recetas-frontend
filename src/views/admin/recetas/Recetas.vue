<script setup>
import { ref, onMounted, computed } from 'vue'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import Receta from '../../../components/Receta.vue'
import { FwbSpinner } from 'flowbite-vue'
import { useRecetaStore } from '@/stores/recetaStore'

const recetaStore = useRecetaStore()

onMounted(() => {
  recetaStore.fetchRecetas()
})
const buscar = ref('')

const recetasFiltradas = computed(() => {
  if (!buscar.value.trim()) {
    return recetaStore.recetas // Si no hay búsqueda, mostrar todos los ingredientes
  }
  return recetaStore.recetas.filter((receta) => {
    return receta.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  })
})
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Recetas</h2>
    </template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg py-4 px-8">
          <div class="py-6 text-gray-900 mb-4 text-2xl font-medium">Listado de recetas</div>
          <template v-if="recetaStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center justify-center">
              <input
                type="text"
                class="p-2 border border-amber-500 rounded-l-md focus:outline-none focus:border-amber-500 focus:ring-amber-600"
                placeholder="Buscar receta"
                v-model="buscar"
              />
              <i
                class="fa-solid fa-magnifying-glass bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-r-md border border-amber-500"
              ></i>
            </div>
            <NewElementLink :to="{ name: 'nueva-receta' }">Nueva Receta</NewElementLink>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <Receta v-for="receta in recetasFiltradas" :key="receta.id" :receta="receta" />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
