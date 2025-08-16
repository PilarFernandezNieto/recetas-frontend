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
const limpiarBusqueda = () => {
  buscar.value = ''
}

const ingredientesFiltrados = computed(() => {
  if (!buscar.value.trim()) {
    return ingredienteStore.ingredientes.data // Si no hay búsqueda, mostrar todos los ingredientes
  }
  return ingredienteStore.ingredientesTodos.filter((ingrediente) => {
    return ingrediente.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  })
})
const paginationClasses = ['bg-bg-amber-500', 'text-white', 'border-amber-500']
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Listado de ingredientes</h2>
    </template>

    <div class="py-12">
      <div class="w-[90%] lg:w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <template v-if="ingredienteStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center justify-center">
              <label for="buscar" class="sr-only">Buscar ingrediente</label>
              <input
                id="buscar"
                type="text"
                class="w-full p-2 border border-amber-500 rounded-l-md focus:outline-none focus:border-amber-500 focus:ring-amber-500 placeholder-gray-400"
                placeholder="Buscar ingrediente"
                v-model="buscar"
              />
              <!-- Icono "X" para limpiar el campo de búsqueda -->
              <i
                v-if="buscar.trim() !== ''"
                class="fa-solid fa-xmark cursor-pointer bg-slate-500 hover:bg-slate-600 text-white p-3 rounded-r-md border border-amber-500"
                @click="limpiarBusqueda"
              ></i>
              <i
                v-else
                class="fa-solid fa-magnifying-glass bg-amber-500 hover:bg-amber-500 text-white p-3 rounded-r-md border border-amber-500 focus:ring-amber-500"
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
            :active-classes="['border-amber-600', 'text-amber-600', 'hover:bg-amber-50']"
            :keepLength="true"
            @pagination-change-page="ingredienteStore.fetchIngredientes"
          />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
