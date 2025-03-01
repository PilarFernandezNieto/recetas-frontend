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
  formData.append("_method", "PUT");
  formData.append('nombre', ingredienteStore.ingrediente.nombre)
  formData.append('descripcion', ingredienteStore.ingrediente.descripcion)

  if (nuevaImagen.value) {
    formData.append('imagen', nuevaImagen.value)
  } 
  await ingredienteStore.editarIngrediente(id, processing, errors, formData)
}

const getImagen = computed(
  () => `${import.meta.env.VITE_APP_BACKEND_URL}${ingredienteStore.ingrediente.imagen}`,
)
</script>
<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Ingredientes</h2>
    </template>
    <div class="py-12">
      <div class="w-1/2 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg py-4 px-8">
          <div class="py-4 text-gray-900 mb-4 text-2xl font-medium">Editar Ingrediente</div>
          <div class="bg-white shadow-sm p-4 rounded-lg">
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
                  class="cursor-pointer bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-600"
                >
                  Subir imagen
                </label>
                <input type="file" id="imagen" @change="handleImageChange" class="hidden" />

                <InputError class="mt-2" :message="errors.imagen?.[0]" />
              </div>
              <div class="mb-4">
                <img :src="getImagen" alt="imagen" class="w-40" />
              </div>
              <div>
                <InputLabel for="descripcion" value="Descripción" />

                <textarea
                  id="descripcion"
                  v-model="ingredienteStore.ingrediente.descripcion"
                  class="mt-2 w-full p-2 bg-white border border-gray-300 focus:border-amber-600 focus:ring-amber-600 shadow-sm rounded-md file:bg-amber-50 file:rounded-md"
                ></textarea>

                <InputError class="mt-2" :message="errors.descripcion?.[0]" />
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
