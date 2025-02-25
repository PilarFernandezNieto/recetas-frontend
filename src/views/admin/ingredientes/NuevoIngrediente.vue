<script setup>
import { ref } from 'vue'
import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout.vue'
import InputLabel from '../../../components/InputLabel.vue'
import TextInput from '../../../components/TextInput.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import { useIngredienteStore } from '../../../stores/ingredienteStore'
const ingredienteStore = useIngredienteStore()

const form = ref({
  nombre: '',
  imagen: '',
  descripcion: '',
})

const processing = ref(false)
const errors = ref({})

const handleImageChange = (e) => {
  form.value.imagen = e.target.files[0]
  console.log(form.value.imagen)
}
const handleRegister = async () => await register(processing, errors, form.value)
const handleIngrediente = async () => {
  await ingredienteStore.nuevoIngrediente(processing, errors, form.value)
}
</script>
<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Ingredientes</h2>
    </template>
    <div class="py-12">
      <div class="w-1/2 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-50 overflow-hidden shadow-sm sm:rounded-lg py-4 px-8">
          <div class="py-4 text-gray-900 mb-4 text-2xl font-medium">Nuevo Ingrediente</div>
          <template v-if="ingredienteStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="bg-white shadow-sm p-4 rounded-lg">
            <form @submit.prevent="handleIngrediente()">
              <div>
                <InputLabel for="nombre" value="Nombre" />

                <TextInput
                  id="nombre"
                  type="text"
                  class="mt-2 block w-full"
                  v-model="form.nombre"
                  autofocus
                />

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

                <!-- <InputError class="mt-2" :message="errors.file?.[0]" /> -->
              </div>
              <div>
                <InputLabel for="descripcion" value="Descripción" />

                <textarea
                  id="descripcion"
                  v-model="form.descripcion"
                  class="mt-2 w-full p-2 bg-white border border-gray-300 focus:border-amber-600 focus:ring-amber-600 shadow-sm rounded-md file:bg-amber-50 file:rounded-md"
                ></textarea>

                <!-- <InputError class="mt-2" :message="errors.descripcion?.[0]" /> -->
              </div>
              <PrimaryButton
                class="w-full mt-2"
                :class="{ 'opacity-25': processing }"
                :disabled="processing"
              >
                Nuevo Ingrediente
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
