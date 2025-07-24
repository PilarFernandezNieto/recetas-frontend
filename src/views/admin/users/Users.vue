<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import NewElementLink from '../../../components/NewElementLink.vue'
import { FwbSpinner } from 'flowbite-vue'
import User from '../../../components/User.vue'
import { useUsuarioStore } from '../../../stores/usuarioStore'

const usuarioStore = useUsuarioStore()
onMounted(() => {
  usuarioStore.fetchUsers()
})
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-700 leading-tight">Usuarios</h2>
    </template>

    <div class="py-12">
      <div class="w-[90%] md:w-3/4 mx-auto sm:px-6 lg:px-8">
        <div class="bg-amber-100 overflow-hidden shadow-sm sm:rounded-md py-4 px-4 md:px-8">
          <h3 class="py-6 text-gray-900 mb-4 text-2xl font-medium">Listado de usuarios</h3>
          <template v-if="usuarioStore.loading">
            <div class="flex justify-center mb-8">
              <fwb-spinner size="10" color="green" />
            </div>
          </template>
          <div class="grid grid-cols-1 gap-4">
            <User
              v-for="user in usuarioStore.users"
              :key="user.id"
              :user="user"
            />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
