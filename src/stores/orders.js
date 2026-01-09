// orders
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
        const { data } = await api.get('/orders/my-orders')
        this.orders = data
      } finally {
        this.loading = false
      }
    },

    async fetchAllOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/all-orders')
        this.orders = data
      } finally {
        this.loading = false
      }
    },

    async fetchAbandonedOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/abandoned')
        this.orders = data
      } finally {
        this.loading = false
      }
    },

    async fetchDraftOrders() {
      this.loading = true
      try {
        const { data } = await api.get('/orders/draft')
        this.orders = data
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      const { data } = await api.patch(`/orders/${orderId}`, { status })
      const index = this.orders.findIndex(o => o._id === orderId)
      if (index !== -1) this.orders[index] = data
    },

    async cancelOrder(orderId) {
      const { data } = await api.patch(`/orders/${orderId}/cancel`)
      const index = this.orders.findIndex(o => o._id === orderId)
      if (index !== -1) this.orders[index] = data
    },

    async deleteOrder(orderId) {
      await api.delete(`/orders/${orderId}`)
      this.orders = this.orders.filter(o => o._id !== orderId)
    },

    clear() {
      this.orders = []
    }
  }
})
