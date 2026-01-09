<template>
  <div class="container py-5">
    <h2 class="board-title text-center mb-4 text-warning">
      Admin Dashboard
    </h2>

    <!-- ACTION BAR -->
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
        class="btn btn-sm btn-warning"
        :disabled="!selectedIds.length"
        @click="archiveSelected"
      >
        Archive Selected ({{ selectedIds.length }})
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
          <!-- ACTIVE PRODUCTS ONLY -->
          <tr v-for="p in activeProducts" :key="p._id">
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

            <td>
              {{ p.totalOrders ?? 0 }}
            </td>

            <td>
              <span :class="p.stock <= 5 ? 'text-warning fw-bold' : ''">
                {{ p.stock ?? 0 }}
              </span>
            </td>

            <td>
              <span class="badge bg-success">
                Active
              </span>
            </td>

            <td class="d-flex gap-2 justify-content-center">
              <button
                class="btn btn-sm btn-outline-warning"
                @click="archiveOne(p._id)"
              >
                Archive
              </button>
            </td>
          </tr>

          <tr v-if="!activeProducts.length">
            <td colspan="7" class="text-center text-muted py-4">
              No active products
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
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const productsStore = useProductsStore()
const selectedIds = ref([])

const notyf = new Notyf({
  duration: 2500,
  position: { x: 'right', y: 'top' }
})

onMounted(async () => {
  try {
    await productsStore.fetchAllProducts()
  } catch {
    notyf.error('Failed to load products')
  }
})

const activeProducts = computed(() =>
  productsStore.products.filter(p => p.isActive === true)
)

const allSelected = computed(() =>
  activeProducts.value.length &&
  selectedIds.value.length === activeProducts.value.length
)

const toggleAll = (e) => {
  selectedIds.value = e.target.checked
    ? activeProducts.value.map(p => p._id)
    : []
}

const archiveOne = async (id) => {
  if (!confirm('Archive this product?')) return
  try {
    await productsStore.archiveProduct(id)
    selectedIds.value = selectedIds.value.filter(i => i !== id)
    notyf.success('Product archived')
  } catch {
    notyf.error('Failed to archive product')
  }
}

const archiveSelected = async () => {
  if (!confirm(`Archive ${selectedIds.value.length} products?`)) return
  try {
    for (const id of selectedIds.value) {
      await productsStore.archiveProduct(id)
    }
    selectedIds.value = []
    notyf.success('Selected products archived')
  } catch {
    notyf.error('Failed to archive products')
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
