<script setup>
import { onMounted, ref, version, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import GuestLayout from '../layouts/GuestLayout.vue'
import RecetaPortada from '../components/RecetaPortada.vue'
import Buscador from '../components/Buscador.vue'
import { FwbSpinner } from 'flowbite-vue'
import axios from '../utils/axios'

const { isLoggedIn } = useAuthStore()
const { data } = await axios.get('/')
const laravelVersion = data?.Laravel ?? ''
const recetas = ref([])
const loading = ref(true)
onMounted(async () => {
  await getRecetasIndex()
})
console.log('data laravel', data)
const getRecetasIndex = async () => {
  try {
    const { data } = await axios.get('/api/recetas')
    recetas.value = data.data
    console.log(recetas.value)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <GuestLayout>
    <div
      class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-amber-50 selection:bg-amber-500 selection:text-white"
    >
      <div class="sm:absolute sm:top-0 sm:left-0 p-6 text-right">
        <div
          class="font-semibold text-gray-600 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 flex items-center gap-1"
        >
          <span>Backend Status :</span>
          <div v-if="laravelVersion" class="text-green-500">Connected</div>
          <div v-else class="text-red-500">Disconnected</div>
        </div>
      </div>
      <section class="w-full max-w-7xl mx-auto lg:p-8">
        <template v-if="loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
        <h1 v-else class="font-titulares text-2xl text-center mb-4">Mis Recetas</h1>
        <div
          class="w-full max-w-7xl mx-auto p-4 lg:p-8 bg-fondo-fruta bg-cover bg-center shadow-md rounded-lg"
        >
        <Buscador />
          <div class="bg-white opacity-90 rounded-lg p-4">
              <RecetaPortada v-for="receta in recetas" :key="receta.id" :receta="receta" />
          </div>
        </div>
      </section>
    </div>
  </GuestLayout>
</template>

<style scoped></style>
