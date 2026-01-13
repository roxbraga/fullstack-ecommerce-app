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
        const { data } = await api.get('/products/active')
        this.products = data
      } finally {
        this.loading = false
      }
    },

    async fetchAllProducts() {
      this.loading = true
      try {
        const { data } = await api.get('/products/all')
        this.products = data
      } finally {
        this.loading = false
      }
    },

    async getProductById(productId) {
      const { data } = await api.get(`/products/${productId}`)
      return data
    },

    async addProduct(product) {
      const { data } = await api.post('/products', product)
      this.products.unshift(data.product)
      return data.product
    },

    async updateProduct(productId, updates) {
      const { data } = await api.patch(
        `/products/${productId}/update`,
        updates
      )

      const index = this.products.findIndex(p => p._id === productId)
      if (index !== -1) {
        this.products[index] = data.product
      }

      return data.product
    },

    async archiveProduct(productId) {
      const { data } = await api.patch(`/products/${productId}/archive`)

      const index = this.products.findIndex(p => p._id === productId)
      if (index !== -1) {
        this.products[index] = data.product
      }

      return data.product
    },

    async activateProduct(productId) {
      const { data } = await api.patch(`/products/${productId}/activate`)

      const index = this.products.findIndex(p => p._id === productId)
      if (index !== -1) {
        this.products[index] = data.product
      }

      return data.product
    },

    async deleteProduct(productId) {
      await api.delete(`/products/${productId}`)
      this.products = this.products.filter(p => p._id !== productId)
    }
  }
})

