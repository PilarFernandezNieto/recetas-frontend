<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import { FwbSpinner } from 'flowbite-vue'
import Categoria from '../../../components/Categoria.vue'
import { useCategoriaStore } from '../../../stores/categoriaStore'

const categoriaStore = useCategoriaStore()
onMounted(() => {
  categoriaStore.fetchCategorias()
})


</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Categorías</h2>
    </template>

    <div class="py-12">
      <div class="w-[90%] md:w-3/4 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-100 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <h3 class="py-6 text-gray-900 mb-4 text-2xl font-medium">Listado de categorías</h3>
          <template v-if="categoriaStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="flex flex-col gap-4 lg:flex-row mb-4 justify-end">
            <NewElementLink :to="{ name: 'nueva-categoria' }">Nueva categorias</NewElementLink>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <Categoria
              v-for="categoria in categoriaStore.categorias"
              :key="categoria.id"
              :categoria="categoria"
            />
          </div>
        </div>

      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
