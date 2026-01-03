<template>
  <div class="container py-5">
    <h2 class="board-title mb-4 text-center">Available Products</h2>

    <!-- ACTIVE PRODUCTS BOARD -->
    <div v-if="activeProducts.length" class="row g-4">
      <div
        v-for="product in activeProducts"
        :key="product._id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <div class="product-card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-warning mb-2">
              {{ product.name }}
            </h5>

            <p
              class="card-desc"
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

            <div class="card-meta mt-3">
              <span class="price">₱{{ product.price }}</span>
              <span class="category">{{ product.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EMPTY -->
    <div v-else class="empty-state text-center mt-5">
      No active products available.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const expandedDesc = ref(null)

const toggleDesc = (id) => {
  expandedDesc.value = expandedDesc.value === id ? null : id
}


const activeProducts = computed(() =>
  productsStore.products.filter(product => product.isActive)
)

onMounted(() => {
  productsStore.fetchAllProducts()
})
</script>

<style scoped>
.board-title {
  font-size: 2.4rem;
  color: #ffd84d;
}

/* CARD */
.product-card {
  background: linear-gradient(135deg, #1f1f1f, #141414);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.7);
}

.card-title {
  font-weight: 600;
}

.card-desc {
  font-size: 0.9rem;
  color: #cfcfcf;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc.expanded {
  -webkit-line-clamp: unset;
}

/* TOGGLE */
.desc-toggle {
  font-size: 0.75rem;
  color: #ffc107;
  text-decoration: none;
}

.desc-toggle:hover {
  text-decoration: underline;
}

/* META */
.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #bbb;
}

.price {
  font-weight: 600;
  color: #fff;
}

.category {
  font-style: italic;
}

/* EMPTY */
.empty-state {
  color: #aaa;
  font-style: italic;
}
</style>
