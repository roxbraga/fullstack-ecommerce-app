<template>
  <div class="page text-white">
    <div class="container py-4 py-md-5">

      <h2 class="text-warning mb-4 text-center">
        My Orders
      </h2>

      <div
        v-if="loading"
        class="text-center text-muted py-5"
      >
        Loading orders...
      </div>

      <div
        v-else-if="orders.length"
        class="row g-4"
      >
        <div
          v-for="order in orders"
          :key="order._id"
          class="col-12"
        >
          <div class="order-card">

            <div class="order-top">
              <div>
                <div class="order-id">
                  Order #{{ order._id }}
                </div>

                <div class="order-date">
                  {{ formatDate(order.orderedOn) }}
                </div>
              </div>

              <span
                class="status-pill"
                :class="order.status.toLowerCase()"
              >
                {{ order.status.toUpperCase() }}
              </span>
            </div>

            <div class="order-items">

              <div
                v-for="item in order.products"
                :key="item._id"
                class="order-item"
              >

                <div class="item-left">

                  <img
                    :src="
                      item.productId?.image ||
                      '/images/placeholder.png'
                    "
                    :alt="
                      item.productId?.name ||
                      'Product'
                    "
                    class="item-image"
                  />

                  <div class="item-info">

                    <span class="item-name">
                      {{
                        item.productId?.name ||
                        'Deleted product'
                      }}
                    </span>

                    <span class="item-qty">
                      × {{ item.quantity }}
                    </span>

                  </div>
                </div>

                <div class="item-price">
                  ₱{{
                    (
                      (item.productId?.price || 0) *
                      item.quantity
                    ).toLocaleString()
                  }}
                </div>

              </div>

            </div>

            <div class="order-bottom">

              <span class="total-label">
                Total
              </span>

              <strong class="total-price text-warning">
                ₱{{
                  Number(
                    order.totalPrice || 0
                  ).toLocaleString()
                }}
              </strong>

            </div>

          </div>
        </div>
      </div>

      <p
        v-else
        class="text-center text-muted py-5"
      >
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

const orders = computed(() =>
  ordersStore.orders
)

const loading = computed(() =>
  ordersStore.loading
)

const formatDate = (date) => {
  if (!date) return 'N/A'

  return new Date(date).toLocaleString()
}
</script>

<style scoped>
.page {
  padding-bottom: 4rem;
}

.order-card {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(255,193,7,.35);
  box-shadow: 0 20px 40px rgba(0,0,0,.55);
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.order-id {
  font-weight: 600;
  font-size: 0.95rem;
  word-break: break-word;
}

.order-date {
  font-size: 0.8rem;
  color: #adb5bd;
}

.order-items {
  border-top: 1px solid rgba(255,255,255,.08);
  border-bottom: 1px solid rgba(255,255,255,.08);
  padding: .75rem 0;
  margin-bottom: .75rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .45rem 0;
  gap: .75rem;
  flex-wrap: wrap;
}

.item-left {
  display: flex;
  align-items: center;
  gap: .6rem;
}

.item-image {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255,193,7,.35);
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: .85rem;
}

.item-qty {
  font-size: .7rem;
  color: #adb5bd;
}

.item-price {
  font-size: .85rem;
  white-space: nowrap;
}

.order-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .75rem;
}

.total-label {
  font-size: .8rem;
  color: #adb5bd;
}

.total-price {
  font-size: 1.1rem;
}

.status-pill {
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: .5px;
}

.status-pill.pending {
  background: rgba(255,193,7,.85);
  color: #212529;
}

.status-pill.completed {
  background: rgba(25,135,84,.9);
  color: #fff;
}

.status-pill.cancelled {
  background: rgba(220,53,69,.9);
  color: #fff;
}

.status-pill.abandoned {
  background: rgba(108,117,125,.9);
  color: #fff;
}

.status-pill.draft {
  background: rgba(13,202,240,.9);
  color: #212529;
}

@media (max-width: 576px) {
  .order-card {
    padding: 1.1rem;
  }

  .item-left {
    gap: .5rem;
  }
}
</style>