// products
import { defineStore } from 'pinia'
import api from '../api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false
  }),

  getters: {
    activeProducts: (state) =>
      state.products.filter(p => p.isActive && p.stock > 0)
  },

  actions: {
    async fetchActiveProducts() {
      this.loading = true
      try {
        const { data } = await api.get('/product/active')
        this.products = data
      } finally {
        this.loading = false
      }
    },

    async getProductById(productId) {
      const { data } = await api.get(`/product/${productId}`)
      return data
    },

    async fetchAllProducts() {
      this.loading = true
      try {
        const { data } = await api.get('/product/all')
        this.products = data
      } finally {
        this.loading = false
      }
    },

    async addProduct(product) {
      const { data } = await api.post('/product', product)
      this.products.unshift(data)
    },

    async updateProduct(productId, updates) {
      const { data } = await api.patch(
        `/product/${productId}/update`,
        updates
      )

      const index = this.products.findIndex(p => p._id === productId)
      if (index !== -1) this.products[index] = data
      return data
    },

    async archiveProduct(productId) {
      const { data } = await api.patch(`/product/${productId}/archive`)

      const index = this.products.findIndex(p => p._id === productId)
      if (index !== -1) {
        this.products[index] = data.product
      }

      return data
    },

    async activateProduct(productId) {
      const { data } = await api.patch(`/product/${productId}/activate`)

      const index = this.products.findIndex(p => p._id === productId)
      if (index !== -1) {
        this.products[index] = data.product ?? data
      }

      return data
    },

    async deleteProduct(productId) {
      await api.delete(`/product/${productId}`)
      this.products = this.products.filter(p => p._id !== productId)
    }
  }
})
