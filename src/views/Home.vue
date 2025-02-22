<script setup>
import { version } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import GuestLayout from '../layouts/GuestLayout.vue'
import axios from '../utils/axios'

const { isLoggedIn } = useAuthStore()

const { data } = await axios.get('/')

const laravelVersion = data?.Laravel ?? ''
</script>

<template>
  <GuestLayout >
  <div
    class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-amber-50  selection:bg-amber-500 selection:text-white"
  >
    <div class="sm:absolute sm:top-0 sm:left-0 p-6 text-right">
      <div
        class="font-semibold text-gray-600 dark:text-gray-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 flex items-center gap-1"
      >
        <span>Backend Status :</span>
        <div v-if="laravelVersion" class="text-green-500">Connected</div>
        <div v-else class="text-red-500">Disconnected</div>
      </div>
    </div>



    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <h1>Pagina de Inicio Mis Recetas</h1>
    </div>
  </div>
  </GuestLayout>
</template>

<style scoped></style>
