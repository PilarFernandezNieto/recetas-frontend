<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import InputLabel from '../../../components/InputLabel.vue'
import TextInput from '../../../components/TextInput.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import GoBackButton from '../../../components/GoBackButton.vue'
import InputError from '../../../components/InputError.vue'
import { useIngredienteStore } from '../../../stores/ingredienteStore'
const ingredienteStore = useIngredienteStore()
const route = useRoute()
const id = route.params.id
const nuevaImagen = ref(null)

onMounted(async () => {
  await ingredienteStore.fetchIngrediente(id)
})

const processing = ref(false)
const errors = ref({})

const handleImageChange = (e) => {
  nuevaImagen.value = event.target.files[0]
}
const handleIngrediente = async () => {
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('nombre', ingredienteStore.ingrediente.nombre)
  formData.append('descripcion', ingredienteStore.ingrediente.descripcion)

  if (nuevaImagen.value) {
    formData.append('imagen', nuevaImagen.value)
  }
  await ingredienteStore.editarIngrediente(id, processing, errors, formData)
}

const getImagen = (imagen) => {
  if (imagen) {
    const base = import.meta.env.VITE_APP_BACKEND_URL.replace(/\/+$/, '') // quita slash final
    const path = imagen.replace(/^\/+/, '') // quita slash inicial
    return `${base}/${path}`
  }
}
</script>
<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-3xl text-gray-700 leading-tight">Editar Ingrediente</h2>
    </template>
    <div class="py-12">
      <div class="w-[90%] lg:w-contenedor-sm max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <div class="bg-white shadow-sm p-4 rounded-md">
            <form @submit.prevent="handleIngrediente">
              <div>
                <InputLabel for="nombre" value="Nombre" />

                <TextInput
                  id="nombre"
                  type="text"
                  class="mt-2 block w-full"
                  v-model="ingredienteStore.ingrediente.nombre"
                  autofocus
                />

                <InputError class="mt-2" :message="errors.nombre?.[0]" />
              </div>
              <div class="my-8">
                <label
                  for="imagen"
                  class="cursor-pointer bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-900 focus:ring-2 focus:ring-green-800"
                >
                  Subir imagen
                </label>
                <input type="file" id="imagen" @change="handleImageChange" class="hidden" />

                <InputError class="mt-2" :message="errors.imagen?.[0]" />
              </div>
              <div class="mb-4">
                <img
                  :src="getImagen(ingredienteStore.ingrediente.imagen)"
                  alt="imagen"
                  class="w-40"
                />
              </div>
              <div>
                <InputLabel for="descripcion" value="Descripción" />

                <textarea
                  id="descripcion"
                  v-model="ingredienteStore.ingrediente.descripcion"
                  class="mt-2 w-full min-h-[7rem] p-2 bg-white border border-gray-300 focus:border-green-800 focus:ring-green-800 shadow-sm rounded-md file:bg-amber-50 file:rounded-md"
                ></textarea>

                <InputError class="mt-2" :message="errors.descripcion?.[0]" />
              </div>
              <PrimaryButton
                class="w-full mt-2"
                :class="{ 'opacity-25': processing }"
                :disabled="processing"
              >
                Guardar cambios
              </PrimaryButton>
            </form>
            <GoBackButton class="w-full mt-2">Atrás</GoBackButton>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
