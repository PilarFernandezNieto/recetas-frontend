import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../utils/axios'
import { useToastStore } from './toastStore'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('users', () => {
  const users = ref([])

  const user = ref({})
  const loading = ref(true)
  const toastStore = useToastStore()
  const router = useRouter()

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchUsers = async () => {
    try {
      await csrf()
      loading.value = true
      const { data } = await axios.get(`/api/admin/users`)
      users.value = data.data
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
      const { data } = await axios.get(`/api/admin/users/${id}`)
      user.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }


  const editarUser = async (id, processing, errors, datos) => {
    
    processing.value = true
    try {
      await csrf()
      const { data } = await axios.put(`/api/admin/users/${id}`, datos, {
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

  const eliminarUser = async (id) => {
    try {
      await csrf()
      const { data } = await axios.delete(`/api/admin/users/${id}`)
      if (data.type === 'success') {
        toastStore.mostrarExito(data.message)
        users.value = users.value.filter((userSTore) => userSTore.id !== id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchUsers,
    fetchUser,
    users,
    user,
    editarUser,
    eliminarUser,
    loading,
  }
})
