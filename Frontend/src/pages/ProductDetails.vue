<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import { useCartStore } from '../stores/cart'

const route = useRoute()

const product = ref(null)
const loading = ref(true)
const error = ref(false)

const cartStore = useCartStore()

const addItemToCart = () => {
  cartStore.addToCart(product.value)
}

const fetchProduct = async () => {
  try {
    const { data } = await api.get(
      `/product/specific/${route.params.id}`
    )
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
          :src="product.image || 'https://via.placeholder.com/600x400?text=No+Image'"
          class="img-fluid rounded shadow"
          alt="Product image"
        />
      </div>

      <!-- DETAILS -->
      <div class="col-md-6 text-white">
        <h2 class="text-warning fw-bold">{{ product.name }}</h2>

        <h4 class="mt-2 text-light">
          ₱{{ product.price }}
        </h4>

        <p class="mt-3 text-muted">
          {{ product.description }}
        </p>

        <div class="mt-4">
          <span class="badge bg-success" v-if="product.isActive">
            Available
          </span>
          <span class="badge bg-danger" v-else>
            Unavailable
          </span>
        </div>

        <button class="btn btn-warning mt-4 px-4" @click="addItemToCart">
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
  object-fit: cover;
}
</style>
