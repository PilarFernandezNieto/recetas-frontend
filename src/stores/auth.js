import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from '../utils/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.is_admin)

  const router = useRouter()

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user')
  
      user.value = data
    } catch (error) {
      if (error.response.status === 409) {
        router.push({ name: 'verify-email' })
      }
    }
  }

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const login = async (processing, errors, { ...data }) => {
    processing.value = true
    errors.value = {}

    try {
      await csrf()

      await axios.post('/login', data)

      await fetchUser()
    
      router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const register = async (processing, errors, { ...data }) => {
    processing.value = true
    errors.value = {}

    try {
      await csrf()
      // Obtener token XSRF-TOKEN desde la cookie
      const token = decodeURIComponent(
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] || '',
      )

      // Forzar el header X-XSRF-TOKEN en axios
      axios.defaults.headers.common['X-XSRF-TOKEN'] = token

      await axios.post('/register', data)

      await fetchUser()
      if (!user.value.email_verified_at) {
        router.push({ name: 'verify-email' })
      } else {
        router.push({ name: 'dashboard' })
      }
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const forgotPassword = async (processing, errors, status, email) => {
    processing.value = true
    errors.value = {}
    status.value = null

    try {
      await csrf()

      const { data } = await axios.post('/forgot-password', { email })

      status.value = data.status
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const resetPassword = async (processing, errors, status, { ...data }) => {
    processing.value = true
    errors.value = {}
    status.value = null

    try {
      await csrf()

      const response = await axios.post('/reset-password', data)

      router.push({
        name: 'login',
        query: { reset: btoa(response.data?.status) },
      })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const resendEmailVerification = async (processing, status) => {
    processing.value = true
    status.value = null

    const { data } = await axios.post('/email/verification-notification')

    status.value = data.status

    processing.value = false
  }

  const logout = async () => {
    await axios.post('/logout')

    user.value = null

    router.push({ name: 'login' })
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    fetchUser,
    login,
    register,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
})
