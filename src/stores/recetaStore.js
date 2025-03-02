import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useRecetaStore = defineStore('recetas', () => {
  const recetas = ref([])
  const receta = ref({})
  const dificultades = ref([])
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchRecetas = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get('/api/recetas')
      recetas.value = data.data
      console.log(data)
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
      const { data } = await axios.get(`/api/recetas/${id}`)
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
      const { data } = await axios.get('/api/dificultades')
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
      const { data } = await axios.post('/api/recetas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(data)
      if(data.type === 'success'){
        toastStore.mostrarExito(data.message);
        router.push({name: 'recetas'})
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

  return {
    fetchRecetas,
    fetchReceta,
    nuevaReceta,
    fetchDificultades,
    dificultades,
    loading,
    recetas,
    receta,
  }
})
