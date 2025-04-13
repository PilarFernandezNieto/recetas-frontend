<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import Ingrediente from '@/components/Ingrediente.vue'
import { useIngredienteStore } from '../../../stores/ingredienteStore'
import { FwbSpinner } from 'flowbite-vue'
import { TailwindPagination } from 'laravel-vue-pagination'

const ingredienteStore = useIngredienteStore()

onMounted(() => {
  ingredienteStore.fetchIngredientes()
  ingredienteStore.fetchAllIngredientes()
})

const buscar = ref('')

const ingredientesFiltrados = computed(() => {
  if (!buscar.value.trim()) {
    return ingredienteStore.ingredientes.data // Si no hay búsqueda, mostrar todos los ingredientes
  }
  return ingredienteStore.ingredientesTodos.filter((ingrediente) => {
    return ingrediente.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  })
})
const paginationClasses = ['bg-bg-amber-600', 'text-white', 'border-amber-600']
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Ingredientes</h2>
    </template>

    <div class="py-12">
      <div class="w-[90%] md:w-3/4 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-100 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <div class="py-6 text-gray-900 mb-4 text-2xl font-medium">Listado de ingredientes</div>
          <template v-if="ingredienteStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center justify-center">
              <input
                type="text"
                class="w-full p-2 border border-amber-500 rounded-l-md focus:outline-none focus:border-amber-500 focus:ring-amber-600 placeholder-gray-400"
                placeholder="Buscar ingrediente"
                v-model="buscar"
              />
              <i
                class="fa-solid fa-magnifying-glass bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-r-md border border-amber-500"
              ></i>
            </div>
            <NewElementLink :to="{ name: 'nuevo-ingrediente' }">Nuevo ingrediente</NewElementLink>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <Ingrediente
              v-for="ingrediente in ingredientesFiltrados"
              :key="ingrediente.id"
              :ingrediente="ingrediente"
            />
          </div>
        </div>
        <div class="mt-10 flex justify-center">
          <TailwindPagination
            :data="ingredienteStore.ingredientes"
            :active-classes="['border-amber-700', 'text-amber-700', 'hover:bg-amber-100']"
            :keepLength="true"
            @pagination-change-page="ingredienteStore.fetchIngredientes"
          />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
