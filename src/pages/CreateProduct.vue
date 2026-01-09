<template>
  <div class="container py-4" v-if="isAdmin">
    <h2 class="page-title mb-3">Create Product</h2>

    <form @submit.prevent="addProduct" class="product-card">
      <div class="row g-3">
        <!-- NAME -->
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control custom-input"
            required
          />
        </div>

        <!-- PRICE -->
        <div class="col-md-6">
          <label class="form-label">Price</label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            class="form-control custom-input"
            required
          />
        </div>

        <!-- CATEGORY -->
        <div class="col-md-6">
          <label class="form-label">Category</label>
          <input
            v-model="form.category"
            type="text"
            class="form-control custom-input"
            required
          />
        </div>

        <!-- STOCK -->
        <div class="col-md-6">
          <label class="form-label">Stock</label>
          <input
            v-model.number="form.stock"
            type="number"
            min="0"
            class="form-control custom-input"
            required
          />
        </div>

        <!-- DESCRIPTION -->
        <div class="col-12">
          <label class="form-label">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="form-control custom-input"
            required
          ></textarea>
        </div>

        <!-- IMAGE -->
        <div class="col-12">
          <label class="form-label">Image URL</label>
          <input
            v-model="form.image"
            type="text"
            class="form-control custom-input"
            placeholder="Paste image URL"
          />
        </div>

        <!-- ACTIVE -->
        <div class="col-12">
          <div class="form-check">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="form-check-input"
              id="isActive"
            />
            <label class="form-check-label" for="isActive">
              Active
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-gradient btn-lg w-100 mt-3"
      >
        Add Product
      </button>
    </form>
  </div>

  <div v-else class="text-center mt-5 text-white">
    <h3>Access Denied</h3>
    <p>You must be an admin to access this page.</p>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'
import { useProductsStore } from '../stores/products'

const store = useGlobalStore()
const productsStore = useProductsStore()
const router = useRouter()

const isAdmin = computed(
  () => store.isLoggedIn && store.user?.isAdmin === true
)

const form = reactive({
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  image: '',
  isActive: true
})

async function addProduct() {
  try {
    await productsStore.addProduct({ ...form })

    // reset form (clean & predictable)
    form.name = ''
    form.description = ''
    form.price = 0
    form.category = ''
    form.stock = 0
    form.image = ''
    form.isActive = true

    router.push('/admin/product-list')
  } catch (err) {
    console.error(err)
    alert('Failed to add product.')
  }
}
</script>

<style scoped>
.container {
  max-width: 750px;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffd84d;
}

.product-card {
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  background: rgba(33, 37, 41, 0.75);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.custom-input {
  background: rgba(248, 249, 250, 0.95);
  border-radius: 8px;
  height: 38px;
  font-size: 0.9rem;
  padding: 0.4rem 0.6rem;
}

textarea.custom-input {
  height: auto;
}

.btn-gradient {
  font-size: 0.95rem;
  padding: 0.7rem 1.2rem;
  border-radius: 30px;
  background: linear-gradient(135deg, #ffc107, #ffb300);
  color: #000;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 193, 7, 0.45);
}

@media (max-width: 576px) {
  .product-card { padding: 1rem; }
  .page-title { font-size: 1.8rem; }
}
</style>
