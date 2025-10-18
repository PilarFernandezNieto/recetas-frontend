<script setup>
import { onMounted, ref, version, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import GuestLayout from '../layouts/GuestLayout.vue'
import RecetaPortada from '../components/RecetaPortada.vue'
import { TailwindPagination } from 'laravel-vue-pagination'
import Buscador from '../components/Buscador.vue'
import { FwbSpinner } from 'flowbite-vue'
import axios from '../utils/axios'

const { isLoggedIn } = useAuthStore()
const recetas = ref([])
const loading = ref(true)
const buscar = ref('')
const paginaActual = ref(1)

onMounted(async () => {
  await getRecetasIndex()
})
const limpiarBusqueda = () => {
  buscar.value = ''
}
watch(buscar, (nuevoValor) => {
  if (nuevoValor.trim() !== '') {
    clearTimeout(buscar.timeout)
    buscar.timeout = setTimeout(() => {
      paginaActual.value = 1
      // Pasamos el valor de búsqueda a la función
      getRecetasIndex(paginaActual.value, buscar.value)
    }, 500) // 500 ms de retraso para evitar múltiples peticiones
  } else {
    getRecetasIndex() // Si no hay búsqueda, traemos todas las recetas
  }
})

const getRecetasIndex = async (page = 1, search = '') => {
  try {
    const { data } = await axios.get(`/api/recetas?page=${page}&buscar=${search}`)
    recetas.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// const recetasFiltradas = computed(() => {
//   if (!buscar.value.trim()) {
//     return recetas.value.data
//   }

//   return recetas.value.data.filter((receta) => {
//     return (
//       receta.nombre.toLowerCase().includes(buscar.value.toLowerCase()) ||
//       receta.categoria?.nombre.toLowerCase().includes(buscar.value.toLowerCase())
//     )
//   })
// })
</script>

<template>
  <GuestLayout>
    

    <div
      class="relative flex flex-col justify-center items-center min-h-screen selection:bg-green-800 selection:text-white"
    >
      <section class="w-full max-w-7xl mx-auto lg:p-8 bg bg-cover bg-center">
        <template v-if="loading">
          <div class="flex justify-center mb-8">
            <fwb-spinner size="10" color="green" />
          </div>
        </template>

        <Buscador v-model="buscar" />

        <div class="bg-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <RecetaPortada v-for="receta in recetas.data" :key="receta.id" :receta="receta" />
        </div>
        <div class="mt-10 flex justify-center">
          <TailwindPagination
            :data="recetas"
            :active-classes="['border-green-900', 'text-green-900', 'hover:bg-amber-100']"
            @pagination-change-page="(page)=>getRecetasIndex(page, buscar)"
          />
        </div>
      </section>
    </div>
  </GuestLayout>
</template>

<style scoped></style>
