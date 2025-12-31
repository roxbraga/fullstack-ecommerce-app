<template>
  <div class="container py-5" v-if="isAdmin">
    <h2 class="text-center mb-4 text-white">Draft Orders</h2>

    <div class="table-responsive">
      <table class="table table-striped table-dark text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>{{ order._id }}</td>
            <td>{{ order.customerName }}</td>
            <td>
              <ul class="list-unstyled mb-0">
                <li v-for="item in order.products" :key="item._id">
                  {{ item.name }} x{{ item.quantity }}
                </li>
              </ul>
            </td>
            <td>${{ order.totalPrice }}</td>
            <td>{{ new Date(order.createdAt).toLocaleString() }}</td>
            <td>
              <button class="btn btn-sm btn-success" @click="markProcessed(order)">
                Mark as Processed
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Not authorized -->
  <div v-else class="text-center mt-5 text-white">
    <h3>Access Denied</h3>
    <p>You must be an admin to access this page.</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useGlobalStore } from '../stores/global.js'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.role === 'admin' && userStore.isLoggedIn)

const orders = ref([])

// Fetch draft orders
async function fetchDraftOrders() {
  try {
    const res = await axios.get('http://localhost:5000/api/orders?status=draft')
    orders.value = res.data
  } catch (err) {
    console.error('Failed to fetch draft orders:', err)
  }
}

// Mark order as processed (PATCH)
async function markProcessed(order) {
  try {
    const res = await axios.patch(`http://localhost:5000/api/orders/${order._id}`, {
      status: 'processed'
    })
    // Update locally
    const index = orders.value.findIndex(o => o._id === order._id)
    if (index !== -1) orders.value.splice(index, 1) // remove from draft list
    alert('Order marked as processed!')
  } catch (err) {
    console.error('Failed to update order status:', err)
    alert('Failed to mark order as processed')
  }
}

onMounted(() => {
  if (isAdmin.value) fetchDraftOrders()
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
