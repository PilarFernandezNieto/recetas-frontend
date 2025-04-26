<script setup>
import { ref, onMounted, computed } from 'vue'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import InputLabel from '../../../components/InputLabel.vue'
import TextInput from '../../../components/TextInput.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import GoBackButton from '../../../components/GoBackButton.vue'
import InputError from '../../../components/InputError.vue'
import EditorTiny from '../../../components/EditorTiny.vue'
import Modal from '../../../components/Modal.vue'
import { useRecetaStore } from '../../../stores/recetaStore'
import { useIngredienteStore } from '../../../stores/ingredienteStore'

const recetaStore = useRecetaStore()
const ingredienteStore = useIngredienteStore()
const receta = ref({
  nombre: '',
  origen: '',
  tiempo: '',
  comensales: '',
  dificultad_id: 0,
  imagen: '',
  intro: '',
  instrucciones: '',
  ingredientes: [],
})
const ingredientesSeleccionados = ref([]) // Para gestionar los ingredientes seleccionados con cantidades
const ingredienteSeleccionado = ref(null) // Ingrediente que se seleccionó para agregar cantidad
const cantidadIngrediente = ref('') // Cantidad ingresada por el usuario
const unidadMedida = ref('')
const showModal = ref(false)
const processing = ref(false)
const errors = ref({})

onMounted(async () => {
  await recetaStore.fetchDificultades()
  await ingredienteStore.fetchAllIngredientes()
})

const handleReceta = async () => {
  // Guardar la receta y sus ingredientes con cantidades en la base de datos
  console.log('Receta:', receta.value)
  console.log('Ingredientes seleccionados:', ingredientesSeleccionados.value)
  receta.value.ingredientes = ingredientesSeleccionados.value

  const formData = new FormData()
  formData.append('nombre', receta.value.nombre)
  formData.append('origen', receta.value.origen)
  formData.append('tiempo', receta.value.tiempo)
  formData.append('comensales', receta.value.comensales)
  formData.append('dificultad_id', receta.value.dificultad_id)
  formData.append('intro', receta.value.intro)
  formData.append('instrucciones', receta.value.instrucciones)

  receta.value.ingredientes.forEach((ing, index) => {
    formData.append(`ingredientes[${index}][ingrediente_id]`, ing.id)
    formData.append(`ingredientes[${index}][cantidad]`, ing.cantidad)
    formData.append(`ingredientes[${index}][unidad]`, ing.unidad)
  })

  if (receta.value.imagen) {
    formData.append('imagen', receta.value.imagen)
  }
  await recetaStore.nuevaReceta(processing, errors, formData)
}

const handleIngredientChange = (event) => {
  // Obtener el ingrediente seleccionado y la cantidad
  const selectedId = event.target.value
  const ingrediente = ingredienteStore.ingredientesTodos.find((ing) => ing.id === parseInt(selectedId))

  if (ingrediente) {
    ingredienteSeleccionado.value = ingrediente
    showModal.value = true
  }
}
const eliminarIngrediente = (index) => {
  ingredientesSeleccionados.value.splice(index, 1)
  console.log('Ingredientes después de eliminar:', ingredientesSeleccionados.value)
}

const handleCantidadChange = () => {
  if (cantidadIngrediente.value) {
    ingredientesSeleccionados.value.push({
      ...ingredienteSeleccionado.value,
      cantidad: cantidadIngrediente.value,
      unidad: unidadMedida.value,
    })
    cantidadIngrediente.value = ''
    unidadMedida.value = ''
    showModal.value = false
  }
}

