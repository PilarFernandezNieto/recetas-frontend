import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useIngredienteStore = defineStore('ingredientes', () => {
  const ingredientes = ref([])
  const loading = ref(true)
  const toastStore = useToastStore();
  const router = useRouter();

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
      const {data} = await axios.post('/api/ingredientes', datos, {
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

  return {
    ingredientes,
    fetchIngredientes,
    loading,
    nuevoIngrediente,
  }
})
