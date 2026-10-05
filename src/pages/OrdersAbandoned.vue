<template>
  <div class="container py-5" v-if="isAdmin">
    <h2 class="text-center mb-4 text-warning">
      Abandoned Orders
    </h2>

    <div
      v-if="ordersStore.loading"
      class="text-center text-muted"
    >
      Loading abandoned orders...
    </div>

    <div
      v-else-if="ordersStore.orders.length"
      class="table-responsive"
    >
      <table
        class="table table-striped table-dark align-middle text-center"
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th class="text-start">Products</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in ordersStore.orders"
            :key="order._id"
          >
            <!-- ORDER ID -->
            <td class="small">
              {{ order._id }}
            </td>

            <!-- CUSTOMER -->
            <td>
              {{ order.userId?.name || 'N/A' }}
            </td>

            <!-- EMAIL -->
            <td>
              {{ order.userId?.email || 'N/A' }}
            </td>

            <!-- PRODUCTS -->
            <td class="text-start">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="item in order.products"
                  :key="item._id"
                >
                  {{
                    item.productId?.name ||
                    'Deleted product'
                  }}
                  × {{ item.quantity }}
                </li>
              </ul>
            </td>

            <!-- TOTAL -->
            <td class="text-warning fw-semibold">
              ₱{{
                Number(
                  order.totalPrice || 0
                ).toLocaleString()
              }}
            </td>

            <!-- DATE -->
            <td class="small">
              {{
                order.orderedOn
                  ? new Date(
                      order.orderedOn
                    ).toLocaleString()
                  : 'N/A'
              }}
            </td>

            <!-- ACTIONS -->
            <td class="d-flex gap-2 justify-content-center">

              <button
                class="btn btn-sm btn-outline-warning"
                @click="restore(order._id)"
              >
                Mark Pending
              </button>

              <button
                class="btn btn-sm btn-danger"
                @click="remove(order._id)"
              >
                Delete
              </button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p
      v-else
      class="text-center text-muted"
    >
      No abandoned orders found.
    </p>
  </div>

  <!-- ACCESS DENIED -->
  <div
    v-else
    class="text-center mt-5 text-white"
  >
    <h3>Access Denied</h3>

    <p>
      You must be an admin to access this page.
    </p>
  </div>
</template>

<script setup>
import {
  onMounted,
  computed
} from 'vue'

import { useOrdersStore } from '../stores/orders'
import { useGlobalStore } from '../stores/global'
import { Notyf } from 'notyf'

const ordersStore = useOrdersStore()
const globalStore = useGlobalStore()
const notyf = new Notyf()

const isAdmin = computed(
  () =>
    globalStore.isLoggedIn &&
    globalStore.user?.isAdmin
)

onMounted(async () => {
  if (isAdmin.value) {
    await ordersStore.fetchAbandonedOrders()
  }
})

const restore = async (orderId) => {
  try {
    await ordersStore.updateOrderStatus(
      orderId,
      'Pending'
    )

    notyf.success(
      'Order marked as pending'
    )
  } catch (error) {
    console.error(error)

    notyf.error(
      error.response?.data?.message ||
      'Failed to update order'
    )
  }
}

const remove = async (orderId) => {
  if (
    !confirm(
      'Delete this abandoned order?'
    )
  ) {
    return
  }

  try {
    await ordersStore.deleteOrder(orderId)

    notyf.success(
      'Order deleted'
    )
  } catch (error) {
    console.error(error)

    notyf.error(
      error.response?.data?.message ||
      'Failed to delete order'
    )
  }
}
</script>

<style scoped>
h2 {
  font-size: 2.4rem;
}

.table td,
.table th {
  vertical-align: middle;
}
</style>