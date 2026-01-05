<template>
  <div>
    <h1 class="mb-3 text-secondary text-center">Archived Products</h1>

    <div class="table-responsive">
      <table class="table table-dark table-striped align-middle table-sm compact-table">
        <thead>
          <tr>
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
            <td class="col-name text-truncate small fw-semibold">
              {{ p.name }}
            </td>

            <td class="col-price text-end small">
              ₱{{ p.price.toLocaleString() }}
            </td>

            <td class="col-orders text-center small">
              {{ p.totalOrders ?? 0 }}
            </td>

            <td class="col-stock text-center small">
              {{ p.stock ?? 0 }}
            </td>

            <td class="col-status text-center">
              <span class="badge bg-secondary px-2 py-1">
                Archived
              </span>
            </td>

            <td class="col-action text-center">
              <button
                class="btn btn-sm btn-outline-success"
                @click="restoreProduct(p._id)"
              >
                Restore
              </button>
            </td>
          </tr>

          <tr v-if="!productsStore.products.length">
            <td colspan="6" class="text-center text-muted py-3 small">
              No archived products
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const productsStore = useProductsStore()

const notyf = new Notyf({
  duration: 2500,
  position: { x: 'right', y: 'top' }
})

onMounted(async () => {
  try {
    // fetch archived products
    await productsStore.fetchArchivedProducts()
  } catch {
    notyf.error('Failed to load archived products')
  }
})

// RESTORE PRODUCT
const restoreProduct = async (id) => {
  if (!confirm('Restore this product?')) return

  try {
    await productsStore.restoreProduct(id)
    notyf.success('Product restored')
  } catch {
    notyf.error('Failed to restore product')
  }
}
</script>

<style scoped>
.compact-table th,
.compact-table td {
  padding: 0.35rem 0.45rem;
  font-size: 0.75rem;
  vertical-align: middle;
}

.col-name    { max-width: 240px; }
.col-price   { width: 90px; }
.col-orders  { width: 70px; }
.col-stock   { width: 70px; }
.col-status  { width: 90px; }
.col-action  { width: 90px; }

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  font-size: 0.65rem;
}
</style>
