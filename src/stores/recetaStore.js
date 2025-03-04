import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useRecetaStore = defineStore('recetas', () => {
  const recetas = ref([])
  const receta = ref([])
  const dificultades = ref([])
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchRecetas = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get('/api/admin/recetas')
      recetas.value = data.data
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchReceta = async (id) => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/recetas/${id}`)
      receta.value = data
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchDificultades = async () => {
    try {
      await csrf()
      const { data } = await axios.get('/api/admin/dificultades')
      dificultades.value = data.data
    } catch (error) {
      console.log(error)
    }
  }

  const nuevaReceta = async (processing, errors, formData) => {
    // Recorriendo el FormData
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`)
    // }
    processing.value = true
    errors.value = {}
    try {
      await csrf()
      const { data } = await axios.post('/api/admin/recetas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'recetas' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
      } else {
        console.log('Error en nueva receta', error)
      }
    } finally {
      processing.value = false
    }
  }

  const editarReceta = async (id, processing, errors, formData) => {
    processing.value = true
    errors.value = {}
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value)
    // }
    try {
      await csrf()
      const { data } = await axios.post(`/api/admin/recetas/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'recetas' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }
  const eliminarReceta = async (id) => {
    try {
      await csrf()
      const { data } = await axios.delete(`/api/admin/recetas/${id}`)
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        recetas.value = recetas.value.filter(ingredienteStore => ingredienteStore.id !== id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchRecetas,
    fetchReceta,
    nuevaReceta,
    editarReceta,
    eliminarReceta,
    fetchDificultades,
    dificultades,
    loading,
    recetas,
    receta,
  }
})
