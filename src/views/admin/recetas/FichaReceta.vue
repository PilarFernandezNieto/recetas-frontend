<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import GoBackButton from '../../../components/GoBackButton.vue'
import { FwbSpinner } from 'flowbite-vue'
import { useRecetaStore } from '@/stores/recetaStore'

const recetaStore = useRecetaStore()
const route = useRoute()
const id = route.params.id

onMounted(() => {
  recetaStore.fetchReceta(id)
})
const filtrados = computed(() => {
  const clavesPermitidas = ['comensales', 'tiempo', 'origen']
  return Object.fromEntries(
    Object.entries(recetaStore.receta).filter(([clave]) => clavesPermitidas.includes(clave)),
  )
})

const getImagen = (imagen) => {
  if(imagen){
      const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, ''); // quita slash final
  const path = imagen.replace(/^\/+/, ''); // quita slash inicial
  return `${base}/${path}`;
  }
}
const decodedInstrucciones = computed(() => {
  return decodeURIComponent(recetaStore.receta.instrucciones);
});
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h1 class="font-semibold text-xl text-gray-700 leading-tight">Recetas</h1>
    </template>
    <div class="py-12">
      <div class="w-[90%] lg:w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-md px-4 py-4 md:px-8">
          <template v-if="recetaStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="md:grid grid-cols-2 my-4">
            <div>
              <h2 class="my-4 text-gray-900 text-2xl uppercase font-bold">
                {{ recetaStore.receta.nombre }}
              </h2>
              <p class="text-lg">{{ recetaStore.receta.intro }}</p>
              <ul class="mt-4">
                <li v-for="(valor, clave) in filtrados" :key="clave">
                  <span v-if="valor != ''" class="font-semibold capitalize">{{ clave }}: </span>
                  <span v-if="valor >0 || valor != ''" class="font-medium">{{ valor }}</span>
                </li>
                <li> <span class="font-semibold capitalize">Dificultad: </span class="font-medium"><span>{{ recetaStore.receta.dificultad?.nombre }}</span></li>
                <li> <span class="font-semibold capitalize">Categoría: </span class="font-medium"><span>{{ recetaStore.receta.categoria?.nombre }}</span></li>
              </ul>
              <div class="my-4">
                <h3 class="uppercase text-lg font-bold">Ingredientes</h3>
                <ul>
                  <li v-for="ingrediente in recetaStore.receta.ingredientes">
                    <!-- <pre>{{ ingrediente }}</pre> -->
                    {{ ingrediente.nombre }} - {{ ingrediente.pivot.cantidad }} {{ ingrediente?.pivot.unidad }}
                  </li>
                </ul>
              </div>

            </div>
            <img
              :src="getImagen(recetaStore.receta.imagen)"
              :alt="recetaStore.receta.nombre"
              class="w-full rounded"
            />
          </div>

          <div>
            <h3 class="uppercase text-lg font-bold">Instrucciones</h3>
            <div
              class="my-4 text-lg bg-white p-4 rounded-md"
              v-html="decodedInstrucciones"
            ></div>
          </div>
          <GoBackButton class="w-full mt-2">Atrás</GoBackButton>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
<style>


</style>