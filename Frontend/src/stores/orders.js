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
    async fetchMyOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/my')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch orders', err)
      } finally {
        this.loading = false
      }
    },

    // 🔥 CALL THIS AFTER CHECKOUT
    async refreshOrders() {
      const { data } = await api.get('/orders/my')
      this.orders = data
    },

    clear() {
      this.orders = []
    }
  }
})
