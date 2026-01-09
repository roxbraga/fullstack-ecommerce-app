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
    /* USER / PUBLIC */

    async fetchActiveProducts() {
      this.loading = true
      try {
        const res = await api.get('/product')
        this.products = res.data
      } catch (err) {
        console.error('Failed to fetch active products:', err)
        this.products = []
      } finally {
        this.loading = false
      }
    },

    async refreshProducts() {
      const res = await api.get('/product')
      this.products = res.data
    },

    async getProductById(id) {
      const local = this.products.find(p => p._id === id)
      if (local) return local

      const res = await api.get(`/product/specific/${id}`)
      return res.data
    },

    /* ADMIN */

    async fetchAllProducts() {
      this.loading = true
      try {
        const res = await api.get('/product/all')
        this.products = res.data
      } catch (err) {
        console.error('Failed to fetch all products:', err)
        this.products = []
      } finally {
        this.loading = false
      }
    },

    async fetchArchivedProducts() {
      this.loading = true
      try {
        const res = await api.get('/product/archived')
        this.products = res.data
      } catch (err) {
        console.error('Failed to fetch archived products:', err)
        this.products = []
      } finally {
        this.loading = false
      }
    },

    async addProduct(newProduct) {
      const res = await api.post('/product', newProduct)
      this.products.unshift(res.data.product)
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
      if (product.isActive) {
        await api.patch(`/product/${product._id}/archive`)
        this.products = this.products.filter(p => p._id !== product._id)
      } else {
        const res = await api.patch(`/product/${product._id}`, { isActive: true })
        this.products = this.products.filter(p => p._id !== product._id)
        return res.data.product
      }
    },

    async archiveProduct(id) {
      await api.patch(`/product/${id}/archive`)
      this.products = this.products.filter(p => p._id !== id)
    },

    async restoreProduct(id) {
      const res = await api.patch(`/product/${id}`, { isActive: true })
      this.products = this.products.filter(p => p._id !== id)
      return res.data.product
    }
  }
})
