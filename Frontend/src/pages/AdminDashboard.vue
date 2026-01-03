<template>
  <div>
    <h1 class="mb-3 text-warning text-center">Admin Dashboard</h1>

    <!-- ACTION BAR -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div class="form-check text-white">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="allSelected"
          @change="toggleAll"
        />
        <label class="form-check-label small">
          Select all
        </label>
      </div>

      <button
        class="btn btn-sm btn-danger"
        :disabled="!selectedIds.length"
        @click="deleteSelected"
      >
        Delete Selected ({{ selectedIds.length }})
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-dark table-striped align-middle table-sm compact-table">
        <thead>
          <tr>
            <th class="col-check"></th>
            <th class="col-name">Name</th>
            <th class="col-price text-end">Price</th>
            <th class="col-orders text-center">Orders</th>
            <th class="col-stock text-center">Stock</th>
            <th class="col-status text-center">Status</th>
            <th class="col-action text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in productsStore.products" :key="p._id">
            <!-- CHECKBOX -->
            <td class="text-center col-check">
              <input
                type="checkbox"
                class="form-check-input"
                :value="p._id"
                v-model="selectedIds"
              />
            </td>

            <!-- NAME -->
            <td class="col-name text-truncate small fw-semibold">
              {{ p.name }}
            </td>

            <!-- PRICE -->
            <td class="col-price text-end small">
              ₱{{ p.price.toLocaleString() }}
            </td>

            <!-- ORDERS -->
            <td class="col-orders text-center small">
              {{ p.totalOrders ?? 0 }}
            </td>

            <!-- STOCK -->
            <td class="col-stock text-center small">
              <span :class="p.stock <= 5 ? 'text-warning fw-bold' : ''">
                {{ p.stock ?? 0 }}
              </span>
            </td>

            <!-- STATUS -->
            <td class="col-status text-center">
              <span
                class="badge px-2 py-1"
                :class="p.isActive ? 'bg-success' : 'bg-secondary'"
              >
                {{ p.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>

            <!-- ACTION -->
            <td class="col-action text-center">
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteOne(p._id)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="!productsStore.products.length">
            <td colspan="7" class="text-center text-muted py-3 small">
              No products found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const selectedIds = ref([])

onMounted(() => {
  productsStore.fetchAllProducts()
})

const allSelected = computed(() =>
  productsStore.products.length &&
  selectedIds.value.length === productsStore.products.length
)

const toggleAll = (e) => {
  selectedIds.value = e.target.checked
    ? productsStore.products.map(p => p._id)
    : []
}

const deleteOne = async (id) => {
  if (!confirm('Delete this product?')) return
  await productsStore.deleteProduct(id)
  selectedIds.value = selectedIds.value.filter(i => i !== id)
}

const deleteSelected = async () => {
  if (!confirm(`Delete ${selectedIds.value.length} products?`)) return
  await productsStore.deleteMany(selectedIds.value)
  selectedIds.value = []
}
</script>

<style scoped>
/* GLOBAL COMPACT */
.compact-table th,
.compact-table td {
  padding: 0.35rem 0.45rem;
  font-size: 0.75rem;
  vertical-align: middle;
}

/* COLUMN WIDTHS */
.col-check   { width: 36px; }
.col-name    { max-width: 220px; }
.col-price   { width: 90px; }
.col-orders  { width: 70px; }
.col-stock   { width: 70px; }
.col-status  { width: 90px; }
.col-action  { width: 90px; }

/* TRUNCATE NAME */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* BADGE SMALLER */
.badge {
  font-size: 0.65rem;
}
</style>
