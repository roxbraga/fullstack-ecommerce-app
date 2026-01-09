<template>
  <div class="container py-5">
    <h2 class="page-title mb-4">Product List</h2>

    <div class="table-card" v-if="productsStore.products.length">
      <div class="table-responsive">
        <table class="table table-dark table-hover align-middle mb-0">
          <thead class="table-head text-center">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="product in productsStore.products"
              :key="product._id"
              class="table-row"
            >
              <!-- NAME -->
              <td class="fw-semibold text-nowrap">
                {{ product.name }}
              </td>

              <!-- DESCRIPTION -->
              <td class="product-description">
                <p
                  class="desc-text"
                  :class="{ expanded: expandedDesc === product._id }"
                >
                  {{ product.description }}
                </p>

                <button
                  v-if="product.description && product.description.length > 120"
                  class="btn btn-link p-0 desc-toggle"
                  @click="toggleDesc(product._id)"
                >
                  {{ expandedDesc === product._id ? 'View less' : 'View more' }}
                </button>
              </td>

              <!-- PRICE -->
              <td class="price">
                ₱{{ product.price }}
              </td>

              <!-- CATEGORY -->
              <td class="text-white">
                {{ product.category }}
              </td>

              <!-- STATUS -->
              <td class="text-center">
                <span
                  class="status-pill"
                  :class="product.isActive ? 'active' : 'inactive'"
                >
                  {{ product.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <!-- ACTIONS -->
              <td class="actions">
                <router-link
                  class="btn btn-warning btn-sm w-100 mb-2"
                  :to="`/admin/products/${product._id}/edit`"
                >
                  Edit
                </router-link>

                <button
                  class="btn btn-sm w-100"
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

    <!-- EMPTY STATE -->
    <div v-else class="empty-state text-center">
      <p>No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const expandedDesc = ref(null)

const toggleDesc = (id) => {
  expandedDesc.value = expandedDesc.value === id ? null : id
}

onMounted(() => {
  productsStore.fetchAllProducts()
})
</script>

<style scoped>
.container {
  max-width: 1100px;
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
    rgba(33, 37, 41, 0.85),
    rgba(18, 18, 18, 0.75)
  );
  backdrop-filter: blur(8px);
  border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

/* HEADER */
.table-head th {
  background: linear-gradient(135deg, #2b2f33, #1c1f22);
  color: #f8f9fa;
  font-weight: 600;
  padding: 1rem;
}

/* ROW */
.table-row {
  transition: background 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.04);
}

/* DESCRIPTION */
.product-description {
  max-width: 360px;
  vertical-align: top;
}

.desc-text {
  margin: 0;
  color: #dee2e6;
  font-size: 0.9rem;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc-text.expanded {
  -webkit-line-clamp: unset;
  overflow: visible;
}

.desc-toggle {
  font-size: 0.75rem;
  color: #ffc107;
  text-decoration: none;
}

.desc-toggle:hover {
  text-decoration: underline;
}

/* PRICE */
.price {
  font-family: monospace;
  font-weight: 600;
  white-space: nowrap;
}

/* STATUS */
.status-pill {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pill.active {
  background: #198754;
  color: #fff;
}

.status-pill.inactive {
  background: #6c757d;
  color: #fff;
}

/* ACTIONS */
.actions {
  min-width: 140px;
}

/* EMPTY */
.empty-state {
  color: #ccc;
  font-style: italic;
}

/* MOBILE */
@media (max-width: 768px) {
  .product-description {
    max-width: 220px;
  }
}
</style>
