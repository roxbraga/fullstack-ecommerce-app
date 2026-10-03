import { defineStore } from "pinia"
import api from "../api"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    loading: false
  }),

  getters: {
    selectedItems: (state) =>
      state.items.filter(item => item.selected),

    totalItems: (state) =>
      state.items.reduce(
        (total, item) => total + item.quantity,
        0
      ),

    totalPrice: (state) =>
      state.items
        .filter(item => item.selected)
        .reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
  },

  actions: {
    async fetchCart() {
      this.loading = true

      try {
        const { data } = await api.get("/cart/get-cart")

        this.items = (data.cartItems || []).map(item => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          stock: item.productId.stock,
          quantity: item.quantity,
          selected: item.selected ?? true
        }))
      } finally {
        this.loading = false
      }
    },

    async addToCart(productId, quantity = 1) {
      await api.post("/cart/add-to-cart", {
        productId,
        quantity
      })

      await this.fetchCart()
    },

    async updateItem(productId, payload) {
      await api.patch("/cart/update-cart-quantity", {
        productId,
        ...payload
      })

      await this.fetchCart()
    },

    async removeFromCart(productId) {
      await api.patch(
        `/cart/${productId}/remove-from-cart`
      )

      await this.fetchCart()
    },

    async clearCart() {
      await api.put("/cart/clear-cart")
      this.items = []
    }
  }
})