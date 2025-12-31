import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import api from '../api'

export const useGlobalStore = defineStore('global', () => {
  const user = reactive({
    id: null,
    name: null,
    email: null,
    mobileNo: null,
    isAdmin: null,
    token: localStorage.getItem('token')
  })

  const isLoggedIn = computed(() => !!user.token)

  const getUserDetails = async () => {
    try {
      const { data } = await api.get('/users/details')

      user.id = data._id
      user.name = `${data.firstName} ${data.lastName}` 
      user.email = data.email
      user.mobileNo = data.mobileNo
      user.isAdmin = data.isAdmin

      localStorage.setItem('role', data.isAdmin ? 'admin' : 'user')
    } catch {
      logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    user.id = null
    user.name = null
    user.email = null
    user.mobileNo = null
    user.isAdmin = null
    user.token = null
  }

  return {
    user,
    isLoggedIn,
    getUserDetails,
    logout
  }
})
