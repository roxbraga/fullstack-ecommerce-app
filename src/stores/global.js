import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import api from '../api'

export const useGlobalStore = defineStore('global', () => {
  const user = reactive({
    id: null,
    firstName: null,
    lastName: null,
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
      user.firstName = data.firstName
      user.lastName = data.lastName
      user.email = data.email
      user.mobileNo = data.mobileNo
      user.isAdmin = data.isAdmin
      user.token = localStorage.getItem('token')

      localStorage.setItem('role', data.isAdmin ? 'admin' : 'user')
    } catch {
      logout()
    }
  }

  const updatePassword = async (newPassword) => {
    const { data } = await api.patch('/users/update-password', {
      newPassword
    })
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    user.id = null
    user.firstName = null
    user.lastName = null
    user.email = null
    user.mobileNo = null
    user.isAdmin = null
    user.token = null
  }

  return {
    user,
    isLoggedIn,
    getUserDetails,
    updatePassword,
    logout
  }
})

const updatePassword = async (newPassword) => {
  const { data } = await api.patch('/users/update-password', {
    newPassword
  })
  return data
}
