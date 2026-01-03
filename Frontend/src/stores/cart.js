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
    /* LOAD CART */
    async fetchCart() {
      this.loading = true
      try {
        const { data } = await api.get('/cart')

        this.items = data.items.map(i => ({
          _id: i.productId._id,
          name: i.productId.name,
          price: i.productId.price,
          stock: i.productId.stock,
          quantity: i.quantity,
          selected: i.selected
        }))
      } finally {
        this.loading = false
      }
    },

    /* ADD */
    async addToCart(productId, quantity = 1) {
      await api.post('/cart/add', { productId, quantity })
      await this.fetchCart()
    },

    /* UPDATE (qty / selected) */
    async updateItem(productId, payload) {
      const { data } = await api.patch('/cart/update', {
        productId,
        ...payload
      })

      this.items = data.items.map(i => ({
        _id: i.productId._id,
        name: i.productId.name,
        price: i.productId.price,
        stock: i.productId.stock,
        quantity: i.quantity,
        selected: i.selected
      }))
    },

    /* REMOVE ONE */
    async removeFromCart(productId) {
      const { data } = await api.delete(`/cart/remove/${productId}`)

      this.items = data.items.map(i => ({
        _id: i.productId._id,
        name: i.productId.name,
        price: i.productId.price,
        stock: i.productId.stock,
        quantity: i.quantity,
        selected: i.selected
      }))
    },

    /* CLEAR AFTER CHECKOUT */
    async clearCart() {
      await api.delete('/cart/clear')
      this.items = []
    }
  }
})
