import { defineStore } from 'pinia'
import api from '../api'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false
  }),

  getters: {
    totalOrders: (state) => state.orders.length
  },

  actions: {
    
       // REGULAR USER
       
    async fetchMyOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/my')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch my orders', err)
      } finally {
        this.loading = false
      }
    },

    // ADMIN – ALL ORDERS

    async fetchAllOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/all')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch all orders', err)
      } finally {
        this.loading = false
      }
    },

    // AFTER CHECKOUT (USER)
    
    async refreshOrders() {
      const { data } = await api.get('/orders/my')
      this.orders = data
    },

    clear() {
      this.orders = []
    }
  }
})
