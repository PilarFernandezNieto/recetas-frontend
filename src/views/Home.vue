<script setup>
import { version } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from '../utils/axios'

const { isLoggedIn } = useAuthStore()

const { data } = await axios.get('/')

const laravelVersion = data?.Laravel ?? ''
</script>

<template>
  <div
    class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-amber-50  selection:bg-amber-500 selection:text-white"
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

    <div class="sm:absolute sm:top-0 sm:right-0 p-6 text-right">
      <RouterLink
        v-if="isLoggedIn"
        to="/dashboard"
        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-amber-500"
        >Dashboard</RouterLink
      >

      <template v-else>
        <RouterLink
          to="/login"
          class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-amber-500"
          >Inicia sesión</RouterLink
        >

        <RouterLink
          to="/register"
          class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-amber-500"
          >Registro</RouterLink
        >
      </template>
    </div>

    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <h1>Pagina de Inicio Mis Recetas</h1>
    </div>
  </div>
</template>

<style scoped></style>
