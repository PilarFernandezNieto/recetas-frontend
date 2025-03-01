import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'
import Login from '../views/auth/Login.vue'

export const useIngredienteStore = defineStore('ingredientes', () => {
  const ingredientes = ref([])
  const ingrediente = ref({})
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchIngredientes = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get('/api/ingredientes')
      ingredientes.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  const fetchIngrediente = async (id) => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/ingredientes/${id}`)
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
    console.log(formData)
    try {
      await csrf()
      const { data } = await axios.post('/api/ingredientes', formData, {
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
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    try {
      await csrf()
      const { data } = await axios.post(`/api/ingredientes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(data);
      
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
    try {
      await csrf()
      const { data } = await axios.delete(`/api/ingredientes/${id}`)
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        ingredientes.value = ingredientes.value.filter(ingredienteStore => ingredienteStore.id !== id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    ingredientes,
    ingrediente,
    fetchIngredientes,
    fetchIngrediente,
    loading,
    nuevoIngrediente,
    editarIngrediente,
    eliminarIngrediente
  }
})
