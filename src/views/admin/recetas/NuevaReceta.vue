<script setup>
import { ref, onMounted, computed } from 'vue'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import InputLabel from '../../../components/InputLabel.vue'
import TextInput from '../../../components/TextInput.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import GoBackButton from '../../../components/GoBackButton.vue'
import EditorTiny from '../../../components/EditorTiny.vue'
import { dificultades as dificultadesDB } from '../../../data/dificultades'
import { ingredientes as ingredientesDB } from '../../../data/ingredientes'
import Modal from '../../../components/Modal.vue'

const dificultades = ref(dificultadesDB)
const ingredientes = ref(ingredientesDB)
const receta = ref({
  nombre: '',
  origen: '',
  tiempo: '',
  dificultad: 0,
  imagen: '',
  instrucciones: '',
  ingredientes: [],
})
const ingredientesSeleccionados = ref([]) // Para gestionar los ingredientes seleccionados con cantidades
const ingredienteSeleccionado = ref(null) // Ingrediente que se seleccionó para agregar cantidad
const cantidadIngrediente = ref('') // Cantidad ingresada por el usuario
const showModal = ref(false)

const handleReceta = () => {
  // Guardar la receta y sus ingredientes con cantidades en la base de datos
  console.log('Receta:', receta.value)
  receta.value.ingredientes = ingredientesSeleccionados.value
  console.log('Ingredientes seleccionados:', ingredientesSeleccionados.value)
}

const handleIngredientChange = (event) => {
  // Obtener el ingrediente seleccionado y la cantidad
  const selectedId = event.target.value
  const ingrediente = ingredientes.value.find((ing) => ing.id === parseInt(selectedId))

  if (ingrediente) {
    ingredienteSeleccionado.value = ingrediente
    showModal.value = true
  }
}

const handleCantidadChange = () => {
  console.log('Cantidad:', cantidadIngrediente.value)
  if (cantidadIngrediente.value) {
    ingredientesSeleccionados.value.push({
      ...ingredienteSeleccionado.value,
      cantidad: cantidadIngrediente.value,
    })
    cantidadIngrediente.value = ''
    showModal.value = false
  }
}
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
            <form @submit.prevent="handleReceta">
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
                  <select
                    name="dificultades"
                    id="dificultades"
                    class="mt-2 w-full border-gray-300 focus:border-amber-600 focus:ring-amber-600 rounded-md shadow-sm"
                  >
                    <option value="0" selected>-------------</option>
                    <option
                      v-for="dificultad in dificultades"
                      :key="dificultad.id"
                      :value="dificultad.id"
                      :selected="receta.dificultad === dificultad.id"
                    >
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

              <!-- INGREDIENTES -->
              <div class="mt-2 md:mt-0">
                <InputLabel for="ingredientes" value="Ingredientes" />
                <select
                  name="ingredientes"
                  id="ingredientes"
                  class="mt-2 w-full border-gray-300 focus:border-amber-600 focus:ring-amber-600 rounded-md shadow-sm"
                  @change="handleIngredientChange"
                >
                  <option value="0" selected>-------------</option>
                  <option
                    v-for="ingrediente in ingredientes"
                    :key="ingrediente.id"
                    :value="ingrediente.id"
                  >
                    {{ ingrediente.nombre }}
                  </option>
                </select>
              </div>

              <div class="mt-4 p-4 border border-amber-600 rounded-md">
                <InputLabel class="font-medium">Ingredientes Seleccionados:</InputLabel>
                <ul class="list-disc pl-6">
                  <li
                    v-for="(ingrediente, index) in ingredientesSeleccionados"
                    :key="index"
                    class="mt-2 bg-amber-50 p-2 rounded-md"
                  >
                    {{ ingrediente.nombre }} - {{ ingrediente.cantidad }}
                  </li>
                </ul>
              </div>

              <div class="mt-4">
                <InputLabel for="instruciones" value="Instrucciones" />
                <EditorTiny v-model="receta.instrucciones"></EditorTiny>
                <!-- <InputError class="mt-2" :message="errors.descripcion?.[0]" /> -->
              </div>
              <PrimaryButton
                class="w-full mt-2"
                :class="{ 'opacity-25': processing }"
                :disabled="processing"
              >
                Nueva Receta
              </PrimaryButton>
            </form>
            <GoBackButton class="w-full mt-2">Atrás</GoBackButton>
          </div>
        </div>
      </div>
    </div>
    <Modal :show="showModal" @close="showModal = false">
      <template #default>
        <div class="p-4">
          <h3 class="text-xl font-semibold">
            Añade la cantidad de {{ ingredienteSeleccionado?.nombre }}
          </h3>
          <div class="mt-4">
            <InputLabel for="cantidad" value="Cantidad" />
            <TextInput
              id="cantidad"
              type="text"
              v-model="cantidadIngrediente"
              placeholder="Cantidad"
            />
          </div>
          <div class="mt-4 flex justify-end">
            <PrimaryButton @click="handleCantidadChange">Añadir</PrimaryButton>
          </div>
        </div>
      </template>
    </Modal>
  </AuthenticatedLayout>
</template>
