<template>
  <div class="container py-5" v-if="isAdmin">
    <h2 class="page-title mb-4">Product List</h2>

    <div class="table-card" v-if="productsStore.products.length">
      <div class="table-responsive">
        <table class="table table-dark table-hover align-middle text-center mb-0">
          <thead class="table-head">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="product in productsStore.products"
              :key="product._id"
            >
              <td class="fw-semibold">
                {{ product.name }}
              </td>

              <td class="product-description">
                {{ product.description }}
              </td>

              <td class="fw-semibold">
                ₱{{ product.price }}
              </td>

              <td>
                {{ product.category }}
              </td>

              <td>
                <span
                  class="badge"
                  :class="product.isActive ? 'bg-success' : 'bg-secondary'"
                >
                  {{ product.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <td>
                <button
                  class="btn btn-sm"
                  :class="product.isActive
                    ? 'btn-outline-danger'
                    : 'btn-outline-success'"
                  @click="productsStore.toggleActive(product)"
                >
                  {{ product.isActive ? 'Deactivate' : 'Activate' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="empty-state text-center">
      <p>No products found.</p>
    </div>
  </div>

  <div v-else class="text-center mt-5 text-white">
    <h3>Access Denied</h3>
    <p>You must be an admin to access this page.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGlobalStore } from '../stores/global'
import { useProductsStore } from '../stores/products'

const store = useGlobalStore()
const productsStore = useProductsStore()

const isAdmin = computed(
  () => store.isLoggedIn && store.user.isAdmin
)

onMounted(() => {
  if (isAdmin.value) {
    productsStore.fetchAllProducts()
  }
})
</script>

<style scoped>
.container {
  max-width: 1000px;
}

/* TITLE */
.page-title {
  font-size: 2.6rem;
  text-align: center;
  color: #ffd84d;
}

/* CARD */
.table-card {
  background: linear-gradient(
    135deg,
    rgba(33, 37, 41, 0.75),
    rgba(18, 18, 18, 0.65)
  );
  backdrop-filter: blur(6px);
  border-radius: 18px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}

/* HEADER */
.table-head {
  background: linear-gradient(135deg, #2c2f33, #1c1f22);
}

/* 🔥 ROW DIVIDER */
.table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.table tbody tr:last-child {
  border-bottom: none;
}

/* DESCRIPTION */
.product-description {
  color: #f8f9fa;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 360px;
  white-space: normal;
  word-break: break-word;
  opacity: 0.95;
}

/* EMPTY */
.empty-state {
  color: #ccc;
  font-style: italic;
}

/* MOBILE */
@media (max-width: 576px) {
  .page-title {
    font-size: 2.1rem;
  }
}
</style>
