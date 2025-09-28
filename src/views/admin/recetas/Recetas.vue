<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import Receta from '../../../components/Receta.vue'
import { FwbSpinner } from 'flowbite-vue'
import { useRecetaStore } from '@/stores/recetaStore'
import { TailwindPagination } from 'laravel-vue-pagination'

const recetaStore = useRecetaStore()

onMounted(() => {
  recetaStore.fetchRecetas();
  recetaStore.fetchAllRecetas();
})
const buscar = ref('')

const limpiarBusqueda = () => {
  buscar.value = ''
}

watch(buscar, (nuevoValor) => {
  if (nuevoValor.trim() !== '') {
    clearTimeout(buscar.timeout)
    buscar.timeout = setTimeout(() => {
      // Pasamos el valor de búsqueda a la función
      recetaStore.fetchRecetas(1, buscar.value)
    }, 500) // 500 ms de retraso para evitar múltiples peticiones
  } else {
    recetaStore.fetchRecetas(1) // Si no hay búsqueda, traemos todas las recetas
  }
})

const recetasFiltradas = computed(() => {
  
  if (!buscar.value.trim()) {
    return recetaStore.recetas.data // Si no hay búsqueda, mostrar todas las recetas
  }

  return recetaStore.recetasTodas.filter((receta) => {
    return (
      receta.nombre.toLowerCase().includes(buscar.value.toLowerCase()) ||
      receta.categoria.nombre.toLowerCase().includes(buscar.value.toLowerCase())
    )
  })
})
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-3xl text-gray-700 leading-tight">Listado de recetas</h2>
    </template>
    <div class="py-12">
      <div class="w-[90%] lg:w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <template v-if="recetaStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center justify-center">
              <input
                type="text"
                class="w-full p-2 border border-green-800 rounded-l-md focus:outline-none focus:border-green-800 focus:ring-green-800 placeholder-gray-500"
                placeholder="Buscar receta"
                v-model="buscar"
              />
              <!-- Icono "X" para limpiar el campo de búsqueda -->
              <i
                v-if="buscar.trim() !== ''"
                class="fa-solid fa-xmark cursor-pointer bg-green-500 hover:bg-green-600 text-white p-3 rounded-r-md border border-green-800"
                @click="limpiarBusqueda"
              ></i>
              <i
                v-else
                class="fa-solid fa-magnifying-glass bg-green-800 hover:bg-green-800 text-white p-3 rounded-r-md border border-green-800 focus:ring-green-800"
              ></i>
            </div>
            <NewElementLink :to="{ name: 'nueva-receta' }">Nueva Receta</NewElementLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Receta v-for="receta in recetasFiltradas" :key="receta.id" :receta="receta" />
          </div>
        </div>
        <div class="mt-10 flex justify-center">
          <TailwindPagination
            :data="recetaStore.recetas"
            :active-classes="['border-green-900', 'text-green-900', 'hover:bg-amber-50']"
            @pagination-change-page="recetaStore.fetchRecetas"
          />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
