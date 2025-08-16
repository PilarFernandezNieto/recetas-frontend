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
const getImagen = (imagen) => {
  if(imagen){
  const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, ''); // quita slash final
  const path = imagen.replace(/^\/+/, ''); // quita slash inicial
  return `${base}/${path}`;
  }
}
</script>

<template>
  <GuestLayout>
    <template #header>
      <h2 class="font-titulares text-3xl font-medium text-center my-4" >{{ receta.nombre }}</h2>
    </template>
      <div
          class="w-full shadow-md rounded-md lg:p-4 mb-4 lg:bg-amber-50"
        >
          <div class="bg-white opacity-90 rounded-md p-4">
          <template v-if="loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="md:grid md:grid-cols-12 gap-6 my-4">
            <div class="md:col-span-7">
              <p class="text-lg">{{ receta.intro }}</p>
              <ul class="mt-4">
                <li> <span class="font-semibold capitalize">Categoría: </span class="font-medium"><span>{{ receta.categoria?.nombre }}</span></li>

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
              class="w-full rounded md:col-span-5"
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
