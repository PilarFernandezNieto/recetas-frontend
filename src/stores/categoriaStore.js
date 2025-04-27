import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'


export const useCategoriaStore = defineStore('categorias', () => {
  const categorias = ref([])
  
  const categoria = ref({
    nombre: ""
  });
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchCategorias = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/categorias`)
      categorias.value = data.data
      
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }


  const fetchCategoria = async (id) => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/categorias/${id}`)
      categoria.value = data
      console.log(categoria.value);
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const nuevaCategoria = async (processing, errors, datos) => {
    processing.value = true
    errors.value = {}
    
    
    try {
      await csrf()
      const { data } = await axios.post('/api/admin/categorias', datos, {
        headers: {
          'Content-Type': 'application/json,',
        },
      })
      console.log("Nueva", data);
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'categorias' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
        
      }
    } finally {
      processing.value = false
    }
  }
  const editarCategoria = async (id, processing, errors, datos) => {
    processing.value = true
    console.log("Datos", datos);
    try {
      await csrf()
      const { data } = await axios.put(`/api/admin/categorias/${id}`, datos, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("Edición", data);
      
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        router.push({ name: 'categorias' })
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const eliminarCategoria = async (id) => {
    try {
      await csrf()
      const { data } = await axios.delete(`/api/admin/categorias/${id}`)
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        categorias.value = categorias.value.filter(categoriaStore => categoriaStore.id !== id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchCategorias,
    fetchCategoria,
    categorias,
    categoria,
    nuevaCategoria,
    editarCategoria,
    eliminarCategoria,
    loading,

  }
})
