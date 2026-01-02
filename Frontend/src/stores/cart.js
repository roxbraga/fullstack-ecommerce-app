import { defineStore } from 'pinia'
import api from '../api'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false
  }),

  getters: {
    selectedItems: (state) =>
      state.items.filter(i => i.selected),

    totalItems: (state) =>
      state.items
        .filter(i => i.selected)
        .reduce((sum, i) => sum + i.quantity, 0),

    totalPrice: (state) =>
      state.items
        .filter(i => i.selected)
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  actions: {
    async fetchCart() {
      this.loading = true
      try {
        const { data } = await api.get('/cart')
        this.items = data.items.map(i => ({
          ...i.productId,
          quantity: i.quantity,
          selected: i.selected
        }))
      } finally {
        this.loading = false
      }
    },

    async addToCart(productId, quantity = 1) {
      await api.post('/cart/add', { productId, quantity })
      await this.fetchCart()
    },

    async updateItem(productId, payload) {
      const { data } = await api.patch('/cart/update', {
        productId,
        ...payload
      })
      this.items = data.items.map(i => ({
        ...i.productId,
        quantity: i.quantity,
        selected: i.selected
      }))
    },

    async removeFromCart(productId) {
      const { data } = await api.delete(`/cart/remove/${productId}`)
      this.items = data.items.map(i => ({
        ...i.productId,
        quantity: i.quantity,
        selected: i.selected
      }))
    },

    async clearCart() {
      await api.delete('/cart/clear')
      this.items = []
    }
  }
})
