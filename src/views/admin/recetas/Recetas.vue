<script setup>
import { ref } from 'vue'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import Receta from '../../../components/Receta.vue'
import { recetas as recetasDB } from '../../../data/recetas';

const recetas = ref(recetasDB);
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
          <!-- aquí va el spinner -->
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <div class="flex items-center justify-center">
              <input
                type="text"
                class="p-2 border border-amber-500 rounded-l-md focus:outline-none focus:border-amber-500 focus:ring-amber-600"
                placeholder="Buscar receta"
                
              />
              <i
                class="fa-solid fa-magnifying-glass bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-r-md border border-amber-500"
              ></i>
            </div>
            <NewElementLink :to="{name: 'nueva-receta'}">Nueva Receta</NewElementLink>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <Receta
              v-for="receta in recetas"
              :key="receta.id"
              :receta="receta"
            />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
