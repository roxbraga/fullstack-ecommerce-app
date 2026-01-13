<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const error = ref(false)

/* STOCK COMPUTED */
const inStock = computed(() => product.value?.stock > 0)

const addItemToCart = async () => {
  if (!inStock.value) return

  try {
    await cartStore.addToCart(product.value._id, 1)
  } catch (err) {
    console.error('Failed to add to cart', err)
  }
}

const fetchProduct = async () => {
  try {
    const { data } = await api.get(
      `/products/${route.params.id}`)
    product.value = data
  } catch (err) {
    console.error('Failed to load product', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchProduct)
</script>


<template>
  <!-- LOADING -->
  <div v-if="loading" class="text-center text-white py-5">
    Loading product...
  </div>

  <!-- PRODUCT FOUND -->
  <div v-else-if="product" class="container py-5">
    <div class="row g-4 align-items-start">

      <!-- IMAGE -->
      <div class="col-md-6">
        <img
          :src="product.image || '/images/placeholder.png'"
          class="img-fluid rounded shadow"
          alt="Product image"
        />
      </div>

      <!-- DETAILS -->
      <div class="col-md-6 text-white">
        <h2 class="text-warning fw-bold">
          {{ product.name }}
        </h2>

        <h4 class="mt-2 text-light">
          ₱{{ product.price }}
        </h4>

        <!-- STOCK INFO -->
        <div class="mt-3">
          <span
            class="badge"
            :class="inStock ? 'bg-success' : 'bg-danger'"
          >
            {{ inStock ? `In Stock: ${product.stock}` : 'Out of Stock' }}
          </span>
        </div>

        <p class="mt-4 text-white description">
          {{ product.description }}
        </p>

        <!-- STATUS -->
        <div class="mt-3">
          <span class="badge bg-secondary" v-if="!product.isActive">
            Unavailable
          </span>
        </div>

        <!-- ACTION -->
        <button
          class="btn btn-warning mt-4 px-4"
          :disabled="!inStock || !product.isActive"
          @click="addItemToCart"
        >
          Add to Cart
        </button>

      </div>
    </div>
  </div>

  <!-- NOT FOUND -->
  <div v-else class="text-center text-danger py-5">
    Product not found
  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
}

img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
}

/* DESCRIPTION */
.description {
  line-height: 1.6;
  font-size: 0.95rem;
  opacity: 0.95;
}
</style>
