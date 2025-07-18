<script setup>
import { onMounted, ref, version, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import GuestLayout from '../layouts/GuestLayout.vue'
import RecetaPortada from '../components/RecetaPortada.vue'
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

const getRecetasIndex = async () => {
  try {
    const { data } = await axios.get(`/api/recetas?buscar=${buscar.value}`)
    recetas.value = data.data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}


const recetasFiltradas = computed(() => {
  if (!buscar.value.trim()) {
    return recetas.value
  }

  return recetas.value.filter((receta) => {
    return (
      receta.nombre.toLowerCase().includes(buscar.value.toLowerCase()) ||
      receta.categoria?.nombre.toLowerCase().includes(buscar.value.toLowerCase())
    )
  })
})

const recetasFiltradasLimitadas = computed(() => {
  return recetasFiltradas.value.slice(0, 4)
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
          <RecetaPortada
            v-for="receta in recetasFiltradasLimitadas"
            :key="receta.id"
            :receta="receta"
          />
        </div>
      </section>
    </div>
  </GuestLayout>
</template>

<style scoped></style>
