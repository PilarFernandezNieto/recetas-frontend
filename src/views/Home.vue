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
  <GuestLayout>
    <div
      class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-amber-100 selection:bg-amber-500 selection:text-white"
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
        <h1 class="font-titulares text-2xl text-center mb-4">Página Inicio Mis Recetas</h1>
        <div
          class="w-full max-w-7xl mx-auto p-4 lg:p-8 bg-fondo-fruta bg-cover bg-center shadow-md rounded-lg"
        >
          <div class="bg-white opacity-90 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white shadow">
                <!-- card cover -->
                <img
                  class="h-56 w-full object-cover"
                  src="https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384"
                  alt=""
                />
                <!-- end card cover -->

                <!-- card content -->
                <div class="flex-1 px-6 py-4">
                  <div class="font-bold text-xl mb-2">Card Title</div>
                  <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                    nulla!
                  </p>
                </div>
                <!-- end card content -->

                <!-- card footer -->
                <div class="px-6 py-4 bg-gray-100">
                  <button
                    type="button"
                    class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                  >
                    Action
                  </button>
                </div>
                <!-- end card footer -->
              </div>
              <div class="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white shadow">
                <!-- card cover -->
                <img
                  class="h-56 w-full object-cover"
                  src="https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384"
                  alt=""
                />
                <!-- end card cover -->

                <!-- card content -->
                <div class="bg-amber-100">
                  <div class="flex-1 px-6 py-4">
                    <div class="font-bold text-xl mb-2">Card Title</div>
                    <p class="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                      nulla!
                    </p>
                  </div>
                  <!-- end card content -->

                  <!-- card footer -->
                  <div class="px-6 py-4">
                    <button
                      type="button"
                      class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                    >
                      Action
                    </button>
                  </div>
                  <!-- end card footer -->
                </div>
              </div>
              <div class="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white shadow">
                <!-- card cover -->
                <img
                  class="h-56 w-full object-cover"
                  src="https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384"
                  alt=""
                />
                <!-- end card cover -->

                <!-- card content -->
                <div class="flex-1 px-6 py-4">
                  <div class="font-bold text-xl mb-2">Card Title</div>
                  <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                    nulla!
                  </p>
                </div>
                <!-- end card content -->

                <!-- card footer -->
                <div class="px-6 py-4 bg-gray-100">
                  <button
                    type="button"
                    class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                  >
                    Action
                  </button>
                </div>
                <!-- end card footer -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </GuestLayout>
</template>

<style scoped></style>
