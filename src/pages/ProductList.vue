<template>
  <div class="container py-4">

    <!-- TOP STATS -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="stat-pill danger">
          <span>Least Sold</span>
          <strong>{{ leastSold?.name || '—' }}</strong>
        </div>
      </div>

      <div class="col-md-4">
        <div class="stat-pill success">
          <span>Active</span>
          <strong>{{ activeCount }}</strong>
        </div>
      </div>

      <div class="col-md-4">
        <div class="stat-pill warning">
          <span>Inactive</span>
          <strong>{{ inactiveCount }}</strong>
        </div>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="toolbar mb-3">
      <div class="search-box">
        <input v-model="search" type="text" placeholder="Search product" />
      </div>

      <router-link
        to="/admin/create-product"
        class="btn btn-warning btn-sm"
      >
        + Add Product
      </router-link>
    </div>

    <!-- HEADER -->
    <div class="list-header">
      <span>Category</span>
      <span>Available Qty</span>
      <span>Inventory Trend</span>
      <span>Status</span>
      <span>Price</span>
      <span>Action</span>
    </div>

    <!-- ROWS -->
    <div
      v-for="product in filteredProducts"
      :key="product._id"
      class="product-row"
    >
      <span>{{ product.category }}</span>

      <span>{{ product.stock?.toLocaleString() ?? 0 }}</span>

      <span>
        <svg width="80" height="24" viewBox="0 0 100 30">
          <path
            d="M0 20 Q 25 5 50 15 T 100 10"
            fill="none"
            stroke="#ffc107"
            stroke-width="2"
          />
        </svg>
      </span>

      <span>
        <span
          class="status"
          :class="product.isActive ? 'active' : 'inactive'"
        >
          {{ product.isActive ? 'Active' : 'Inactive' }}
        </span>
      </span>

      <span class="price">
        ₱{{ product.price.toLocaleString() }}
      </span>

      <span class="actions">
        <button
          v-if="product.isActive"
          class="icon-btn toggle inactive"
          @click="toggleStatus(product)"
        >
          ⛔
        </button>

        <button
          v-else
          class="icon-btn toggle active"
          @click="toggleStatus(product)"
        >
          ✅
        </button>

        <router-link
          :to="`/admin/products/${product._id}/edit`"
          class="icon-btn edit"
        >
          ✏
        </router-link>

        <button
          class="icon-btn delete"
          @click="archiveProduct(product._id)"
        >
          🗑
        </button>
      </span>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const productsStore = useProductsStore()
const search = ref('')

const notyf = new Notyf({
  duration: 2500,
  position: { x: 'right', y: 'top' }
})

onMounted(() => {
  productsStore.fetchAllProducts()
})

const filteredProducts = computed(() =>
  productsStore.products
    .filter(p => p.isActive === true)
    .filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

const activeCount = computed(() =>
  productsStore.products.filter(p => p.isActive).length
)

const inactiveCount = computed(() =>
  productsStore.products.filter(p => !p.isActive).length
)

const leastSold = computed(() =>
  productsStore.products.reduce((min, p) =>
    (p.totalOrders ?? 0) < (min?.totalOrders ?? Infinity) ? p : min
  , null)
)

const toggleStatus = async (product) => {
  try {
    if (product.isActive) {
      await productsStore.archiveProduct(product._id)
      notyf.success('Product deactivated')
    } else {
      await productsStore.activateProduct(product._id)
      notyf.success('Product activated')
    }
  } catch {
    notyf.error('Failed to update status')
  }
}

const archiveProduct = async (id) => {
  if (!confirm('Archive this product?')) return
  try {
    await productsStore.archiveProduct(id)
    notyf.success('Product archived')
  } catch {
    notyf.error('Failed to archive product')
  }
}
</script>

<style scoped>
.stat-pill {
  background: rgba(0,0,0,.55);
  border-radius: 14px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(255,193,7,.35);
}

.stat-pill span {
  font-size: .75rem;
  color: #aaa;
}

.stat-pill strong {
  font-size: 1.2rem;
}

.stat-pill.success { border-color: rgba(25,135,84,.4); }
.stat-pill.warning { border-color: rgba(255,193,7,.4); }
.stat-pill.danger  { border-color: rgba(220,53,69,.4); }

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  background: rgba(0,0,0,.6);
  border-radius: 999px;
  padding: .4rem .75rem;
}

.search-box input {
  background: transparent;
  border: none;
  color: white;
  outline: none;
}

.list-header {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr .8fr .8fr .8fr;
  font-size: .75rem;
  color: #aaa;
  margin-bottom: .6rem;
  padding-bottom: .4rem;
  border-bottom: 1px solid rgba(255,193,7,.3);
}

.product-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr .8fr .8fr .8fr;
  background: rgba(0,0,0,.55);
  padding: .9rem;
  border-radius: 14px;
  align-items: center;
  margin-bottom: .6rem;
  border: 1px solid rgba(255,193,7,.25);
}

.product-row:hover {
  background: rgba(255,255,255,.04);
  border-color: rgba(255,193,7,.55);
}

.status {
  padding: .25rem .6rem;
  border-radius: 999px;
  font-size: .7rem;
  font-weight: 600;
}

.status.active {
  background: #198754;
}

.status.inactive {
  background: #dc3545;
}

.price {
  font-weight: 600;
}

.actions {
  display: flex;
  gap: .4rem;
}

.icon-btn {
  background: rgba(255,255,255,.08);
  border: none;
  border-radius: 8px;
  padding: .3rem .45rem;
  cursor: pointer;
}

.icon-btn.edit {
  color: #0d6efd;
}

.icon-btn.delete {
  color: #dc3545;
}

.icon-btn.toggle.active {
  color: #198754;
}

.icon-btn.toggle.inactive {
  color: #ffc107;
}

@media (max-width: 768px) {
  .list-header,
  .product-row {
    grid-template-columns: 1fr 1fr;
    row-gap: .5rem;
  }
}
</style>
