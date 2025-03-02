import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useRecetaStore = defineStore('recetas', () => {
  const recetas = ref([])
  const receta = ref({})
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
        await csrf();
        loading.value = true;
        const {data} = await axios.get(`/api/recetas/${id}`)
        receta.value = data;
        console.log(data)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
  }

  return {
    fetchRecetas,
    fetchReceta,
    loading,
    recetas,
    receta
  }
})
