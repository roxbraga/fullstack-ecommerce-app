<template>
  <div class="page text-white">
    <div class="container py-4 py-md-5">

      <h2 class="text-warning mb-4 text-center">My Orders</h2>

      <div v-if="loading" class="text-center text-muted">
        Loading orders...
      </div>

      <div v-else-if="orders.length">
        <div
          v-for="order in orders"
          :key="order._id"
          class="order-card mb-4"
        >
          <!-- HEADER -->
          <div class="order-header mb-2">
            <strong class="order-id">
              Order #{{ order._id }}
            </strong>
            <span class="order-date">
              {{ formatDate(order.createdAt) }}
            </span>
          </div>

          <!-- ITEMS -->
          <ul class="list-unstyled order-items mb-3">
            <li
              v-for="item in order.items"
              :key="item._id"
              class="order-item"
            >
              <span class="item-name">
                {{ item.productId?.name || 'Deleted product' }}
                × {{ item.quantity }}
              </span>

              <span class="item-price">
                ₱{{ ((item.productId?.price || 0) * item.quantity).toLocaleString() }}
              </span>
            </li>
          </ul>

          <hr />

          <!-- FOOTER -->
          <div class="order-footer">
            <span
              class="status-pill"
              :class="order.status"
            >
              {{ order.status.toUpperCase() }}
            </span>

            <strong class="text-warning">
              ₱{{ order.totalPrice.toLocaleString() }}
            </strong>
          </div>
        </div>
      </div>

      <p v-else class="text-center text-muted">
        You have no orders yet.
      </p>

    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useOrdersStore } from '../stores/orders'

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.fetchMyOrders()
})

const orders = computed(() => ordersStore.orders)
const loading = computed(() => ordersStore.loading)

const formatDate = (date) =>
  new Date(date).toLocaleString()
</script>

<style scoped>
/* PAGE */
.page {
  padding-bottom: 4rem;
}

/* CARD */
.order-card {
  background: rgba(33, 37, 41, 0.75);
  border-radius: 16px;
  padding: 1.25rem;
}

/* HEADER */
.order-header {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.order-id {
  word-break: break-word;
}

.order-date {
  font-size: 0.85rem;
  color: #adb5bd;
  white-space: nowrap;
}

/* ITEMS */
.order-items {
  margin-top: 0.75rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.25rem 0;
  flex-wrap: wrap;
}

.item-name {
  max-width: 75%;
  word-break: break-word;
}

.item-price {
  white-space: nowrap;
}

/* FOOTER */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* STATUS COLORS */
.status-pill {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.4px;
}

/* STATUS VARIANTS */
.status-pill.pending {
  background: #ffc107;
  color: #212529;
}

.status-pill.completed {
  background: #198754;
  color: #fff;
}

.status-pill.cancelled {
  background: #dc3545;
  color: #fff;
}

.status-pill.abandoned {
  background: #6c757d;
  color: #fff;
}

.status-pill.draft {
  background: #0dcaf0;
  color: #212529;
}

/* MOBILE */
@media (max-width: 576px) {
  .order-card {
    padding: 1rem;
  }

  .item-name {
    max-width: 100%;
  }

  .order-footer {
    gap: 0.5rem;
  }
}
</style>
