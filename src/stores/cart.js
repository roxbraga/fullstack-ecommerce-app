import { defineStore } from "pinia";
import api from "../api";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    loading: false
  }),

  getters: {
    selectedItems: (state) => state.items.filter(i => i.selected),

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
      this.loading = true;
      try {
        const { data } = await api.get("/cart/get-cart");

        this.items = data.items.map(i => ({
          _id: i.productId._id,
          name: i.productId.name,
          price: i.productId.price,
          stock: i.productId.stock,
          quantity: i.quantity,
          selected: i.selected
        }));
      } finally {
        this.loading = false;
      }
    },

    /* ADD */
    async addToCart(productId, quantity = 1) {
      await api.post("/cart/add-to-cart", { productId, quantity });
      await this.fetchCart();
    },

    /* UPDATE (qty / selected) */
    async updateItem(productId, payload) {
      const { data } = await api.patch("/cart/update-cart-quantity", {
        productId,
        ...payload
      });

      this.items = data.items.map(i => ({
        _id: i.productId._id,
        name: i.productId.name,
        price: i.productId.price,
        stock: i.productId.stock,
        quantity: i.quantity,
        selected: i.selected
      }));
    },

    /* REMOVE ONE */
    async removeFromCart(productId) {
      const { data } = await api.patch(
        `/cart/${productId}/remove-from-cart`
      );

      this.items = data.items.map(i => ({
        _id: i.productId._id,
        name: i.productId.name,
        price: i.productId.price,
        stock: i.productId.stock,
        quantity: i.quantity,
        selected: i.selected
      }));
    },

    /* CLEAR CART */
    async clearCart() {
      await api.put("/cart/clear-cart");
      this.items = [];
    }
  }
});
