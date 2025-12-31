<template>
  <div class="user-root">
    <div class="container py-5">
      <h2 class="page-title mb-4 text-center fw-bold">Our Products</h2>

      <div class="row g-4">
        <div
          v-for="product in products"
          :key="product._id"
          class="col-md-4 col-sm-6"
        >
          <div class="product-card">
            <h5 class="product-name">{{ product.name }}</h5>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-price">₱{{ product.price }}</p>

            <div class="d-grid gap-2 mt-3">
              <button
                class="btn btn-outline-warning"
                @click="goToDetails(product._id)"
              >
                View Details
              </button>

              <button
                class="btn btn-warning"
                @click="addToCart(product._id)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <p v-if="!products.length" class="text-center text-muted mt-5">
        No products available.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { useCartStore } from '../stores/cart'
import { Notyf } from 'notyf'

const products = ref([])
const router = useRouter()
const cart = useCartStore()
const notyf = new Notyf()

const fetchProducts = async () => {
  try {
    const { data } = await api.get('/product')
    products.value = data
  } catch (err) {
    console.error('Failed to load products', err)
  }
}

const goToDetails = (id) => {
  router.push(`/products/${id}`)
}

/* 🔥 FINAL ADD TO CART */
const addToCart = async (productId) => {
  try {
    await cart.addToCart(productId)
    notyf.success('Added to cart')
  } catch (err) {
    console.error(err.response?.data || err)
    notyf.error('Failed to add to cart')
  }
}


onMounted(fetchProducts)
</script>

<style scoped>
.user-root {
  min-height: 100vh;
  background: url('../assets/rox09.jpg') center / cover no-repeat;
  position: relative;
}

.user-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
}

.container {
  position: relative;
  z-index: 1;
}

.page-title {
  font-family: 'League Script', cursive;
  color: #ffd84d;
  font-size: 2.5rem;
}

.product-card {
  background: rgba(33,37,41,0.75);
  backdrop-filter: blur(6px);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.product-name {
  font-weight: bold;
}

.product-category {
  color: #ccc;
  font-size: 0.9rem;
}

.product-price {
  font-size: 1.2rem;
  color: #ffd84d;
}

.product-card .btn {
  border-radius: 12px;
  font-weight: 600;
}
</style>
