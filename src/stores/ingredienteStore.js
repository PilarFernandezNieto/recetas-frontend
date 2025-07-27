import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useIngredienteStore = defineStore('ingredientes', () => {
  const ingredientes = ref([])
  const ingredientesTodos = ref([])
  const ingrediente = ref({})
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()
  let eliminandoId = null

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchIngredientes = async (page = 1) => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/ingredientes?page=${page}`)
      ingredientes.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Carga todos los ingredientes para el select de ingredientes en la receta
   */
  const fetchAllIngredientes = async () => {
    try {
      await csrf()
      const { data } = await axios.get('/api/admin/ingredientes-todos')
      ingredientesTodos.value = data.data
    } catch (error) {
      console.log(error)
    }
  }
  const fetchIngrediente = async (id) => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/ingredientes/${id}`)

      ingrediente.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const nuevoIngrediente = async (processing, errors, formData) => {
    processing.value = true
    errors.value = {}

    try {
      await csrf()
      const { data } = await axios.post('/api/admin/ingredientes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'ingredientes' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }
  const editarIngrediente = async (id, processing, errors, formData) => {
    processing.value = true
    errors.value = {}
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      await csrf()
      const { data } = await axios.post(`/api/admin/ingredientes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'ingredientes' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const eliminarIngrediente = async (id) => {
    if (eliminandoId === id) return; // sale de aquí si ya se está eliminando este ingrediente
    eliminandoId = id // Evita múltiples clics
    try {
      await csrf()
      const { data } = await axios.delete(`/api/admin/ingredientes/${id}`)

      if (data.type === 'success') {
        console.log('Éxito:', data.message)
        toastStore.mostrarExito(data.message)
        ingredientes.value = {
          ...ingredientes.value,
          data: ingredientes.value.data.filter((ingredienteStore) => ingredienteStore.id !== id),
        }
      }
    } catch (error) {
      console.log('Error:', error.response?.status, error.response?.data)
      if (error.response?.status === 409) {
        toastStore.mostrarError(error.response.data.message)
      } else {
        toastStore.mostrarError('Error al eliminar el ingrediente')
      }
    } finally {
      eliminandoId = null // Resetea el ID al finalizar
    }
  }

  return {
    ingredientes,
    ingredientesTodos,
    ingrediente,
    fetchIngredientes,
    fetchAllIngredientes,
    fetchIngrediente,
    loading,
    nuevoIngrediente,
    editarIngrediente,
    eliminarIngrediente,
  }
})
