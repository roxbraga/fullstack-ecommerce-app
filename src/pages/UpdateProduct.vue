<template>
  <div class="container py-5">
    <h2 class="page-title mb-4">Update Product</h2>

    <div v-if="loading" class="text-center text-muted">
      Loading product...
    </div>

    <form v-else class="form-card" @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="form.name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="form.description" rows="4" class="form-control" required />
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Price</label>
          <input v-model.number="form.price" type="number" class="form-control" required />
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Stock</label>
          <input
            v-model.number="form.stock"
            type="number"
            min="0"
            class="form-control"
            required
          />
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Category</label>
          <input v-model="form.category" type="text" class="form-control" required />
        </div>
      </div>

      <div class="form-check mb-4">
        <input
          v-model="form.isActive"
          class="form-check-input"
          type="checkbox"
          id="isActive"
        />
        <label class="form-check-label" for="isActive">
          Active
        </label>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-warning" :disabled="loading">
          Save Changes
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="router.push('/admin/product-list')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const loading = ref(true)
const productId = route.params.id

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  isActive: true
})

let originalProduct = {}

onMounted(async () => {
  try {
    const product = await productsStore.getProductById(productId)

    originalProduct = { ...product }

    form.name = product.name
    form.description = product.description
    form.price = product.price
    form.stock = product.stock
    form.category = product.category
    form.isActive = product.isActive
  } catch {
    router.push('/admin/product-list')
  } finally {
    loading.value = false
  }
})

const submit = async () => {
  const updates = {}

  if (form.name !== originalProduct.name) updates.name = form.name
  if (form.description !== originalProduct.description) updates.description = form.description
  if (form.price !== originalProduct.price) updates.price = form.price
  if (form.stock !== originalProduct.stock) updates.stock = form.stock
  if (form.category !== originalProduct.category) updates.category = form.category
  if (form.isActive !== originalProduct.isActive) updates.isActive = form.isActive

  if (!Object.keys(updates).length) {
    alert('No changes detected')
    return
  }

  try {
    const updatedProduct = await productsStore.updateProduct(productId, updates)

    // 🔥 IMPORTANT: sync latest values so stock & category stay correct
    originalProduct = { ...updatedProduct }

    alert('Product updated successfully')
    router.push('/admin/product-list')
  } catch {
    alert('Failed to update product')
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
}

.page-title {
  text-align: center;
  color: #ffd84d;
}

.form-card {
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
}

.form-label {
  color: #f8f9fa;
}

.form-control {
  background: #1c1f22;
  color: white;
  border: 1px solid #333;
}

.form-control:focus {
  border-color: #ffc107;
  box-shadow: none;
}
</style>
