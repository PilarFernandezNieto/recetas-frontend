<script setup>

let anio = new Date().getFullYear()
</script>
<template>
  <div class="h-24 flex flex-col justify-center items-center">
    <h2 class="font-titulares text-2xl font-medium text-center mt-4">Mis Recetas</h2>
    <p class="text-sm">Todos los derechos reservados. {{ anio }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