const handleImageChange = (e) => {
  receta.value.imagen = e.target.files[0]
}
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Recetas</h2>
    </template>
    <div class="py-12">
      <div class="w-[90%] md:w-3/4 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-100 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <div class="py-4 text-gray-900 mb-4 text-2xl font-medium">Nueva Receta</div>
          <div class="bg-white shadow-sm p-4 rounded-md">
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

                <InputError class="mt-2" :message="errors.nombre?.[0]" />
              </div>
              <div class="mt-2">
                <InputLabel for="intro" value="Introducción" />
                <TextInput
                  id="intro"
                  type="text"
                  class="mt-2 block w-full"
                  v-model="receta.intro"
                />

                <InputError class="mt-2" :message="errors.intro?.[0]" />
              </div>
              <div class="mt-2 md:grid grid-cols-4 gap-4">
                <div>
                  <InputLabel for="origen" value="Origen" />
                  <TextInput
                    id="origen"
                    type="text"
                    class="mt-2 block w-full"
                    v-model="receta.origen"
                  />
                  <InputError class="mt-2" :message="errors.origen?.[0]" />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="comensales" value="Comensales" />
                  <TextInput
                    id="comensales"
                    type="number"
                    class="mt-2 block w-full"
                    v-model="receta.comensales"
                  />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="tiempo" value="Tiempo" />
                  <TextInput
                    id="tiempo"
                    type="number"
                    class="mt-2 block w-full"
                    v-model="receta.tiempo"
                  />
                  <InputError class="mt-2" :message="errors.tiempo?.[0]" />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="dificultad" value="Dificultad" />
                  <select
                    v-model="receta.dificultad_id"
                    id="dificultades"
                    class="mt-2 w-full border-gray-300 focus:border-amber-700 focus:ring-amber-700 rounded-md shadow-sm"
                  >
                    <option value="" selected>-------------</option>
                    <option
                      v-for="dificultad in recetaStore.dificultades"
                      :key="dificultad.id"
                      :value="dificultad.id"
                      :selected="receta.dificultad_id === dificultad.id"
                    >
                      {{ dificultad.nombre }}
                    </option>
                  </select>
                  <InputError class="mt-2" :message="errors.dificultad_id?.[0]" />
                </div>
              </div>
              <div class="my-8">
                <label
                  for="imagen"
                  class="cursor-pointer bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 focus:ring-2 focus:ring-amber-700"
                >
                  Subir imagen
                </label>
                <input type="file" id="imagen" @change="handleImageChange" class="hidden" />

                <InputError class="mt-2" :message="errors.imagen?.[0]" />
              </div>

              <!-- INGREDIENTES -->
              <div class="mt-2 md:mt-0">
                <InputLabel for="ingredientes" value="Ingredientes" />
                <select
                  name="ingredientes"
                  id="ingredientes"
                  class="mt-2 w-full border-gray-300 focus:border-amber-700 focus:ring-amber-700 rounded-md shadow-sm"
                  @change="handleIngredientChange"
                >
                  <option selected>-------------</option>
                  <option
                    v-for="ingrediente in ingredienteStore.ingredientesTodos"
                    :key="ingrediente.id"
                    :value="ingrediente.id"
                  >
                    {{ ingrediente.nombre }}
                  </option>
                </select>
                <InputError class="mt-2" :message="errors.ingredientes?.[0]" />
              </div>

              <div class="mt-4 p-4 border border-amber-700 rounded-md">
                <InputLabel class="font-medium">Ingredientes Seleccionados:</InputLabel>
                <ul class="list-disc marker:text-amber-700 pl-0">
                  <li
                    v-for="(ingrediente, index) in ingredientesSeleccionados"
                    :key="ingrediente.id"
                    class="mt-2 bg-amber-100 p-2 rounded-md flex justify-between items-center"
                  >
                    <span
                      >{{ ingrediente.nombre }} - {{ ingrediente.cantidad }}
                      {{ ingrediente.unidad }}</span
                    >
                    <button
                      @click="eliminarIngrediente(index)"
                      class="ml-4 bg-red-600 hover:bg-red-800 text-white rounded-md px-3 py-1 font-bold"
                    >
                      <i class="fa-solid fa-xmark text-white"></i>
                    </button>
                  </li>
                </ul>
              </div>

              <div class="mt-4">
                <InputLabel for="instrucciones" value="Instrucciones" />
                <EditorTiny v-model="receta.instrucciones"></EditorTiny>
                <InputError class="mt-2" :message="errors.instrucciones?.[0]" />
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
          <h3 class="text-xl font-semibold text-center">
            Añade la cantidad de {{ ingredienteSeleccionado?.nombre }}
          </h3>
          <div class="mt-4 flex flex-col md:flex-row items-center md:justify-center gap-4">
            <div>
              <TextInput
                id="cantidad"
                type="text"
                v-model="cantidadIngrediente"
                placeholder="Cantidad"
              />
            </div>
            <div>
              <TextInput
                id="unidad"
                type="text"
                v-model="unidadMedida"
                placeholder="Unidad de medida"
              />
            </div>
          </div>
          <div class="mt-4 flex justify-center">
            <PrimaryButton @click="handleCantidadChange">Añadir</PrimaryButton>
          </div>
        </div>
      </template>
    </Modal>
  </AuthenticatedLayout>
</template>
