<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputError from '../../components/InputError.vue'
import InputLabel from '../../components/InputLabel.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import TextInput from '../../components/TextInput.vue'
import { useAuthStore } from '../../stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

if (!route.query.email) {
  router.push('/')
}

const form = ref({
  token: route.params?.token,
  email: route.query?.email,
  password: '',
  password_confirmation: '',
})

const processing = ref(false)
const errors = ref({})
const status = ref(null)

const { resetPassword } = useAuthStore()

const handleResetPassword = async () => await resetPassword(processing, errors, status, form.value)
</script>

<template>
  <AuthLayout>
    <h1 class="font-titulares text-base text-center p-4 uppercase font-medium">Recuperar contraseña</h1>
    <form @submit.prevent="handleResetPassword()">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          readonly
        />

        <InputError class="mt-2" :message="errors?.email?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Contraseña" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors?.password?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" value="Confirmar contraseña" />

        <TextInput
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors?.password_confirmation?.[0]" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton class="w-full" :class="{ 'opacity-25': processing }" :disabled="processing">
          Reestablecer Contraseña
        </PrimaryButton>
      </div>
    </form>
  </AuthLayout>
</template>

<style scoped></style>
