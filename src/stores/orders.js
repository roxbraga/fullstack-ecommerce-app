import { defineStore } from 'pinia'
import api from '../api'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false
  }),

  getters: {
    totalOrders: (state) =>
      state.orders.length
  },

  actions: {

    // GET MY ORDERS
    async fetchMyOrders() {
      this.loading = true

      try {
        const { data } = await api.get(
          '/orders/my-orders'
        )

        this.orders = data
      } catch (error) {
        console.error(
          'Failed to fetch my orders:',
          error.response?.data || error
        )

        throw error
      } finally {
        this.loading = false
      }
    },

    // GET ALL ORDERS - ADMIN
    async fetchAllOrders() {
      this.loading = true

      try {
        const { data } = await api.get(
          '/orders/all-orders'
        )

        this.orders = data
      } catch (error) {
        console.error(
          'Failed to fetch all orders:',
          error.response?.data || error
        )

        throw error
      } finally {
        this.loading = false
      }
    },

    // GET ABANDONED ORDERS - ADMIN
    async fetchAbandonedOrders() {
      this.loading = true

      try {
        const { data } = await api.get(
          '/orders/abandoned'
        )

        this.orders = data
      } catch (error) {
        console.error(
          'Failed to fetch abandoned orders:',
          error.response?.data || error
        )

        throw error
      } finally {
        this.loading = false
      }
    },

    // GET DRAFT ORDERS - ADMIN
    async fetchDraftOrders() {
      this.loading = true

      try {
        const { data } = await api.get(
          '/orders/draft'
        )

        this.orders = data
      } catch (error) {
        console.error(
          'Failed to fetch draft orders:',
          error.response?.data || error
        )

        throw error
      } finally {
        this.loading = false
      }
    },

    // UPDATE ORDER STATUS
    async updateOrderStatus(orderId, status) {
      try {
        const { data } = await api.patch(
          `/orders/${orderId}`,
          { status }
        )

        const index = this.orders.findIndex(
          order => order._id === orderId
        )

        if (index !== -1) {
          this.orders[index] = data
        }

        return data
      } catch (error) {
        console.error(
          'Failed to update order status:',
          error.response?.data || error
        )

        throw error
      }
    },

    // CANCEL ORDER
    async cancelOrder(orderId) {
      try {
        const { data } = await api.patch(
          `/orders/${orderId}/cancel`
        )

        const index = this.orders.findIndex(
          order => order._id === orderId
        )

        if (index !== -1) {
          this.orders[index] = data
        }

        return data
      } catch (error) {
        console.error(
          'Failed to cancel order:',
          error.response?.data || error
        )

        throw error
      }
    },

    // DELETE ORDER
    async deleteOrder(orderId) {
      try {
        await api.delete(
          `/orders/${orderId}`
        )

        this.orders = this.orders.filter(
          order => order._id !== orderId
        )
      } catch (error) {
        console.error(
          'Failed to delete order:',
          error.response?.data || error
        )

        throw error
      }
    },

    // CLEAR ORDERS
    clear() {
      this.orders = []
    }
  }
})