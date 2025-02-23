<script setup>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">Panel Administración</h2>
    </template>

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 bg-amber-50">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="p-6 text-gray-900">
          Bienvenid@ al panel de administración de <span class="font-titulares">MisRecetas</span>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
