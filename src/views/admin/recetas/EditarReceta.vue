<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import InputLabel from '../../../components/InputLabel.vue'
import TextInput from '../../../components/TextInput.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import GoBackButton from '../../../components/GoBackButton.vue'
import EditorTiny from '../../../components/EditorTiny.vue'
import { recetas as recetasDB } from '../../../data/recetas'
import { dificultades as dificultadesDB } from '../../../data/dificultades'

const route = useRoute()
const id = route.params.id
const recetas = ref(recetasDB)
const dificultades = ref(dificultadesDB)

const receta = computed(() => recetas.value.find((r) => r.id == id))
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Recetas</h2>
    </template>
    <div class="py-12">
      <div class="w-[90%] md:w-3/4 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg py-4 px-4 md:px-8">
          <div class="py-4 text-gray-900 mb-4 text-2xl font-medium">Editar Receta</div>
          <div class="bg-white shadow-sm p-4 rounded-lg">
            <form @submit.prevent="handleIngrediente">
              <div>
                <InputLabel for="nombre" value="Nombre" />
                <TextInput
                  id="nombre"
                  type="text"
                  class="mt-2 block w-full"
                  v-model="receta.nombre"
                  autofocus
                />

                <!-- <InputError class="mt-2" :message="errors.nombre?.[0]" /> -->
              </div>
              <div class="mt-2 md:grid grid-cols-3 gap-4">
                <div>
                  <InputLabel for="origen" value="Origen" />
                  <TextInput
                    id="origen"
                    type="text"
                    class="mt-2 block w-full"
                    v-model="receta.origen"
                    autofocus
                  />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="tiempo" value="Tiempo" />
                  <TextInput
                    id="tiempo"
                    type="text"
                    class="mt-2 block w-full"
                    v-model="receta.tiempo"
                    autofocus
                  />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="dificultad" value="Dificultad" />
                  <select name="dificultades" id="dificultades" class="mt-2 w-full border-gray-300 focus:border-amber-600 focus:ring-amber-600 rounded-md shadow-sm">
                    <option value="0" selected>-------------</option>
                    <option v-for="dificultad in dificultades" :key="dificultad.id" :value="dificultad.id" :selected="receta.dificultad === dificultad.id">
                      {{ dificultad.nombre }}
                    </option>
                  </select>
                </div>

                <!-- <InputError class="mt-2" :message="errors.nombre?.[0]" /> -->
              </div>
              <div class="my-8">
                <label
                  for="imagen"
                  class="cursor-pointer bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-600"
                >
                  Subir imagen
                </label>
                <input type="file" id="imagen" @change="handleImageChange" class="hidden" />

                <!-- <InputError class="mt-2" :message="errors.imagen?.[0]" /> -->
              </div>
              <!-- <div class="mb-4">
                <img :src="getImagen" alt="imagen" class="w-40" />
              </div> -->
              <div>
                <InputLabel for="instruciones" value="Instrucciones" />
                <EditorTiny v-model="receta.instrucciones"></EditorTiny>
   

                <!-- <InputError class="mt-2" :message="errors.descripcion?.[0]" /> -->
              </div>
              <PrimaryButton
                class="w-full mt-2"
                :class="{ 'opacity-25': processing }"
                :disabled="processing"
              >
                Editar Ingrediente
              </PrimaryButton>
            </form>
            <GoBackButton class="w-full mt-2">Atrás</GoBackButton>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
