<template>
  <div class="container py-5" v-if="isAdmin">
    <h2 class="text-center mb-4 text-white">All Orders</h2>

    <div class="table-responsive">
      <table class="table table-striped table-dark text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date</th>
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
            <td>{{ order.status }}</td>
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
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useGlobalStore } from '../stores/global.js'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.role === 'admin' && userStore.isLoggedIn)

const orders = ref([])

// Fetch all orders
async function fetchAllOrders() {
  try {
    const res = await axios.get('http://localhost:5000/api/orders')
    orders.value = res.data
  } catch (err) {
    console.error('Failed to fetch all orders:', err)
  }
}

onMounted(() => {
  if (isAdmin.value) fetchAllOrders()
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
