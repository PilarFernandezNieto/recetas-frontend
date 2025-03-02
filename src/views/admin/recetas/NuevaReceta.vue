<script setup>
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Recetas</h2>
    </template>
    <div class="py-12">
      <div class="w-1/2 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg py-4 px-8">
          <div class="py-4 text-gray-900 mb-4 text-2xl font-medium">Nueva Receta</div>
          <div class="bg-white shadow-sm p-4 rounded-lg">
            <h1>formulario</h1>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
