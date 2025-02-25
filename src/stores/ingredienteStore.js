import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import axios from '../utils/axios'

export const useIngredienteStore = defineStore('ingredientes', () => {
  const ingredientes = ref([])
  const loading = ref(true)

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchIngredientes = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get('/api/ingredientes')
      console.log(data.data)

      ingredientes.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const nuevoIngrediente = async (processing, errors, { ...datos }) => {
    console.log(datos)
    processing.value = true
    errors.value = {}

    try {
      await csrf()
      const { data } = await axios.post('/api/ingredientes', datos, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      processing.value = false
    }
  }

  return {
    ingredientes,
    fetchIngredientes,
    loading,
    nuevoIngrediente,
  }
})
