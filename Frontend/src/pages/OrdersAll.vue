<template>
  <div class="container py-5" v-if="isAdmin">
    <h2 class="text-center mb-4 text-white">All Orders</h2>

    <div v-if="ordersStore.loading" class="text-center text-muted">
      Loading orders...
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-dark text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in ordersStore.orders" :key="order._id">
            <td>{{ order._id }}</td>
            <td>{{ order.userId?.name }}</td>
            <td>{{ order.userId?.email }}</td>

            <td class="text-start">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="item in order.items"
                  :key="item.productId"
                >
                  {{ item.name }} × {{ item.quantity }}
                </li>
              </ul>
            </td>

            <td>₱{{ order.totalPrice }}</td>
            <td>
              <span class="badge bg-warning text-dark">
                {{ order.status.toUpperCase() }}
              </span>
            </td>
            <td>{{ new Date(order.createdAt).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else class="text-center mt-5 text-white">
    <h3>Access Denied</h3>
    <p>You must be an admin to access this page.</p>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { useGlobalStore } from '../stores/global'

const ordersStore = useOrdersStore()
const globalStore = useGlobalStore()

const isAdmin = computed(
  () => globalStore.isLoggedIn && globalStore.user?.isAdmin
)

onMounted(() => {
  if (isAdmin.value) {
    ordersStore.fetchAllOrders()
  }
})
</script>

<style scoped>
h2 {
  font-family: 'League Script', cursive;
  color: #fff200;
}
.table td, .table th {
  vertical-align: middle;
}
</style>
