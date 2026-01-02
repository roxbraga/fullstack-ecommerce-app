import { defineStore } from 'pinia'
import api from '../api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),

  actions: {
    async fetchAllProducts() {
      try {
        const res = await api.get('/product/all')
        this.products = res.data
      } catch (err) {
        console.error('Failed to fetch products:', err)
        this.products = []
      }
    },

    async addProduct(newProduct) {
      const res = await api.post('/product', newProduct)
      this.products.push(res.data.product)
    },

    async updateProduct(id, updates) {
      const res = await api.patch(`/product/${id}`, updates)

      const index = this.products.findIndex(p => p._id === id)
      if (index !== -1) {
        this.products[index] = res.data.product
      }

      return res.data.product
    },

    async toggleActive(product) {
      const res = await api.patch(`/product/${product._id}`, {
        isActive: !product.isActive
      })

      const index = this.products.findIndex(p => p._id === product._id)
      if (index !== -1) {
        this.products[index] = res.data.product
      }
    },

    async getProductById(id) {
      const local = this.products.find(p => p._id === id)
      if (local) return local

      const res = await api.get(`/product/${id}`)
      return res.data
    }
  }
})
