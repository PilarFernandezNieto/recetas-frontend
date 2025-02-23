<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Ingrediente from '@/components/Ingrediente.vue'
import { useIngredienteStore } from '../../../stores/ingredienteStore'

const { ingredientes } = useIngredienteStore()
console.log(ingredientes)
const buscar = ref('')

const ingredientesFiltrados = computed(() => {
  if (!buscar.value.trim()) {
    return ingredientes // Si no hay búsqueda, mostrar todos los ingredientes
  }
  return ingredientes.filter((ingrediente) => {
    return ingrediente.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  })
})
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ingredientes</h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg p-4">
          <div class="p-6 text-gray-900 mb-4">Listado de ingredientes</div>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center">
              <input
                type="text"
                class="p-2 border border-amber-500 rounded-l-md focus:outline-none"
                placeholder="Buscar ingrediente"
                v-model="buscar"
              />
              <i
                class="fa-solid fa-magnifying-glass bg-amber-500 text-white p-3 rounded-r-md border border-amber-500"
              ></i>
            </div>
            <RouterLink
              to="/"
              class="bg-amber-500 hover:bg-amber-800 text-white py-2 px-4 text-lg font-bold rounded-md text-center"
              >Nuevo ingrediente</RouterLink
            >
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
