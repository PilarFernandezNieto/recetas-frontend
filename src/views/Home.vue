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
// const { data } = await axios.get('/')
// const laravelVersion = data?.Laravel ?? ''
const recetas = ref([])
const loading = ref(true)
const buscar = ref('')

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
      // Pasamos el valor de búsqueda a la función
      getRecetasIndex(buscar.value)
    }, 500) // 500 ms de retraso para evitar múltiples peticiones
  } else {
    getRecetasIndex() // Si no hay búsqueda, traemos todas las recetas
  }
})

const getRecetasIndex = async (page = 1, search = '') => {
  try {
    const { data } = await axios.get(`/api/recetas?page=${page}&buscar=${search}`)
    recetas.value = data
    console.log('recetas', recetas.value.data)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const recetasFiltradas = computed(() => {
  if (!buscar.value.trim()) {
    return recetas.value.data
  }

  return recetas.value.data.filter((receta) => {
    return (
      receta.nombre.toLowerCase().includes(buscar.value.toLowerCase()) ||
      receta.categoria?.nombre.toLowerCase().includes(buscar.value.toLowerCase())
    )
  })
})
</script>

<template>
  <GuestLayout>
    <template #header>
      <h2 class="font-titulares text-3xl font-medium text-center mt-4">Mis Recetas</h2>
    </template>
    <div
      class="relative flex flex-col justify-center items-center min-h-screen selection:bg-amber-700 selection:text-white"
    >
      <section class="w-full max-w-7xl mx-auto lg:p-8 bg bg-cover bg-center">
        <template v-if="loading">
          <div class="flex justify-center mb-8">
            <fwb-spinner size="10" color="green" />
          </div>
        </template>

        <Buscador v-model="buscar" />
        <div class="bg-none md:bg-white opacity-90 rounded-md p-4 mb-6">
          <RecetaPortada v-for="receta in recetasFiltradas" :key="receta.id" :receta="receta" />
        </div>
        <div class="mt-10 flex justify-center">
          <TailwindPagination
            :data="recetas"
            :active-classes="['border-amber-800', 'text-amber-800', 'hover:bg-amber-100']"
            @pagination-change-page="getRecetasIndex"
          />
        </div>
      </section>
    </div>
  </GuestLayout>
</template>

<style scoped></style>
