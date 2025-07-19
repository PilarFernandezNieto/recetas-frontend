<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import InputLabel from '../../../components/InputLabel.vue'
import InputError from '../../../components/InputError.vue'
import TextInput from '../../../components/TextInput.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import GoBackButton from '../../../components/GoBackButton.vue'
import EditorTiny from '../../../components/EditorTiny.vue'
import Modal from '../../../components/Modal.vue'
import { useRecetaStore } from '../../../stores/recetaStore'
import { useIngredienteStore } from '../../../stores/ingredienteStore'
import { useCategoriaStore } from '../../../stores/categoriaStore'

const route = useRoute()
const router = useRouter()
const recetaStore = useRecetaStore()
const ingredienteStore = useIngredienteStore()
const categoriaStore = useCategoriaStore()
const receta = ref(null)
const ingredientesSeleccionados = ref([])
const ingredienteSeleccionado = ref(null)
const cantidadIngrediente = ref('')
const unidadMedida = ref('')
const showModal = ref(false)
const processing = ref(false)
const errors = ref({})
const id = route.params.id
const nuevaImagen = ref(null)

onMounted(async () => {
  await recetaStore.fetchReceta(id)
  await ingredienteStore.fetchIngredientes()
  await ingredienteStore.fetchAllIngredientes()
  await recetaStore.fetchDificultades()
  await categoriaStore.fetchCategorias()

  // Inicializar ingredientes seleccionados
  ingredientesSeleccionados.value = recetaStore.receta.ingredientes.map((ing) => ({
    id: ing.id,
    nombre: ing.nombre,
    cantidad: ing.pivot?.cantidad,
    unidad: ing.pivot?.unidad,
  }))
})

const handleImageChange = (e) => {
  nuevaImagen.value = event.target.files[0]
}
const handleIngredientChange = (event) => {
  // Obtener el ingrediente seleccionado y la cantidad
  const selectedId = event.target.value
  const ingrediente = ingredienteStore.ingredientesTodos.find(
    (ing) => ing.id === parseInt(selectedId),
  )
  if (ingrediente) {
    ingredienteSeleccionado.value = ingrediente
    showModal.value = true
  }
}
const eliminarIngrediente = (index) => {
  ingredientesSeleccionados.value.splice(index, 1)
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

const handleReceta = async () => {
  recetaStore.receta.ingredientes = ingredientesSeleccionados.value
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('nombre', recetaStore.receta.nombre)
  formData.append('origen', recetaStore.receta.origen)
  formData.append('tiempo', recetaStore.receta.tiempo)
  formData.append('comensales', recetaStore.receta.comensales)
  formData.append('dificultad_id', recetaStore.receta.dificultad_id)
  formData.append('categoria_id', recetaStore.receta.categoria_id)
  formData.append('intro', recetaStore.receta.intro)
  formData.append('instrucciones', recetaStore.receta.instrucciones)

  recetaStore.receta.ingredientes.forEach((ing, index) => {
    formData.append(`ingredientes[${index}][ingrediente_id]`, ing.id)
    formData.append(`ingredientes[${index}][cantidad]`, ing.cantidad)
    formData.append(`ingredientes[${index}][unidad]`, ing.unidad)
  })

  if (nuevaImagen.value) {
    formData.append('imagen', nuevaImagen.value)
  }
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value)
  // }
  await recetaStore.editarReceta(id, processing, errors, formData)
}

const getImagen = (imagen) => {
  const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, ''); // quita slash final
  const path = imagen.replace(/^\/+/, ''); // quita slash inicial
  return `${base}/${path}`;
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
          <div class="py-4 text-gray-900 mb-4 text-2xl font-medium">Editar Receta</div>
          <div class="bg-white shadow-sm p-4 rounded-md">
            <form @submit.prevent="handleReceta">
              <div>
                <InputLabel for="nombre" value="Nombre" />
                <TextInput
                  id="nombre"
                  type="text"
                  class="mt-2 block w-full"
                  v-model="recetaStore.receta.nombre"
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
                  v-model="recetaStore.receta.intro"
                />

                <InputError class="mt-2" :message="errors.intro?.[0]" />
              </div>

              <div class="mt-2 md:grid grid-cols-3 gap-4">
                <div>
                  <InputLabel for="origen" value="Origen" />
                  <TextInput
                    id="origen"
                    type="text"
                    class="mt-2 block w-full"
                    v-model="recetaStore.receta.origen"
                  />
                  <InputError class="mt-2" :message="errors.origen?.[0]" />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="comensales" value="Comensales" />
                  <TextInput
                    id="comensales"
                    type="number"
                    class="mt-2 block w-full"
                    v-model="recetaStore.receta.comensales"
                  />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="tiempo" value="Tiempo" />
                  <TextInput
                    id="tiempo"
                    type="number"
                    class="mt-2 block w-full"
                    v-model="recetaStore.receta.tiempo"
                  />
                  <InputError class="mt-2" :message="errors.tiempo?.[0]" />
                </div>
              </div>

              <div class="mt-2 md:grid grid-cols-2 gap-4">
                <div class="mt-2 md:mt-0">
                  <InputLabel for="categoria" value="Categoría" />
                  <select
                    v-model="recetaStore.receta.categoria_id"
                    id="categoria"
                    class="mt-2 w-full border-gray-300 focus:border-amber-700 focus:ring-amber-700 rounded-md shadow-sm"
                  >
                    <option value="" selected>-------------</option>
                    <option
                      v-for="categoria in categoriaStore.categorias"
                      :key="categoria.id"
                      :value="categoria.id"
                    >
                      {{ categoria.nombre }}
                    </option>
                  </select>
                  <InputError class="mt-2" :message="errors.categoria_id?.[0]" />
                </div>
                <div class="mt-2 md:mt-0">
                  <InputLabel for="dificultad" value="Dificultad" />
                  <select
                    v-model="recetaStore.receta.dificultad_id"
                    id="dificultades"
                    class="mt-2 w-full border-gray-300 focus:border-amber-700 focus:ring-amber-700 rounded-md shadow-sm"
                  >
                    <option value="" selected>-------------</option>
                    <option
                      v-for="dificultad in recetaStore.dificultades"
                      :key="dificultad.id"
                      :value="dificultad.id"
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
              <div class="mb-4">
                <img :src="getImagen(recetaStore.receta.imagen)" alt="imagen" class="w-40" />
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
                <EditorTiny v-model="recetaStore.receta.instrucciones"></EditorTiny>
                <InputError class="mt-2" :message="errors.instrucciones?.[0]" />
              </div>
              <PrimaryButton
                class="w-full mt-2"
                :class="{ 'opacity-25': processing }"
                :disabled="processing"
              >
                Editar Receta
              </PrimaryButton>
            </form>
            <GoBackButton class="w-full mt-2">Atrás</GoBackButton>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed inset-0 bg-black opacity-50" v-if="processing"></div>
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
