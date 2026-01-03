import { defineStore } from 'pinia'
import api from '../api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false
  }),

  getters: {
    /* ================= USER / CATALOG ================= */

    activeProducts: (state) =>
      state.products.filter(p => p.isActive && p.stock > 0)
  },

  actions: {
    /* ================= USER / PUBLIC ================= */

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

    // AFTER CHECKOUT (refresh stock + availability)
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

    /* ================= ADMIN ONLY ================= */

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
      const res = await api.patch(`/product/${product._id}`, {
        isActive: !product.isActive
      })

      const index = this.products.findIndex(p => p._id === product._id)
      if (index !== -1) {
        this.products[index] = res.data.product
      }
    },

    

    // DELETE SINGLE PRODUCT
    async deleteProduct(id) {
      await api.delete(`/product/${id}`)

      // remove from local state
      this.products = this.products.filter(p => p._id !== id)
    },

    // DELETE MULTIPLE PRODUCTS
    async deleteMany(ids) {
      await api.post('/product/delete-many', { ids })

      // remove locally
      this.products = this.products.filter(p => !ids.includes(p._id))
    }
  }
})
