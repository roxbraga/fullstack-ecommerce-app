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
    /* ================= USER ================= */

    async fetchMyOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/my')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch my orders', err)
        this.orders = []
      } finally {
        this.loading = false
      }
    },

    async refreshOrders() {
      const { data } = await api.get('/orders/my')
      this.orders = data
    },

    /* ================= ADMIN ================= */

    // ALL ORDERS
    async fetchAllOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/all')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch all orders', err)
        this.orders = []
      } finally {
        this.loading = false
      }
    },

    //  ABANDONED ORDERS 
    async fetchAbandonedOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/abandoned')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch abandoned orders', err)
        this.orders = []
      } finally {
        this.loading = false
      }
    },

    //  DRAFT ORDERS 
    async fetchDraftOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/draft')
        this.orders = data
      } catch (err) {
        console.error('Failed to fetch draft orders', err)
        this.orders = []
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      const { data } = await api.patch(`/orders/${orderId}`, { status })

      const index = this.orders.findIndex(o => o._id === orderId)
      if (index !== -1) {
        this.orders[index] = data
      }
    },

    /* CANCEL ORDER (ROLLBACK STOCK) */
    async cancelOrder(orderId) {
      const { data } = await api.patch(`/orders/${orderId}/cancel`)

      const index = this.orders.findIndex(o => o._id === orderId)
      if (index !== -1) {
        this.orders[index] = data
      }
    },

    /* DELETE ORDER */
    async deleteOrder(orderId) {
      await api.delete(`/orders/${orderId}`)
      this.orders = this.orders.filter(o => o._id !== orderId)
    },

    /* ================= CLEANUP ================= */

    clear() {
      this.orders = []
    }
  }
})
