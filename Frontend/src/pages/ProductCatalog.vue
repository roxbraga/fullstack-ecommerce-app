<template>
  <div class="container py-5">
    <h2 class="text-center mb-4 text-white">Product Catalog</h2>

    <!-- Products Grid -->
    <div class="row">
      <div
        v-for="product in products"
        :key="product._id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100 bg-dark text-white">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description.slice(0, 60) }}...</p>
            <p class="card-text"><strong>Price:</strong> ${{ product.price }}</p>
            <p class="card-text"><strong>Category:</strong> {{ product.category }}</p>
            <button
              class="btn btn-warning"
              @click="showDetails(product)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ selectedProduct.name }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
            <p><strong>Price:</strong> ${{ selectedProduct.price }}</p>
            <p><strong>Category:</strong> {{ selectedProduct.category }}</p>
            <p><strong>Status:</strong> {{ selectedProduct.isActive ? 'Available' : 'Unavailable' }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const products = ref([])
const selectedProduct = ref({})

// Bootstrap modal reference
const modalRef = ref(null)
let bsModal = null

// Fetch all active products
async function fetchProducts() {
  try {
    const res = await axios.get('http://localhost:5000/api/products?isActive=true')
    products.value = res.data
  } catch (err) {
    console.error('Failed to fetch products:', err)
  }
}

// Show product details
function showDetails(product) {
  selectedProduct.value = product
  if (!bsModal) {
    bsModal = new bootstrap.Modal(modalRef.value)
  }
  bsModal.show()
}

// Close modal
function closeModal() {
  if (bsModal) bsModal.hide()
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
h2 {
  font-family: 'League Script', cursive;
  color: #fff200;
}
.card {
  cursor: pointer;
}
.btn-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
}
</style>
