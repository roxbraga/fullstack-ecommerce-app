<template>
  <div class="page text-white">
    <div class="container py-5">

      <h2 class="page-title text-warning mb-4 text-center">
        Shopping Cart
      </h2>

      <div class="row g-4" v-if="cart.items.length">

        <div class="col-lg-8">
          <div class="cart-left">

            <div class="mb-3">
              <input type="checkbox" v-model="allSelected" />
              <span class="ms-2">Select all</span>
            </div>

            <div
              v-for="item in cart.items"
              :key="item._id"
              class="cart-row"
            >
              <div class="cart-product">
                <input
                  type="checkbox"
                  v-model="item.selected"
                  @change="toggleItem(item)"
                />

                <div class="ms-3">
                  <h6 class="mb-1">{{ item.name }}</h6>

                  <small class="text-warning">
                    ₱{{ item.price.toLocaleString() }}
                  </small>

                  <div class="mt-1">
                    <span
                      class="status-pill"
                      :class="item.stock <= 5 ? 'low' : 'active'"
                    >
                      {{ item.stock <= 5 ? 'Low Stock' : 'In Stock' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="cart-qty">
                <div class="qty-box">
                  <button @click="decrease(item)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increase(item)">+</button>
                </div>

                <button
                  class="remove-btn"
                  @click="cart.removeFromCart(item._id)"
                >
                  Remove
                </button>
              </div>

              <div class="cart-total">
                ₱{{ (item.price * item.quantity).toLocaleString() }}
              </div>
            </div>

          </div>
        </div>

        <div class="col-lg-4">
          <div class="summary-card mb-3">
            <h6 class="mb-2">Subtotal</h6>

            <h4 class="text-warning mb-1">
              ₱{{ selectedTotal.toLocaleString() }}
            </h4>

            <p class="small text-white">
              Taxes and shipping calculated at checkout
            </p>
          </div>

          <div class="summary-card">
            <h6 class="mb-3">Payment Options</h6>

            <div class="payment-option">
              <span class="payment-icon gcash">G</span>
              <span>E-Wallet (GCash / Maya)</span>
            </div>

            <div class="payment-option">
              <span class="payment-icon card">💳</span>
              <span>Credit / Debit Card</span>
            </div>

            <div class="payment-option">
              <span class="payment-icon cod">₱</span>
              <span>Cash on Delivery</span>
            </div>

            <button
              class="btn btn-warning w-100 mt-3"
              :disabled="!selectedItems.length"
              @click="checkoutSelected"
            >
              Checkout
            </button>
          </div>
        </div>
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

const allSelected = computed({
  get() {
    return cart.items.length > 0 &&
      cart.items.every(item => item.selected)
  },

  set(value) {
    cart.items.forEach(item => {
      cart.updateItem(item._id, {
        selected: value
      })
    })
  }
})

const toggleItem = (item) => {
  cart.updateItem(item._id, {
    selected: item.selected
  })
}

const selectedItems = computed(() =>
  cart.items.filter(item => item.selected)
)

const selectedTotal = computed(() =>
  selectedItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
)

const increase = (item) => {
  cart.updateItem(item._id, {
    quantity: item.quantity + 1
  })
}

const decrease = (item) => {
  if (item.quantity > 1) {
    cart.updateItem(item._id, {
      quantity: item.quantity - 1
    })
  }
}

const checkoutSelected = async () => {
  const selected = cart.items.filter(item => item.selected)

  if (!selected.length) {
    notyf.error('Please select at least one item')
    return
  }

  try {
    await api.post('/orders/checkout', {
      items: selected.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }))
    })

    const selectedIds = new Set(
      selected.map(item => item._id)
    )

    cart.items = cart.items.filter(
      item => !selectedIds.has(item._id)
    )

    await ordersStore.fetchMyOrders()
    await productsStore.fetchActiveProducts()

    notyf.success('Checkout successful!')

    router.push('/orders')
  } catch (err) {
    console.error(
      'Checkout error:',
      err.response?.data || err
    )

    notyf.error(
      err.response?.data?.message || 'Checkout failed'
    )
  }
}
</script>

<style scoped>
.page {
  padding-bottom: 4rem;
}

.page-title {
  font-size: 2.6rem;
  letter-spacing: 2px;
}

.cart-left {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: .5rem;
}

.cart-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  margin-bottom: 1rem;
  background: rgba(0,0,0,.55);
  border-radius: 16px;
  border: 1px solid rgba(255,193,7,.35);
}

.cart-product {
  display: flex;
  align-items: center;
}

.status-pill {
  display: inline-block;
  padding: .2rem .6rem;
  font-size: .65rem;
  border-radius: 999px;
  font-weight: 600;
}

.status-pill.active {
  background: rgba(25,135,84,.25);
  color: #4ade80;
}

.status-pill.low {
  background: rgba(255,0,0,.2);
  color: #ff4d4f;
}

.cart-qty {
  text-align: center;
}

.qty-box {
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255,193,7,.4);
  border-radius: 10px;
  overflow: hidden;
}

.qty-box button {
  background: transparent;
  color: #ffc107;
  border: none;
  width: 34px;
  height: 34px;
  font-weight: bold;
}

.qty-box span {
  width: 40px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #aaa;
  font-size: .75rem;
  margin-top: .3rem;
}

.remove-btn:hover {
  color: #ff4d4f;
}

.cart-total {
  text-align: right;
  font-weight: 600;
}

.summary-card {
  background: rgba(0,0,0,.6);
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(255,193,7,.45);
  position: sticky;
  top: 100px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .6rem .75rem;
  border-radius: 12px;
  margin-bottom: .5rem;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  font-size: .85rem;
}

.payment-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.payment-icon.gcash {
  background: rgba(0,122,255,.25);
  color: #4da3ff;
}

.payment-icon.card {
  background: rgba(255,193,7,.25);
  color: #ffc107;
}

.payment-icon.cod {
  background: rgba(25,135,84,.25);
  color: #4ade80;
}

@media (max-width: 768px) {
  .cart-row {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .cart-total {
    text-align: center;
  }
}
</style>