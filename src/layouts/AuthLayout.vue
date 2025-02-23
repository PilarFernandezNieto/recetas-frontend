<script setup>
import ApplicationLogo from '../components/ApplicationLogo.vue';
</script>
<template>
  <div class="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
    <!-- Logo -->
    <div class="flex items-center flex-shrink-0">
      <RouterLink :to="{ name: 'home' }">
        <ApplicationLogo class="block w-40" />
      </RouterLink>
    </div>
    <div class="w-[32rem] sm:max-w-lg lg:max-w-7xl mt-6 shadow-md overflow-hidden sm:rounded-lg bg-white p-4">
      <!-- Aquí aparecen todos los formularios y componentes para la autenticación -->
      <slot />
    </div>
  </div>
</template>
