<template>
  <div class="page text-white">
    <div class="container py-5">

      <h2 class="page-title text-warning mb-4 text-center">My Cart</h2>

      <!-- SELECT ALL -->
      <div v-if="cart.items.length" class="mb-3">
        <input
          type="checkbox"
          :checked="allSelected"
          @change="toggleAll"
        />
        <span class="ms-2">Select all</span>
      </div>

      <!-- CART ITEMS -->
      <div
        v-for="item in cart.items"
        :key="item._id"
        class="cart-item mb-3"
      >
        <input
          type="checkbox"
          :checked="item.selected"
          @change="toggleItem(item)"
        />

        <div class="flex-grow-1 ms-3">
          <h5 class="mb-1">{{ item.name }}</h5>
          <p class="mb-1 text-warning">
            ₱{{ item.price.toLocaleString() }}
          </p>

          <div class="d-flex gap-2 align-items-center">
            <button
              class="btn btn-sm btn-outline-warning"
              @click="decrease(item)"
            >−</button>

            <span>{{ item.quantity }}</span>

            <button
              class="btn btn-sm btn-outline-warning"
              @click="increase(item)"
            >+</button>
          </div>
        </div>

        <div class="d-flex flex-column gap-2">
          <button
            class="btn btn-sm btn-warning"
            @click="checkoutSingle(item)"
          >
            Checkout
          </button>

          <button
            class="btn btn-sm btn-danger"
            @click="cart.removeFromCart(item._id)"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- TOTAL + CHECKOUT -->
      <div v-if="cart.selectedItems.length">
        <hr />
        <h4 class="text-end">
          Total:
          <span class="text-warning">
            ₱{{ cart.totalPrice.toLocaleString() }}
          </span>
        </h4>

        <button
          class="btn btn-warning btn-lg w-100 mt-3"
          @click="checkoutSelected"
        >
          Checkout Selected
        </button>
      </div>

      <p v-else class="text-center text-muted">
        Your cart is empty
      </p>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useOrdersStore } from '../stores/orders'
import { useProductsStore } from '../stores/products'
import api from '../api'
import { Notyf } from 'notyf'

const cart = useCartStore()
const ordersStore = useOrdersStore()
const productsStore = useProductsStore()
const router = useRouter()
const notyf = new Notyf()

onMounted(() => {
  cart.fetchCart()
})

const allSelected = computed(() =>
  cart.items.length && cart.items.every(i => i.selected)
)

const toggleAll = async (e) => {
  await Promise.all(
    cart.items.map(item =>
      cart.updateItem(item._id, { selected: e.target.checked })
    )
  )
}

const toggleItem = (item) => {
  cart.updateItem(item._id, { selected: !item.selected })
}

const increase = (item) => {
  cart.updateItem(item._id, { quantity: item.quantity + 1 })
}

const decrease = (item) => {
  if (item.quantity > 1) {
    cart.updateItem(item._id, { quantity: item.quantity - 1 })
  }
}

/* SINGLE CHECKOUT */
const checkoutSingle = async (item) => {
  try {
    await api.post('/orders/checkout', {
      items: [{
        productId: item._id,
        quantity: item.quantity
      }],
      totalPrice: item.price * item.quantity
    })

    await cart.removeFromCart(item._id)
    await ordersStore.fetchMyOrders()
    await productsStore.fetchActiveProducts()

    notyf.success('Item checked out!')
    router.push('/orders')
  } catch (err) {
    notyf.error(err.response?.data?.message || 'Checkout failed')
  }
}

/* MULTI CHECKOUT */
const checkoutSelected = async () => {
  try {
    await api.post('/orders/checkout', {
      items: cart.selectedItems.map(item => ({
        productId: item._id,
        quantity: item.quantity
      })),
      totalPrice: cart.totalPrice
    })

    await cart.clearCart()
    await ordersStore.fetchMyOrders()
    await productsStore.fetchActiveProducts()

    notyf.success('Checkout successful!')
    router.push('/orders')
  } catch (err) {
    notyf.error(err.response?.data?.message || 'Checkout failed')
  }
}
</script>

<style scoped>
.page {
  padding-bottom: 4rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background: rgba(33, 37, 41, 0.75);
  padding: 1rem;
  border-radius: 14px;
}

.page-title {
  font-family: sans-serif;
  color: #ffd84d;
  font-size: 2.5rem;
}
</style>
