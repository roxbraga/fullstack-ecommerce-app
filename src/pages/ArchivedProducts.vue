<template>
  <div class="container py-5">
    <h2 class="board-title text-center mb-4 text-warning">
      Archived Products
    </h2>

    <div class="d-flex justify-content-between align-items-center mb-3">
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
      <table class="table table-striped table-dark align-middle text-center">
        <thead>
          <tr>
            <th></th>
            <th class="text-start">Name</th>
            <th>Price</th>
            <th>Orders</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in archivedProducts" :key="p._id">
            <td>
              <input
                type="checkbox"
                class="form-check-input"
                :value="p._id"
                v-model="selectedIds"
              />
            </td>

            <td class="text-start fw-semibold text-truncate">
              {{ p.name }}
            </td>

            <td class="text-warning fw-semibold">
              ₱{{ p.price.toLocaleString() }}
            </td>

            <td>{{ p.totalOrders ?? 0 }}</td>

            <td>{{ p.stock ?? 0 }}</td>

            <td>
              <span class="badge bg-secondary">
                Archived
              </span>
            </td>

            <td class="d-flex gap-2 justify-content-center">
              <button
                class="btn btn-sm btn-outline-success"
                @click="restoreProduct(p._id)"
              >
                Restore
              </button>

              <button
                class="btn btn-sm btn-danger"
                @click="deleteOne(p._id)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="!archivedProducts.length">
            <td colspan="7" class="text-center text-muted py-4">
              No archived products
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useProductsStore } from '../stores/products'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const productsStore = useProductsStore()
const selectedIds = ref([])

const notyf = new Notyf({
  duration: 2200,
  position: { x: 'right', y: 'top' }
})

const archivedProducts = computed(() =>
  productsStore.products.filter(p => p.isActive === false)
)

const allSelected = computed(() =>
  archivedProducts.value.length &&
  selectedIds.value.length === archivedProducts.value.length
)

const toggleAll = (e) => {
  selectedIds.value = e.target.checked
    ? archivedProducts.value.map(p => p._id)
    : []
}

onMounted(async () => {
  try {
    await productsStore.fetchAllProducts()
  } catch {
    notyf.error('Failed to load archived products')
  }
})

const restoreProduct = async (id) => {
  if (!confirm('Restore this product?')) return
  try {
    await productsStore.activateProduct(id)
    selectedIds.value = selectedIds.value.filter(i => i !== id)
    notyf.success('Product restored')
  } catch {
    notyf.error('Failed to restore product')
  }
}

const deleteOne = async (id) => {
  if (!confirm('Permanently delete this product?')) return
  try {
    await productsStore.deleteProduct(id)
    selectedIds.value = selectedIds.value.filter(i => i !== id)
    notyf.success('Product deleted')
  } catch {
    notyf.error('Failed to delete product')
  }
}

const deleteSelected = async () => {
  if (!confirm(`Delete ${selectedIds.value.length} products permanently?`)) return
  try {
    for (const id of selectedIds.value) {
      await productsStore.deleteProduct(id)
    }
    selectedIds.value = []
    notyf.success('Selected products deleted')
  } catch {
    notyf.error('Failed to delete selected products')
  }
}
</script>

<style scoped>
.board-title {
  font-size: 2.4rem;
}

.table td,
.table th {
  vertical-align: middle;
}

.text-truncate {
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
