import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useUsuarioStore = defineStore('usuarios', () => {
  const usuarios = ref([])

  const usuario = ref({})
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchUsers = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/usuarios`)
      usuarios.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (id) => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/usuarios/${id}`)
      usuario.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }


  const EditarUusuario = async (id, processing, errors, datos) => {
    
    processing.value = true
    try {
      await csrf()
      const { data } = await axios.put(`/api/admin/usuarios/${id}`, datos, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      

      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'users' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const eliminarUsuario = async (id) => {
    try {
      await csrf()
      const { data } = await axios.delete(`/api/admin/usuarios/${id}`)
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        usuarios.value = usuarios.value.filter((usuarioStore) => usuarioStore.id !== id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchUsers,
    fetchUser,
    usuarios,
    usuario,
    EditarUusuario,
    eliminarUsuario,
    loading,
  }
})
