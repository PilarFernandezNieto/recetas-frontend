<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../utils/axios'
import GuestLayout from '../layouts/GuestLayout.vue'
import NewElementLink from '../components/NewElementLink.vue'
import GoBackButton from '../components/GoBackButton.vue'
import { FwbSpinner } from 'flowbite-vue'

const route = useRoute()
const id = route.params.id
const receta = ref([]);
const loading = ref(true)
console.log(id);

onMounted( async () => {
  await getRecetaPortada(id);
})

const getRecetaPortada = async () => {
  try {
    const {data} = await axios.get(`/api/recetas/${id}`)
    receta.value = data
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}

const filtrados = computed(() => {
  const clavesPermitidas = ['comensales', 'tiempo', 'origen']
  return Object.fromEntries(
    Object.entries(receta.value).filter(([clave]) => clavesPermitidas.includes(clave)),
  )
})
const getImagen = computed(() => (imagen) => `${import.meta.env.VITE_APP_BACKEND_URL}${imagen}`)
</script>

<template>
  <GuestLayout>
    <template #header>
      <h2 class="font-titulares text-3xl font-medium text-center my-4">Mis Recetas</h2>
    </template>
      <div
          class="w-full max-w-7xl mx-auto p-4 lg:p-8 bg-fondo-fruta bg-cover bg-center shadow-md rounded-lg"
        >
          <div class="bg-white opacity-90 rounded-lg p-4">
          <template v-if="loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="md:grid grid-cols-2 my-4">
            <div>
              <h2 class="my-4 text-gray-900 text-2xl uppercase font-bold">
                {{ receta.nombre }}
              </h2>
              <p class="text-lg">{{ receta.intro }}</p>
              <ul class="mt-4">
                <li v-for="(valor, clave) in filtrados" :key="clave">
                  <span v-if="valor != ''" class="font-semibold capitalize">{{ clave }}: </span>
                  <span v-if="valor >0 || valor != ''" class="font-medium">{{ valor }}</span>
                </li>
                <li> <span class="font-semibold capitalize">Dificultad: </span class="font-medium"><span>{{ receta.dificultad?.nombre }}</span></li>
              </ul>
              <div class="my-4">
                <h3 class="uppercase text-lg font-bold">Ingredientes</h3>
                <ul>
                  <li v-for="ingrediente in receta.ingredientes">
                    {{ ingrediente.nombre }} - {{ ingrediente.pivot.cantidad }} {{ ingrediente.pivot.unidad }}
                  </li>
                </ul>
              </div>

            </div>
            <img
              :src="getImagen(receta.imagen)"
              :alt="receta.nombre"
              class="w-full rounded"
            />
          </div>

          <div>
            <h3 class="uppercase text-lg font-bold">Instrucciones</h3>
            <div
              class="text-lg bg-white py-4"
              v-html="receta.instrucciones"
            ></div>
          </div>
          
        </div>
        <GoBackButton class="w-full mt-2">Atrás</GoBackButton>
      </div>
    
  </GuestLayout>
</template>
