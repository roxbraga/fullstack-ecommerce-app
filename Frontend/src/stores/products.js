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
      try {
        const res = await api.post('/product', newProduct)
        
        this.products.push(res.data.product)
      } catch (err) {
        console.error('Failed to add product:', err)
        throw err
      }
    },
    async toggleActive(product) {
      try {
        const res = await api.patch(`/product/${product._id}`, { isActive: !product.isActive })
        const index = this.products.findIndex(p => p._id === product._id)
        if (index !== -1) this.products[index] = res.data.product
      } catch (err) {
        console.error('Failed to toggle product status:', err)
        alert('Failed to update product status')
      }
    }
  }
})
